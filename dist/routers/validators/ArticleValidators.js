"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleValidators = void 0;
const express_validator_1 = require("express-validator");
const Article_1 = require("../../models/Article");
class ArticleValidators {
    static create() {
        return [
            express_validator_1.body('title', 'title Is Required'),
            express_validator_1.body('description', 'description Is Required'),
        ];
    }
    static Article() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Article_1.default.findOne({ _id: id }, { __v: 0 }).then((article) => {
                    if (article) {
                        req.article = article;
                        return true;
                    }
                    else {
                        throw new Error('Article Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Article_1.default.findOne({ _id: id }, { __v: 0 }).then((article) => {
                    if (article) {
                        req.article = article;
                        return true;
                    }
                    else {
                        throw new Error('Article Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Article_1.default.findOne({ _id: id }, { __v: 0 }).then((article) => {
                    if (article) {
                        req.article = article;
                        return true;
                    }
                    else {
                        throw new Error('Article Does Not Exist');
                    }
                });
            })];
    }
}
exports.ArticleValidators = ArticleValidators;
