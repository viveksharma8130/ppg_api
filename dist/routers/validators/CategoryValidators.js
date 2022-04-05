"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidators = void 0;
const express_validator_1 = require("express-validator");
const Category_1 = require("../../models/Category");
class CategoryValidators {
    static create() {
        return [
            express_validator_1.body('category', 'Category Is Required').custom((category, { req }) => {
                return Category_1.default.findOne({ category: category }).then(category => {
                    if (category) {
                        throw new Error('Category Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static category() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Category_1.default.findOne({ _id: id }, { __v: 0 }).populate('filter').then((category) => {
                    if (category) {
                        req.category = category;
                        return true;
                    }
                    else {
                        throw new Error('Category Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Category_1.default.findOne({ _id: id }, { __v: 0 }).then((category) => {
                    if (category) {
                        req.category = category;
                        return true;
                    }
                    else {
                        throw new Error('Category Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Category_1.default.findOne({ _id: id }, { __v: 0 }).then((category) => {
                    if (category) {
                        req.category = category;
                        return true;
                    }
                    else {
                        throw new Error('Category Does Not Exist');
                    }
                });
            })];
    }
}
exports.CategoryValidators = CategoryValidators;
