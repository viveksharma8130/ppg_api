"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidators = void 0;
const express_validator_1 = require("express-validator");
const Order_1 = require("../../models/Order");
class OrderValidators {
    static create() {
        return [
            (0, express_validator_1.body)('item', 'item Is Required'),
            (0, express_validator_1.body)('item_id', 'item_id Is Required'),
            (0, express_validator_1.body)('amount', 'amount Is Required'),
            (0, express_validator_1.body)('from_date', 'from_date Is Required'),
            (0, express_validator_1.body)('to_date', 'to_date Is Required'),
            (0, express_validator_1.body)('payment_id', 'payment_id Is Required'),
            (0, express_validator_1.body)('payment_data', 'payment_data Is Required'),
            (0, express_validator_1.body)('item_data', 'item_data Is Required'),
            (0, express_validator_1.body)('status', 'status Is Required'),
        ];
    }
    static deposit() {
        return [
            (0, express_validator_1.body)('amount', 'amount Is Required'),
            (0, express_validator_1.body)('transaction_id', 'transaction_id Is Required'),
            (0, express_validator_1.body)('transaction_obj', 'transaction_obj Is Required'),
        ];
    }
    static order() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Order_1.default.findOne({ _id: id, user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Order_1.default.find({ user: id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
    static item() {
        return [(0, express_validator_1.param)('item').custom((item, { req }) => {
                req.item = item;
                return true;
            })];
    }
    static orderStatus() {
        return [
            (0, express_validator_1.query)('item_id').custom((item_id, { req }) => {
                return Order_1.default.findOne({ item_id: item_id, user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
            })
        ];
    }
    static orderSt() {
        return [
            (0, express_validator_1.body)('query', 'item_id Is Required'),
        ];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
