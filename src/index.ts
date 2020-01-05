import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import express from "express";
import serverless from "serverless-http";
import { GameServices } from './games';
import { UserServices } from './users';

const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const gameServices = new GameServices(dynamoDb);
const userServices = new UserServices(dynamoDb);

app.use(bodyParser.json({ strict: false }));

// Create game endpoint
app.post('/games/user/:userId', (req, res) => {
  gameServices.createGame(req, res);
});

// Get game endpoint
app.get('/games/user/:userId', (req, res) => {
  gameServices.getGamesForUser(req, res);
});

// Auth User endpoint
app.post('/users/login', (req, res) => {
  userServices.auth(req, res);
});

// Create User endpoint
app.post('/users', (req, res) => {
  userServices.createUser(req, res);
});

module.exports.handler = serverless(app);
