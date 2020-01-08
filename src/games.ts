import * as log from 'loglevel';

import AWS from 'aws-sdk';
import express from "express";
import {getRandomString} from './utils';

export enum GAME_STATE {
    CREATED= 0,
    USER1_TURN= 10,
    USER2_TURN= 11,
    USER1_WON= 20,
    USER2_WON= 21,
    DRAW= 22
}

const GAMES_TABLE = process.env.GAMES_TABLE;

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
}
