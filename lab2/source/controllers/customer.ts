import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Customer from '../models/customer';
import csv from 'csv-parser';
import fs from 'fs';

const createCustomers = (req: Request, res: Response, next: NextFunction) => {
    const results: object[] = [];
    const pathToFile: string = path.join(__dirname, '../data/customerData.csv');

    fs.createReadStream(pathToFile)
        .pipe(csv())
        .on('data', (data) => {
            const customer = new Customer({
                _id: new mongoose.Types.ObjectId(),
                name: data.name,
                phone: data.phone,
                activeTariff: data.activeTariff
            });
            results.push(customer);
        })
        .on('end', () => {
            return Customer.collection.insertMany(results, function (err, docs) {
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

const getCustomers = (req: Request, res: Response, next: NextFunction) => {
    Customer.find()
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

const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
    Customer.findByIdAndDelete(req.params.id)
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

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    console.log(req.body)

    Customer.findByIdAndUpdate({ _id: req.params.id },req.body) 
        .exec()
        .then(() => {
            Customer.findOne({ _id: req.params.id });
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

export default { createCustomers, getCustomers, updateCustomer, deleteCustomer };
