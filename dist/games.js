"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const GAMES_TABLE = process.env.GAMES_TABLE;
class GameServices {
    constructor(dynamoDb) {
        this.dynamoDb = dynamoDb;
    }
    createUser(req, res) {
        const gameId = utils_1.getRandomString(16);
    }
}
exports.GameServices = GameServices;
//# sourceMappingURL=games.js.map