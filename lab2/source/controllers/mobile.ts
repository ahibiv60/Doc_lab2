import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Mobile from '../models/mobile';
import csv from 'csv-parser';
import fs from 'fs';

const createMobiles = (req: Request, res: Response, next: NextFunction) => {
    const results: object[] = [];
    const pathToFile: string = path.join(__dirname, '../data/mobileData.csv');

    fs.createReadStream(pathToFile)
        .pipe(csv())
        .on('data', data => {
            const mobile = new Mobile({
                _id: new mongoose.Types.ObjectId(),
                name: data.name,
                price: data.price
            });
            results.push(mobile);
        })
        .on('end', () => {
            return Mobile.collection.insertMany(results, function (err, docs) {
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

export default { createMobiles };
