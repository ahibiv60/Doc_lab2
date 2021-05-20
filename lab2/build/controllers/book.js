"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var book_1 = __importDefault(require("../models/book"));
var user_1 = __importDefault(require("../models/user"));
var csv_parser_1 = __importDefault(require("csv-parser"));
var fs_1 = __importDefault(require("fs"));
var createBook = function (req, res, next) {
    var _a = req.body, author = _a.author, title = _a.title;
    var book = new book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author: author,
        title: title
    });
    return book
        .save()
        .then(function (result) {
        return res.status(201).json({
            book: result
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var getAllBooks = function (req, res, next) {
    var results = [];
    var pathToFile = path_1.default.join(__dirname, 'data.csv');
    fs_1.default.createReadStream(pathToFile)
        .pipe(csv_parser_1.default())
        .on('data', function (data) {
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
    return res.status(201);
};
exports.default = { createBook: createBook, getAllBooks: getAllBooks };
