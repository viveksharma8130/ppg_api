"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PujaValidators = void 0;
const express_validator_1 = require("express-validator");
const Puja_1 = require("../../models/Puja");
class PujaValidators {
    static create() {
        return [
            (0, express_validator_1.body)('name', 'name Is Required').custom((name, { req }) => {
                return Puja_1.default.findOne({ name: name }).then(puja => {
                    if (puja) {
                        throw new Error('Puja Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)('price', 'price is Required').isNumeric(),
            //body('samagri_price', 'samagri_price Is Required').isNumeric(),
        ];
    }
    static Puja() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Puja_1.default.findOne({ _id: id }, { __v: 0 }).then((puja) => {
                    if (puja) {
                        req.puja = puja;
                        return true;
                    }
                    else {
                        throw new Error('Puja Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Puja_1.default.findOne({ _id: id }, { __v: 0 }).populate({ path: 'packages' }).then((puja) => {
                    if (puja) {
                        req.puja = puja;
                        return true;
                    }
                    else {
                        throw new Error('Puja Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Puja_1.default.findOne({ _id: id }, { __v: 0 }).then((puja) => {
                    if (puja) {
                        req.puja = puja;
                        return true;
                    }
                    else {
                        throw new Error('Puja Does Not Exist');
                    }
                });
            })];
    }
}
exports.PujaValidators = PujaValidators;
