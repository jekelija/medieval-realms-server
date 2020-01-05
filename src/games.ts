import * as log from 'loglevel';

import AWS from 'aws-sdk';
import express from "express";
import {getRandomString} from './utils';

const GAMES_TABLE = process.env.GAMES_TABLE;

export class GameServices {
    constructor(public dynamoDb: AWS.DynamoDB.DocumentClient) {}

    public createUser(req: express.Request, res: express.Response): void {
        const gameId = getRandomString(16);

      }
}
