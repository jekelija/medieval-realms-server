"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log = __importStar(require("loglevel"));
const utils_1 = require("./utils");
const USERS_TABLE = process.env.USERS_TABLE;
class UserServices {
    constructor(dynamoDb) {
        this.dynamoDb = dynamoDb;
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, password } = req.body;
            if (typeof userId !== 'string') {
                res.status(400).json({ error: '"userId" must be a string' });
            }
            else if (typeof password !== 'string') {
                res.status(400).json({ error: '"password" must be a string' });
            }
            const params = {
                Key: {
                    userId
                },
                TableName: USERS_TABLE
            };
            try {
                const result = yield this.dynamoDb.get(params).promise();
                if (result.Item) {
                    // auth against salt
                    const saltedAndHashedUserPassword = utils_1.sha512(password, result.Item.salt);
                    if (saltedAndHashedUserPassword === result.Item.password) {
                        res.status(200).json({ userId });
                    }
                    else {
                        res.status(403).json({ error: 'Invalid username/password' });
                    }
                }
                else {
                    res.status(403).json({ error: 'Invalid username/password' });
                }
            }
            catch (error) {
                log.error(error);
                res.status(403).json({ error: 'Invalid username/password' });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, password, email } = req.body;
            if (typeof userId !== 'string') {
                res.status(400).json({ error: '"userId" must be a string' });
            }
            else if (typeof password !== 'string') {
                res.status(400).json({ error: '"password" must be a string' });
            }
            else if (typeof email !== 'string') {
                res.status(400).json({ error: '"email" must be a string' });
            }
            // create a salt and hash and salt the password
            const salt = utils_1.getRandomString(16); /** Gives us salt of length 16 */
            const passwordData = utils_1.sha512(password, salt);
            const params = {
                Item: {
                    passwordData,
                    salt,
                    userId,
                    email
                },
                TableName: USERS_TABLE
            };
            try {
                yield this.dynamoDb.put(params).promise();
                res.status(200).json({ userId });
            }
            catch (error) {
                log.error(error);
                res.status(400).json({ error: 'Could not create user', message: error });
            }
        });
    }
}
exports.UserServices = UserServices;
//# sourceMappingURL=users.js.map