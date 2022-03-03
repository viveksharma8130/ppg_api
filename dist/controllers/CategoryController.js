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
exports.CategoryController = void 0;
const Category_1 = require("../models/Category");
const Utils_1 = require("../utils/Utils");
class CategoryController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body.category;
            try {
                const data = {
                    category: category
                };
                let category_data = yield new Category_1.default(data).save();
                res.json({
                    message: 'Category Save Successfully',
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
            yield Category_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const CategoryId = req.Category._id;
            try {
                const category = yield Category_1.default.findOneAndUpdate({ _id: CategoryId }, req.body, { new: true, useFindAndModify: false });
                res.send(category);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static category(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.Category;
            const data = {
                message: 'Success',
                data: category
            };
            res.json(data);
        });
    }
    static allCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield Category_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: category
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield Category_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: category
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
            const Category = req.Category;
            try {
                yield Category.remove();
                res.json({
                    message: 'Success ! Category Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.CategoryController = CategoryController;
