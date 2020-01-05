import * as log from 'loglevel';

import AWS from 'aws-sdk';
import express from "express";
import {getRandomString} from './utils';

const GAME_STATE = {
    CREATED: 0,
    USER1_TURN: 10,
    USER2_TURN: 11,
    USER1_WON: 20,
    USER2_WON: 21,
    DRAW: 22
};

const GAMES_TABLE = process.env.GAMES_TABLE;

export class GameServices {
    constructor(public dynamoDb: AWS.DynamoDB.DocumentClient) {}

    public async createGame(req: express.Request, res: express.Response): Promise<void> {
        const userId = req.params.userId;
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }
        const gameId = getRandomString(16);
        const params = {
            Item: {
                gameId,
                gamestate: GAME_STATE.CREATED,
                user1: userId,
                user2: '',
                user1_data: {},
                user2_data: {},
                shared_data: {}
            },
            TableName: GAMES_TABLE
        };

        try {
            await this.dynamoDb.put(params).promise();
            res.status(200).json( {gameId} );
        } catch (error) {
            log.error(error);
            res.status(400).json({ error: 'Could not create game', message: error });
        }
    }

    public async getGamesForUser(req: express.Request, res: express.Response): Promise<void> {
        const userId = req.params.userId;
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        }

        const params = {
            ExpressionAttributeValues: {
                ':u' : {S: userId}
            },
            KeyConditionExpression: 'user1 = :u or user2 = :u',
            ProjectionExpression: 'gameid,gamestate,user1,user2',
            TableName: GAMES_TABLE
          };
        try {
            const result = await this.dynamoDb.query(params).promise();
            res.status(200).json(result.Items);
        } catch (error) {
            log.error(error);
            res.status(500).json({ error });
        }
    }
}
