"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var user_1 = __importDefault(require("../models/user"));
var csv_parser_1 = __importDefault(require("csv-parser"));
var fs_1 = __importDefault(require("fs"));
var createUsers = function (req, res, next) {
    var results = [];
    var pathToFile = path_1.default.join(__dirname, 'data.csv');
    fs_1.default.createReadStream(pathToFile)
        .pipe(csv_parser_1.default())
        .on('userData', function (data) {
        var user = new user_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: data.name,
            age: data.age,
            amountOfPurchasedCourses: data.amountOfPurchasedCourses
        });
        results.push(user);
    })
        .on('end', function () {
        return user_1.default.collection.insertMany(results, function (err, docs) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log('Data is added');
            }
        });
    });
    return res.status(201).json({
        message: 'Data is added'
    });
};
exports.default = { createUsers: createUsers };
