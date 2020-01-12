import * as log from 'loglevel';

import AWS from 'aws-sdk';
import express from "express";
import { GAMES_TABLE, USERS_TABLE } from './constants';
import { Card } from './model/card';
import { GAME_STATE, IGame } from './model/game';
import { PlayerState } from './model/playerstate';
import { SharedState } from './model/sharedstate';
import {getRandomString} from './utils';

export class GameServices {
    constructor(public dynamoDb: AWS.DynamoDB.DocumentClient) {}

    public async createGame(req: express.Request, res: express.Response): Promise<void> {
        const userId = req.params.userId;
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }
        const gameid = getRandomString(16);
        const params = {
            Item: {
                gameid,
                gamestate: GAME_STATE.CREATED,
                user1: userId,
                user1_data: {},
                user2_data: {},
                shared_data: {},
                createdate: new Date().getTime()
            },
            TableName: GAMES_TABLE
        };

        try {
            await this.dynamoDb.put(params).promise();
            res.status(200).json( {gameid} );
        } catch (error) {
            log.error(error);
            res.status(400).json({ error: 'Could not create game', message: error });
        }
    }

    public async joinGame(req: express.Request, res: express.Response): Promise<void> {
        const gameId = req.params.gameId;
        const userId = req.params.userId;
        if (typeof gameId !== 'string') {
            res.status(400).json({ error: '"gameId" must be a string' });
          }
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }

        try {
            // is my user valid
            const params = {
                Key: {
                    userId,
                },
                TableName: USERS_TABLE
            };
            const userResponse = await this.dynamoDb.get(params).promise();
            if (!userResponse.Item) {
                res.status(400).json({ error: 'User ' + userId + ' is not valid' });
            }
            else {
                const game = await this.getGame(gameId);
                if (!game) {
                    res.status(404).json({ error: 'Game ' + gameId + ' does not exist' });
                }
                else if (game.user1 && game.user2) {
                    res.status(400).json({ error: 'Game ' + gameId + ' already has 2 players' });
                }
                else if (game.gamestate !== GAME_STATE.CREATED) {
                    res.status(400).json({ error: 'Game ' + gameId + ' has already started' });
                }
                else if (game.user1 === userId || game.user2 === userId) {
                    res.status(400).json({ error: 'You have already joined game ' + gameId });
                }
                else {
                    await this.startGame(game, userId);
                    // dont return the other players data, null it out before returning
                    const returnData = Object.assign({}, game);
                    this.obscureOtherPlayerData(userId, returnData);
                    res.status(200).json( returnData );
                }
            }

        } catch (error) {
            log.error(error);
            res.status(400).json({ error: 'Could not join game' });
        }
    }

    public async getGameForUser(req: express.Request, res: express.Response): Promise<void> {
        const gameId = req.params.gameId;
        const userId = req.params.userId;
        if (typeof gameId !== 'string') {
          res.status(400).json({ error: '"gameId" must be a string' });
        }
        if (typeof userId !== 'string') {
            res.status(400).json({ error: '"userId" must be a string' });
          }

        try {
            const game = await this.getGame(gameId);
            if (game) {
                const returnData = Object.assign({}, game);
                this.obscureOtherPlayerData(userId, returnData);
                res.status(200).json( returnData );
            }
            else {
                res.status(404).json({ error: 'Game ' + gameId + ' does not exist' });
            }
        } catch (error) {
            log.error(error);
            res.status(500).json({ error });
        }
    }

    public async getGamesForUser(req: express.Request, res: express.Response): Promise<void> {
        const userId = req.params.userId;
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }

        const user1Params = {
            ExpressionAttributeValues: {
                ':u' : userId
            },
            IndexName: 'user1-index',
            KeyConditionExpression: 'user1 = :u',
            ProjectionExpression: 'gameid,gamestate,user1,user2',
            TableName: GAMES_TABLE
        };
        const user2Params = {
            ExpressionAttributeValues: {
                ':u' : userId
            },
            IndexName: 'user2-index',
            KeyConditionExpression: 'user2 = :u',
            ProjectionExpression: 'gameid,gamestate,user1,user2',
            TableName: GAMES_TABLE
        };
        try {
            const result1 = await this.dynamoDb.query(user1Params).promise();
            const result2 = await this.dynamoDb.query(user2Params).promise();
            res.status(200).json(result1.Items.concat(result2.Items));
        } catch (error) {
            log.error(error);
            res.status(500).json({ error });
        }
    }

    private obscureOtherPlayerData(userId: string, game: IGame): void {
        // make hand empty, but same length, so we can display how many cards there are
        const userData = game.user1 !== userId ? game.user1_data : game.user2_data;
        for (let i = 0; i < userData.hand.length; ++i) {
            userData.hand[i] = null;
        }
        // shuffle draw pile
        game.user1 !== userId ? game.user1_data.drawPile.sort(() => Math.random() - 0.5) :
            game.user2_data.drawPile.sort(() => Math.random() - 0.5);
    }

    private drawCards(goingFirst: boolean, state: PlayerState): void {
        for (let i = 0; i < (goingFirst ? 3 : 5); ++i) {
            state.hand.push(new Card());
        }
    }

    private starterDeck(goingFirst: boolean, state: PlayerState): void {
        for (let i = 0; i < (goingFirst ? 7 : 5); ++i) {
            state.drawPile.push(new Card());
        }
    }

    private async startGame(game: IGame, userId: string): Promise<IGame> {
        const userToUpdate = !game.user1 ? 'user1' : 'user2';
        // pick someone random to go first
        const newState = Math.random() >= .5 ? GAME_STATE.USER2_TURN : GAME_STATE.USER1_TURN;

        const player1State = new PlayerState();
        this.starterDeck(newState === GAME_STATE.USER1_TURN, player1State);
        this.drawCards(newState === GAME_STATE.USER1_TURN, player1State);
        const player2State = new PlayerState();
        this.starterDeck(newState === GAME_STATE.USER2_TURN, player2State);
        this.drawCards(newState === GAME_STATE.USER2_TURN, player2State);
        const sharedState = new SharedState();
        for (let i = 0; i < 50; ++i) {
            sharedState.drawPile.push(new Card());
        }
        for (let i = 0; i < 5; ++i) {
            sharedState.tradeRow.push(new Card());
        }
        for (let i = 0; i < 20; ++i) {
            sharedState.halflings.push(new Card());
        }

        // update the game!
        const params = {
            TableName: GAMES_TABLE,
            Key: {
                gameid: game.gameid
            },
            UpdateExpression: "set gamestate=:newgamestate, " + userToUpdate + "=:user, user1_data=:user1data, user2_data=:user2data, shared_data=:sharedstate",
            ExpressionAttributeValues: {
                ":newgamestate": newState,
                ":user": userId,
                ":user1data": player1State,
                ":user2data": player2State,
                ":sharedstate": sharedState
            },
            ReturnValues: "NONE"
        };
        await this.dynamoDb.update(params).promise();

        // update the model since dynamo db updated
        game[userToUpdate] = userId;
        game.gamestate = newState;
        game.shared_data = sharedState;
        game.user1_data = player1State;
        game.user2_data = player2State;
        return game;
    }

    private async getGame(gameId: string): Promise<IGame> {
        const params = {
            Key: {
                gameid: gameId,
            },
            TableName: GAMES_TABLE
        };
        const response = await this.dynamoDb.get(params).promise();
        return response.Item as IGame;
    }
}
