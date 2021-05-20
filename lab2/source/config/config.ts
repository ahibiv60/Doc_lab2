import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'Farmose';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '066600ab';
const MONGO_HOST = process.env.MONGO_URL || 'lab2.fq6j7.mongodb.net/myFirstDatabase';

const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;