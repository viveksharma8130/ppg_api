"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StotraValidators = void 0;
const express_validator_1 = require("express-validator");
const Stotra_1 = require("../../models/Stotra");
class StotraValidators {
    static create() {
        return [
            express_validator_1.body('name', 'name Is Required'),
            express_validator_1.body('free', 'free Is Required'),
            express_validator_1.body('price', 'price Is Required'),
            express_validator_1.body('discounted_price', 'discounted_price Is Required'),
            express_validator_1.body('author', 'author Is Required'),
            express_validator_1.body('validity', 'validity Is Required').isNumeric(),
        ];
    }
    static Stotra() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Stotra_1.default.findOne({ _id: id }, { __v: 0 }).then((stotra) => {
                    if (stotra) {
                        req.stotra = stotra;
                        return true;
                    }
                    else {
                        throw new Error('Stotra Does Not Exist');
                    }
                });
            })];
    }
    static StotraSubject() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Stotra_1.default.find({ subject: id }, { __v: 0 }).then((stotra) => {
                    if (stotra) {
                        req.stotra = stotra;
                        return true;
                    }
                    else {
                        throw new Error('subject Does Not Exist');
                    }
                });
            })];
    }
    static StotraCourse() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Stotra_1.default.find({ course: id }, { __v: 0 }).then((stotra) => {
                    if (stotra) {
                        req.stotra = stotra;
                        return true;
                    }
                    else {
                        throw new Error('course Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Stotra_1.default.findOne({ _id: id }, { __v: 0 }).then((stotra) => {
                    if (stotra) {
                        req.stotra = stotra;
                        return true;
                    }
                    else {
                        throw new Error('Stotra Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Stotra_1.default.findOne({ _id: id }, { __v: 0 }).then((stotra) => {
                    if (stotra) {
                        req.stotra = stotra;
                        return true;
                    }
                    else {
                        throw new Error('Stotra Does Not Exist');
                    }
                });
            })];
    }
}
exports.StotraValidators = StotraValidators;
