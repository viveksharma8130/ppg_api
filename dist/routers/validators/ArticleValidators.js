"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleValidators = void 0;
const express_validator_1 = require("express-validator");
const Article_1 = require("../../models/Article");
class ArticleValidators {
    static create() {
        return [
            (0, express_validator_1.body)('article', 'article Is Required').custom((article, { req }) => {
                return Article_1.default.findOne({ article: article }).then(article => {
                    if (article) {
                        throw new Error('article Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static Article() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
