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
exports.OrderController = void 0;
const Order_1 = require("../models/Order");
const OrderProduct_1 = require("../models/OrderProduct");
class OrderController {
    static productCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // order create
                const data = Object.assign(Object.assign({}, req.body), { user: req.user.user_id });
                let order = yield new Order_1.default(data).save();
                for (const product of req.body.product_data) {
                    let product_data = Object.assign(Object.assign({}, product), { order_id: order['_id'] });
                    yield new OrderProduct_1.default(product_data).save();
                }
                res.json({
                    message: 'Order Save Successfully',
                    data: order,
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
            const orderId = req.order._id;
            try {
                const order = yield Order_1.default.findOneAndUpdate({ _id: orderId }, req.body, { new: true, useFindAndModify: false })
                    .populate([
                    { path: 'user' },
                    { path: "products" }
                ]);
                res.send(order);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static order(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.order;
            const data = {
                message: 'Success',
                data: order
            };
            res.json(data);
        });
    }
    static userOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.order;
            const data = {
                message: 'Success',
                data: order
            };
            res.json(data);
        });
    }
    static allOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.default.find({ user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "products" }
                ]);
                const data = {
                    message: 'Success',
                    data: order
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.default.find()
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "products" }
                ]);
                const data = {
                    message: 'Success',
                    data: order
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
            const order = req.order;
            try {
                yield order.remove();
                res.json({
                    message: 'Success ! Order Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.OrderController = OrderController;
