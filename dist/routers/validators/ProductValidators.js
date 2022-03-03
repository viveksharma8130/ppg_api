"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidators = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = require("../../models/Product");
class ProductValidators {
    static create() {
        return [
            (0, express_validator_1.body)('name', 'name Is Required').custom((name, { req }) => {
                return Product_1.default.findOne({ name: name }).then(product => {
                    if (product) {
                        throw new Error('Product Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)('price', 'price is Required').isString(),
            (0, express_validator_1.body)('mrp', 'mrp Is Required').isNumeric(),
        ];
    }
    static product() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Product_1.default.findOne({ _id: id }, { __v: 0 }).then((product) => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Product_1.default.findOne({ _id: id }, { __v: 0 }).then((product) => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Product_1.default.findOne({ _id: id }, { __v: 0 }).then((product) => {
                    if (product) {
                        req.product = product;
                        return true;
                    }
                    else {
                        throw new Error('Product Does Not Exist');
                    }
                });
            })];
    }
}
exports.ProductValidators = ProductValidators;
