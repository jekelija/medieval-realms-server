"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const users_1 = require("./users");
const app = express_1.default();
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();
const userServices = new users_1.UserServices(dynamoDb);
app.use(body_parser_1.default.json({ strict: false }));
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
module.exports.handler = serverless_http_1.default(app);
//# sourceMappingURL=index.js.map