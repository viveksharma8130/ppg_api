"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPackageValidators = void 0;
const express_validator_1 = require("express-validator");
const ProductPackage_1 = require("../../models/ProductPackage");
class ProductPackageValidators {
    static create() {
        return [
            express_validator_1.body('item', 'item Is Required'),
            express_validator_1.body('item_id', 'item_id Is Required'),
            express_validator_1.body('validity', 'validity Is Required').custom((validity, { req }) => {
                return ProductPackage_1.default.findOne({ validity: validity, item_id: req.body.item_id }).then(packages => {
                    if (packages) {
                        throw new Error('Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('price', 'price Is Required')
        ];
    }
    static ProductPackage() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return ProductPackage_1.default.findOne({ _id: id }, { __v: 0 }).then((packages) => {
                    if (packages) {
                        req.packages = packages;
                        return true;
                    }
                    else {
                        throw new Error('Does Not Exist');
                    }
                });
            })];
    }
    static itemProductPackage() {
        return [express_validator_1.param('item_id').custom((item_id, { req }) => {
                return ProductPackage_1.default.find({ item_id: item_id }, { __v: 0 }).then((packages) => {
                    if (packages) {
                        req.packages = packages;
                        return true;
                    }
                    else {
                        throw new Error('Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return ProductPackage_1.default.findOne({ _id: id }, { __v: 0 }).then((packages) => {
                    if (packages) {
                        req.packages = packages;
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
                return ProductPackage_1.default.findOne({ _id: id }, { __v: 0 }).then((packages) => {
                    if (packages) {
                        req.packages = packages;
                        return true;
                    }
                    else {
                        throw new Error('Does Not Exist');
                    }
                });
            })];
    }
}
exports.ProductPackageValidators = ProductPackageValidators;
