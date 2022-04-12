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
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const Utils_1 = require("../utils/Utils");
class ProductController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let course_data = yield new Product_1.default(insert).save();
                res.json({
                    message: 'Product Save Successfully',
                    data: course_data,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static excel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const excelData = yield Utils_1.Utils.importExcelData2MongoDB(req.file.path);
            yield Product_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    Utils_1.Utils.s3Delete(req.product.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const product = yield Product_1.default.findOneAndUpdate({ _id: req.product._id }, update, { new: true, useFindAndModify: false });
                res.send(product);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = req.product;
            try {
                if (req.product.image) {
                    Utils_1.Utils.s3Delete(req.product.image_name);
                }
                yield product.remove();
                res.json({
                    message: 'Success ! Product Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static product(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var product = req.product;
            let myData = product.toObject();
            // order status
            myData['order_status'] = false;
            if (req.user) {
                let order_data = yield Order_1.default.find({
                    user: req.user.user_id,
                    item: 'products',
                    item_id: myData['_id'],
                    to_date: { $gte: new Date }
                });
                myData['order_data'] = order_data;
                let order_status = yield Order_1.default.countDocuments({
                    user: req.user.user_id,
                    item: 'products',
                    item_id: myData['_id'],
                    to_date: { $gte: new Date }
                });
                if (order_status > 0) {
                    myData['order_status'] = true;
                }
            }
            const data = {
                message: 'Success',
                data: myData
            };
            res.json(data);
        });
    }
    static allProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.default.find({ status: true }, { __v: 0 }).populate({ path: 'variants' }).sort({ sequence: 1 });
                let course_array = [];
                for (let data of product) {
                    let myData = data.toObject();
                    // order status
                    myData['order_status'] = false;
                    if (req.user) {
                        let order_data = yield Order_1.default.find({
                            user: req.user.user_id,
                            item: 'products',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        myData['order_data'] = order_data;
                        let order_status = yield Order_1.default.countDocuments({
                            user: req.user.user_id,
                            item: 'products',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        if (order_status > 0) {
                            myData['order_status'] = true;
                        }
                    }
                    course_array.push(myData);
                }
                const data = {
                    message: 'Success',
                    data: course_array
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allHomeProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.default.find({ status: true, ishome: true }, { __v: 0 }).populate({ path: 'variants' }).sort({ sequence: 1 });
                let course_array = [];
                for (let data of product) {
                    let myData = data.toObject();
                    // order status
                    myData['order_status'] = false;
                    if (req.user) {
                        let order_data = yield Order_1.default.find({
                            user: req.user.user_id,
                            item: 'products',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        myData['order_data'] = order_data;
                        let order_status = yield Order_1.default.countDocuments({
                            user: req.user.user_id,
                            item: 'products',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        if (order_status > 0) {
                            myData['order_status'] = true;
                        }
                    }
                    course_array.push(myData);
                }
                const data = {
                    message: 'Success',
                    data: course_array
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Product_1.default.find().populate({ path: 'variants' }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: product
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ProductController = ProductController;
