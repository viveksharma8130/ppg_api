"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const Article_1 = require("../models/Article");
const Utils_1 = require("../utils/Utils");
class ArticleController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let article_data = yield new Article_1.default(insert).save();
                res.json({
                    message: 'Article Save Successfully',
                    data: article_data,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ArticleId = req.article._id;
            try {
                let fileObject = {};
                if (req.file) {
                    Utils_1.Utils.s3Delete(req.article.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const article = yield Article_1.default.findOneAndUpdate({ _id: ArticleId }, update, { new: true, useFindAndModify: false });
                res.send(article);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Article(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = req.article;
            const data = {
                message: 'Success',
                data: article
            };
            res.json(data);
        });
    }
    static allArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield Article_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: article
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield Article_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: article
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = req.article;
            try {
                if (req.article.image) {
                    Utils_1.Utils.s3Delete(req.article.image_name);
                }
                yield article.remove();
                res.json({
                    message: 'Success ! Article Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ArticleController = ArticleController;
