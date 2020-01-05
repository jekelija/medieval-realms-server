import * as log from 'loglevel';

import AWS from 'aws-sdk';
import express from "express";
import {getRandomString, sha512} from './utils';

const USERS_TABLE = process.env.USERS_TABLE;

export class UserServices {
    constructor(public dynamoDb: AWS.DynamoDB.DocumentClient) {}

    public async auth(req: express.Request, res: express.Response): Promise<void> {
        const { userId, password } = req.body;
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        } else if (typeof password !== 'string') {
          res.status(400).json({ error: '"password" must be a string' });
        }

        const params = {
            Key: {
                userId
            },
            TableName: USERS_TABLE
          };
        try {
            const result = await this.dynamoDb.get(params).promise();
            if (result.Item) {
                // auth against salt
                const saltedAndHashedUserPassword = sha512(password, result.Item.salt);
                if (saltedAndHashedUserPassword === result.Item.password) {
                    res.status(200).json({userId});
                } else {
                    res.status(403).json({ error: 'Invalid username/password; no match',
                    dbPassword: result.Item.password,
                    dbSalt: result.Item.salt,
                    salted: saltedAndHashedUserPassword,
                    userPw: password });
                }
            } else {
                res.status(403).json({ error: 'Invalid username/password; no user' });
            }
        } catch (error) {
            log.error(error);
            res.status(403).json({ error: 'Invalid username/password: ' + error });
        }
    }

    public async createUser(req: express.Request, res: express.Response): Promise<void> {
        const { userId, password, email } = req.body;
        if (typeof userId !== 'string') {
          res.status(400).json({ error: '"userId" must be a string' });
        } else if (typeof password !== 'string') {
          res.status(400).json({ error: '"password" must be a string' });
        } else if (typeof email !== 'string') {
          res.status(400).json({ error: '"email" must be a string' });
        }

        // create a salt and hash and salt the password
        const salt = getRandomString(16); /** Gives us salt of length 16 */
        const passwordData = sha512(password, salt);

        const params = {
          Item: {
            password: passwordData,
            salt,
            userId,
            email
          },
          TableName: USERS_TABLE
        };

        try {
            await this.dynamoDb.put(params).promise();
            res.status(200).json( {userId} );
        } catch (error) {
            log.error(error);
            res.status(400).json({ error: 'Could not create user', message: error });
        }

      }
}
