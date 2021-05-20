import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import customerRoutes from './routes/customer';
import tariffRoutes from './routes/tariff';
import mobileAuthorRoutes from './routes/mobile';
const cors = require('cors');

const NAMESPACE = 'Server';
const router = express();
/* Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, 'Connected to Mongo!');
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);
    });

/* Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/* Pares the request */
router.use(cors())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST PUT PATCH DELETE');
        return res.status(200).json({});
    }
    next();
});

/* Routes */
router.use('/api/tariffs', tariffRoutes);
router.use('/api/customers', customerRoutes);
router.use('/api/mobiles', mobileAuthorRoutes);

/* Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/* Create Server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}: ${config.server.port}`));
