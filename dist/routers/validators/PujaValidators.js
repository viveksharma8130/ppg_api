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
            //body('price', 'price is Required').isNumeric(),
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
    static orderCreate() {
        return [
            (0, express_validator_1.body)('puja_id', 'puja_id Is Required'),
            (0, express_validator_1.body)('puja_amount', 'amount Is Required'),
            (0, express_validator_1.body)('puja_data', 'payment_data Is Required'),
            (0, express_validator_1.body)('amount', 'amount Is Required'),
            (0, express_validator_1.body)('puja_date', 'puja_date Is Required'),
            (0, express_validator_1.body)('samagri_status', 'samagri_status Is Required'),
            (0, express_validator_1.body)('payment_id', 'payment_id Is Required'),
            (0, express_validator_1.body)('payment_data', 'payment_data Is Required'),
            (0, express_validator_1.body)('item_data', 'item_data Is Required'),
            (0, express_validator_1.body)('name', 'name Is Required'),
            (0, express_validator_1.body)('address', 'address Is Required'),
            (0, express_validator_1.body)('phone', 'phone Is Required'),
            (0, express_validator_1.body)('status', 'status Is Required'),
        ];
    }
}
exports.PujaValidators = PujaValidators;
