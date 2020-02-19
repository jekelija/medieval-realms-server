import * as log from 'loglevel';

import AWS from 'aws-sdk';
import express from "express";
import { GAMES_TABLE, USERS_TABLE } from './constants';
import { Card } from './model/card';
import { Chat } from './model/chat';
import { GAME_STATE, IGame } from './model/game';
import { PlayerState } from './model/playerstate';
import { SharedState } from './model/sharedstate';
import {getRandomString} from './utils';
import { StartingDeck, HalflingDeck, Deck } from './model/deck';

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

    public async addChat(req: express.Request, res: express.Response): Promise<void> {
        const gameId = req.params.gameId;
        const userId = req.params.userId;
        const { message } = req.body;
        if (typeof gameId !== 'string') {
            res.status(400).json({ error: '"gameId" must be a string' });
        }
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }
        if (!message) {
          res.status(400).json({ error: '"message" must be provided' });
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
                else if (game.user1 !== userId && game.user2 !== userId) {
                    res.status(400).json({ error: 'You are not a part of game ' + gameId });
                }
                else {
                    await this.updateChat(game, userId, message);
                    res.status(200).json( game.gameid );
                }
            }

        } catch (error) {
            log.error(error);
            res.status(500).json({ error: 'Could not add chat message' });
        }
    }

    public async endTurn(req: express.Request, res: express.Response): Promise<void> {
        const gameId = req.params.gameId;
        const userId = req.params.userId;
        const { sharedState, playerData, otherPlayerHealth } = req.body;

        if (typeof gameId !== 'string') {
            res.status(400).json({ error: '"gameId" must be a string' });
        }
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }
        if (!sharedState) {
          res.status(400).json({ error: '"sharedState" must be provided' });
        }
        if (!playerData) {
            res.status(400).json({ error: '"playerData" must be provided' });
        }
        if (!otherPlayerHealth) {
            res.status(400).json({ error: '"otherPlayerHealth" must be provided' });
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
                else if (game.user1 !== userId && game.user2 !== userId) {
                    res.status(400).json({ error: 'You are not a part of game ' + gameId });
                }
                else if (game.user1 === userId && game.gamestate !== GAME_STATE.USER1_TURN) {
                    res.status(400).json({ error: 'It is not your turn in game ' + gameId });
                }
                else if (game.user2 === userId && game.gamestate !== GAME_STATE.USER2_TURN) {
                    res.status(400).json({ error: 'It is not your turn in game ' + gameId });
                }
                else {
                    await this.updateGame(game, userId, sharedState, playerData, otherPlayerHealth);
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

    private async updateGame(game: IGame, userId: string, sharedState: SharedState,
                             playerState: PlayerState, otherPlayerHealth: number): Promise<void> {
        // update shared state
        game.shared_data = sharedState;
        // change turn
        game.gamestate === GAME_STATE.USER1_TURN && userId === game.user1 ?
            game.gamestate = GAME_STATE.USER2_TURN : game.gamestate = GAME_STATE.USER1_TURN;

        // update player state
        const dataToUpdate = game.user1 === userId ? 'user1_data' : 'user2_data';
        game[dataToUpdate] = playerState;

        // update other player health
        const otherDataToUpdate = game.user1 === userId ? 'user2_data' : 'user1_data';
        game[otherDataToUpdate].health = otherPlayerHealth;

        // update the game!
        const params = {
            TableName: GAMES_TABLE,
            Key: {
                gameid: game.gameid
            },
            UpdateExpression: "set gamestate=:newgamestate, " + dataToUpdate + "=:user_data," + otherDataToUpdate + "=:other_user_data, shared_data=:sharedstate",
            ExpressionAttributeValues: {
                ":newgamestate": game.gamestate,
                ":user_data": playerState,
                ":other_user_data": game[otherDataToUpdate],
                ":sharedstate": game.shared_data
            },
            ReturnValues: "NONE"
        };
        await this.dynamoDb.update(params).promise();
    }

    private async updateChat(game: IGame, userId: string, message: string): Promise<void> {
        // update the game!
        const emptyList: Chat[] = [];
        const newChat = new Chat();
        newChat.createdate = new Date().getTime();
        newChat.user = userId;
        newChat.message = message;
        newChat.id = getRandomString(16);

        const params = {
            TableName: GAMES_TABLE,
            Key: {
                gameid: game.gameid
            },
            UpdateExpression: "set #chatHistory = list_append(if_not_exists(#chatHistory, :empty_list), :chat)",
            ExpressionAttributeNames: {
                '#chatHistory': 'chatHistory'
            },
            ExpressionAttributeValues: {
                ":empty_list": emptyList,
                ":chat": [newChat]
            },
            ReturnValues: "NONE"
        };
        await this.dynamoDb.update(params).promise();
    }

    private drawCards(goingFirst: boolean, state: PlayerState, cards:Card[]): void {
        for (let i = 0; i < (goingFirst ? 3 : 5); ++i) {
            state.hand.push(cards[i]);
        }
    }

    private starterDeck(goingFirst: boolean, state: PlayerState, cards:Card[]): void {
        for (let i = (goingFirst ? 2 : 4); i < cards.length; ++i) {
            state.drawPile.push(cards[i]);
        }
    }

    private createCardArray(cardInfo: Array<{card: Card, qty: number}>): Card[] {
        const cardArray: Card[] = [];
        for(const info of cardInfo) {
            for(let i = 0; i < info.qty; ++i) {
                cardArray.push(info.card);
            }
        }

        // random shuffle
        return cardArray.sort(() => Math.random() - 0.5);
    }

    private async startGame(game: IGame, userId: string): Promise<IGame> {
        const userToUpdate = !game.user1 ? 'user1' : 'user2';
        // pick someone random to go first
        const newState = Math.random() >= .5 ? GAME_STATE.USER2_TURN : GAME_STATE.USER1_TURN;

        const player1Deck = this.createCardArray(StartingDeck);
        const player2Deck = this.createCardArray(StartingDeck);

        const player1State = new PlayerState();
        this.starterDeck(newState === GAME_STATE.USER1_TURN, player1State, player1Deck);
        this.drawCards(newState === GAME_STATE.USER1_TURN, player1State, player1Deck);
        const player2State = new PlayerState();
        this.starterDeck(newState === GAME_STATE.USER2_TURN, player2State, player2Deck);
        this.drawCards(newState === GAME_STATE.USER2_TURN, player2State, player2Deck);
        const sharedState = new SharedState();

        const deck = this.createCardArray(Deck.cards);
        for (let i = 0; i < 5; ++i) {
            sharedState.tradeRow.push(deck[i]);
        }
        for (let i = 5; i < deck.length; ++i) {
            sharedState.drawPile.push(deck[i]);
        }
        const halflings = this.createCardArray(HalflingDeck);
        for (const h of halflings) {
            sharedState.halflings.push(h);
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
