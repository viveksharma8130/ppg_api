"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PujaPackageValidators = void 0;
const express_validator_1 = require("express-validator");
const Puja_1 = require("../../models/Puja");
const PujaPackage_1 = require("../../models/PujaPackage");
class PujaPackageValidators {
    static create() {
        return [
            express_validator_1.body('title', 'title Is Required'),
            express_validator_1.body('puja_id', 'puja_id Is Required').custom((puja_id, { req }) => {
                return Puja_1.default.findOne({ _id: puja_id }).then(puja => {
                    if (puja) {
                        return true;
                    }
                    else {
                        throw new Error('Puja Doesnt Exist');
                    }
                });
            }),
            express_validator_1.body('price', 'price Is Required')
        ];
    }
    static PujaPackage() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return PujaPackage_1.default.findOne({ _id: id }, { __v: 0 }).then((packages) => {
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
    static itemPujaPackage() {
        return [express_validator_1.param('puja_id').custom((puja_id, { req }) => {
                return PujaPackage_1.default.find({ puja_id: puja_id }, { __v: 0 }).then((packages) => {
                    if (packages) {
                        req.packages = packages;
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
                return PujaPackage_1.default.findOne({ _id: id }, { __v: 0 }).then((packages) => {
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
                return PujaPackage_1.default.findOne({ _id: id }, { __v: 0 }).then((packages) => {
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
exports.PujaPackageValidators = PujaPackageValidators;
