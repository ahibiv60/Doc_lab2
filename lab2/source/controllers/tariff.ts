import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Tariff from '../models/tariff';
import csv from 'csv-parser';
import fs from 'fs';

const createTariffs = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const results: object[] = [];
    const pathToFile: string = path.join(__dirname, '../data/tariffData.csv');

    fs.createReadStream(pathToFile)
        .pipe(csv())
        .on('data', data => {
            const tariff = new Tariff({
                _id: new mongoose.Types.ObjectId(),
                name: data.name,
                price: data.price
            });
            results.push(tariff);
        })
        .on('end', () => {
            return Tariff.collection.insertMany(results, function (err, docs) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('Data is added');
                }
            });
        });
    return res.status(201).json({
        message: 'Data is added'
    });
};

const getTariffs = (req: Request, res: Response, next: NextFunction) => {
    Tariff.find()
        .exec()
        .then(results => {
            return res.status(200).json({
                customers: results
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error
            });
        });
};

const deleteTariff = (req: Request, res: Response, next: NextFunction) => {
    Tariff.findByIdAndDelete(req.params.id)
        .exec()
        .then(result => {
            return res.status(200).json({
                customer: result
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error
            });
        });
};

const updateTariff = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    console.log(req.body)

    Tariff.findByIdAndUpdate({ _id: req.params.id },req.body) 
        .exec()
        .then(() => {
            Tariff.findOne({ _id: req.params.id });
        })
        .then(result => {
            return res.status(200).json({
                customer: result
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error
            });
        });
};

export default { createTariffs, getTariffs, deleteTariff, updateTariff };
