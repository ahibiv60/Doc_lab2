"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
var MONGO_USERNAME = process.env.MONGO_USERNAME || 'tester';
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || '1234';
var MONGO_HOST = process.env.MONGO_URL || 'cluster0.4rra9.mongodb.net/doc-labs-db?retryWrites=true&w=majority';
var MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: "mongodb+srv://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@" + MONGO_HOST
};
var SERVER_PORT = process.env.SERVER_PORT || 1337;
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    mongo: MONGO,
    server: SERVER
};
exports.default = config;
