"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidators = void 0;
const express_validator_1 = require("express-validator");
const Order_1 = require("../../models/Order");
class OrderValidators {
    static create() {
        return [
            express_validator_1.body('amount', 'amount Is Required'),
            express_validator_1.body('payment_id', 'payment_id Is Required'),
            express_validator_1.body('payment_data', 'payment_data Is Required'),
            express_validator_1.body('contact_name', 'contact_name Is Required'),
            express_validator_1.body('contact_address', 'contact_address Is Required'),
            express_validator_1.body('contact_phone', 'contact_phone Is Required'),
            express_validator_1.body('status', 'status Is Required'),
            express_validator_1.body('product_data', 'product_data Is Required'),
        ];
    }
    static order() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Order_1.default.findOne({ _id: id, user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "products" }
                ])
                    .then((order) => {
                    if (order) {
                        req.order = order;
                        return true;
                    }
                    else {
                        throw new Error('Order Does Not Exist');
                    }
                });
            })];
    }
    static userOrder() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Order_1.default.find({ user: id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "products" }
                ])
                    .then((order) => {
                    if (order) {
                        req.order = order;
                        return true;
                    }
                    else {
                        throw new Error('No Order Found');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Order_1.default.findOne({ _id: id }, { __v: 0 }).then((order) => {
                    if (order) {
                        req.order = order;
                        return true;
                    }
                    else {
                        throw new Error('Order Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Order_1.default.findOne({ _id: id }, { __v: 0 }).then((order) => {
                    if (order) {
                        req.order = order;
                        return true;
                    }
                    else {
                        throw new Error('Order Does Not Exist');
                    }
                });
            })];
    }
}
exports.OrderValidators = OrderValidators;
