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
exports.FilterController = void 0;
const Filter_1 = require("../models/Filter");
const Utils_1 = require("../utils/Utils");
class FilterController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let category_data = yield new Filter_1.default(req.body).save();
                res.json({
                    message: 'Filter Save Successfully',
                    data: category_data,
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
            yield Filter_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const FilterId = req.filter._id;
            try {
                const filter = yield Filter_1.default.findOneAndUpdate({ _id: FilterId }, req.body, { new: true, useFindAndModify: false });
                res.send(filter);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static filter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = req.filter;
            const data = {
                message: 'Success',
                data: filter
            };
            res.json(data);
        });
    }
    static allFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = yield Filter_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: filter
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = yield Filter_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: filter
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
            const filter = req.filter;
            try {
                yield filter.remove();
                res.json({
                    message: 'Success ! Filter Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.FilterController = FilterController;
