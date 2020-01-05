import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import express from "express";
import serverless from "serverless-http";
import { UserServices } from './users';

const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const userServices = new UserServices(dynamoDb);

app.use(bodyParser.json({ strict: false }));

// Create game endpoint
app.post('/game', (req, res) => {
  // TODO
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
