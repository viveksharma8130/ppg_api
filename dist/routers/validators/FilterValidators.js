"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterValidators = void 0;
const express_validator_1 = require("express-validator");
const Filter_1 = require("../../models/Filter");
class FilterValidators {
    static create() {
        return [
            (0, express_validator_1.body)('title', 'title Is Required').custom((title, { req }) => {
                return Filter_1.default.findOne({ title: title }).then(filter => {
                    if (filter) {
                        throw new Error('Filter Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static filter() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Filter_1.default.findOne({ _id: id }, { __v: 0 }).then((filter) => {
                    if (filter) {
                        req.filter = filter;
                        return true;
                    }
                    else {
                        throw new Error('Filter Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Filter_1.default.findOne({ _id: id }, { __v: 0 }).then((filter) => {
                    if (filter) {
                        req.filter = filter;
                        return true;
                    }
                    else {
                        throw new Error('Filter Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Filter_1.default.findOne({ _id: id }, { __v: 0 }).then((filter) => {
                    if (filter) {
                        req.filter = filter;
                        return true;
                    }
                    else {
                        throw new Error('Filter Does Not Exist');
                    }
                });
            })];
    }
}
exports.FilterValidators = FilterValidators;
