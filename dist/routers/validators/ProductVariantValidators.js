"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantValidators = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = require("../../models/Product");
const ProductVariant_1 = require("../../models/ProductVariant");
class ProductVariantValidators {
    static create() {
        return [
            express_validator_1.body('colour', 'colour Is Required'),
            express_validator_1.body('size', 'size Is Required'),
            express_validator_1.body('product_id', 'product_id Is Required').custom((product_id, { req }) => {
                return Product_1.default.findOne({ _id: product_id }).then(product => {
                    if (product) {
                        return true;
                    }
                    else {
                        throw new Error('Product Doesnt Exist');
                    }
                });
            }),
            express_validator_1.body('price', 'price Is Required'),
            express_validator_1.body('mrp', 'mrp Is Required'),
        ];
    }
    static ProductVariant() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return ProductVariant_1.default.findOne({ _id: id }, { __v: 0 }).then((variants) => {
                    if (variants) {
                        req.variants = variants;
                        return true;
                    }
                    else {
                        throw new Error('Does Not Exist');
                    }
                });
            })];
    }
    static itemProductVariant() {
        return [express_validator_1.param('product_id').custom((product_id, { req }) => {
                return ProductVariant_1.default.find({ product_id: product_id }, { __v: 0 }).then((variants) => {
                    if (variants) {
                        req.variants = variants;
                        return true;
                    }
                    else {
                        throw new Error('Package Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return ProductVariant_1.default.findOne({ _id: id }, { __v: 0 }).then((variants) => {
                    if (variants) {
                        req.variants = variants;
                        return true;
                    }
                    else {
                        throw new Error('Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return ProductVariant_1.default.findOne({ _id: id }, { __v: 0 }).then((variants) => {
                    if (variants) {
                        req.variants = variants;
                        return true;
                    }
                    else {
                        throw new Error('Does Not Exist');
                    }
                });
            })];
    }
}
exports.ProductVariantValidators = ProductVariantValidators;
