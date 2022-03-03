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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperController = void 0;
const Paper_1 = require("../models/Paper");
const Utils_1 = require("../utils/Utils");
class PaperController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Paper_data = yield new Paper_1.default(req.body).save();
                res.json({
                    message: 'Paper Save Successfully',
                    data: Paper_data,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static excel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const excelData = yield Utils_1.Utils.importExcelData2MongoDB(req.file.path);
            yield Paper_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const PaperId = req.paper._id;
            try {
                const paper = yield Paper_1.default.findOneAndUpdate({ _id: PaperId }, req.body, { new: true, useFindAndModify: false });
                res.send(paper);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static paper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paper = req.paper;
            const data = {
                message: 'Success',
                data: paper
            };
            res.json(data);
        });
    }
    static paperType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paper = req.paper;
            const data = {
                message: 'Success',
                data: paper
            };
            res.json(data);
        });
    }
    static paper_wise(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // var condition: any = [
            //     {
            //         $group :
            //         {
            //             _id:"$year",
            //             results: {$push: '$$ROOT'}   
            //         }
            //     },
            //     {   $match:{ paper:req.paper_type} }
            // ];
            //const paper= await Paper.aggregate(condition);
            var year_array = [];
            let papers = yield Paper_1.default.find({ paper: req.paper_type });
            for (var element of papers) {
                var index = year_array.findIndex(x => x.year == element['year']);
                if (index === -1) {
                    var dat = yield Paper_1.default.find({ paper: req.paper_type, year: element['year'] }).sort({ sequence: 1 });
                    year_array.push({
                        year: element['year'],
                        data: dat
                    });
                }
            }
            const data = {
                message: 'Success',
                data: year_array
            };
            res.json(data);
        });
    }
    static allPaper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paper = yield Paper_1.default.find({ status: true }, { __v: 0 });
                const data = {
                    message: 'Success',
                    data: paper
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminPaper(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paper = yield Paper_1.default.find();
                const data = {
                    message: 'Success',
                    data: paper
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const paper = req.paper;
            try {
                yield paper.remove();
                res.json({
                    message: 'Success ! Paper Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PaperController = PaperController;
