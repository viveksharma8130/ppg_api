"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperValidators = void 0;
const express_validator_1 = require("express-validator");
const Paper_1 = require("../../models/Paper");
class PaperValidators {
    static create() {
        return [
            express_validator_1.body('title', 'title Is Required').custom((title, { req }) => {
                return Paper_1.default.findOne({ title: title }).then(paper => {
                    if (paper) {
                        throw new Error('Paper Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('year', 'year Is Required'),
            express_validator_1.body('paper', 'paper Is Required'),
            express_validator_1.body('content', 'content Is Required')
        ];
    }
    static paper() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Paper_1.default.findOne({ _id: id }, { __v: 0 }).then((paper) => {
                    if (paper) {
                        req.paper = paper;
                        return true;
                    }
                    else {
                        throw new Error('Paper Does Not Exist');
                    }
                });
            })];
    }
    static paperType() {
        return [express_validator_1.param('paper_type').custom((paper_type, { req }) => {
                return Paper_1.default.find({ paper: paper_type }, { __v: 0 }).then((paper) => {
                    if (paper) {
                        req.paper_type = paper_type;
                        req.paper = paper;
                        return true;
                    }
                    else {
                        throw new Error('Paper Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Paper_1.default.findOne({ _id: id }, { __v: 0 }).then((paper) => {
                    if (paper) {
                        req.paper = paper;
                        return true;
                    }
                    else {
                        throw new Error('Paper Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Paper_1.default.findOne({ _id: id }, { __v: 0 }).then((paper) => {
                    if (paper) {
                        req.paper = paper;
                        return true;
                    }
                    else {
                        throw new Error('Paper Does Not Exist');
                    }
                });
            })];
    }
}
exports.PaperValidators = PaperValidators;
