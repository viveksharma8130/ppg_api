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
exports.ProductVariantController = void 0;
const ProductVariant_1 = require("../models/ProductVariant");
const Utils_1 = require("../utils/Utils");
class ProductVariantController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileObject = {};
            if (req.file) {
                fileObject.image = req.file.location;
                fileObject.image_name = req.file.key;
            }
            var insert = Object.assign(Object.assign({}, fileObject), req.body);
            try {
                let variants = yield new ProductVariant_1.default(insert).save();
                res.json({
                    message: 'ProductVariant Save Successfully',
                    data: variants,
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
            const ProductVariantId = req.variants._id;
            try {
                let fileObject = {};
                if (req.file) {
                    Utils_1.Utils.s3Delete(req.variants.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const variants = yield ProductVariant_1.default.findOneAndUpdate({ _id: ProductVariantId }, update, { new: true, useFindAndModify: false });
                res.send(variants);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static ProductVariant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const variants = req.variants;
            const data = {
                message: 'Success',
                data: variants
            };
            res.json(data);
        });
    }
    static allProductVariant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const variants = yield ProductVariant_1.default.find({ status: true }, { __v: 0 });
                const data = {
                    message: 'Success',
                    data: variants
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminProductVariant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const variants = yield ProductVariant_1.default.find();
                const data = {
                    message: 'Success',
                    data: variants
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
            const variants = req.variants;
            try {
                if (req.variants.image) {
                    Utils_1.Utils.s3Delete(req.variants.image_name);
                }
                yield variants.remove();
                res.json({
                    message: 'Success ! ProductVariant Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ProductVariantController = ProductVariantController;
