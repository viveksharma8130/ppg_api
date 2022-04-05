"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidators = void 0;
const express_validator_1 = require("express-validator");
const Order_1 = require("../../models/Order");
class OrderValidators {
    static create() {
        return [
            express_validator_1.body('item', 'item Is Required'),
            express_validator_1.body('item_id', 'item_id Is Required'),
            express_validator_1.body('amount', 'amount Is Required'),
            express_validator_1.body('from_date', 'from_date Is Required'),
            express_validator_1.body('to_date', 'to_date Is Required'),
            express_validator_1.body('payment_id', 'payment_id Is Required'),
            express_validator_1.body('payment_data', 'payment_data Is Required'),
            express_validator_1.body('item_data', 'item_data Is Required'),
            express_validator_1.body('status', 'status Is Required'),
        ];
    }
    static pujaCreate() {
        return [
            express_validator_1.body('item', 'item Is Required'),
            express_validator_1.body('item_id', 'item_id Is Required'),
            express_validator_1.body('amount', 'amount Is Required'),
            express_validator_1.body('puja_date', 'puja_date Is Required'),
            express_validator_1.body('samagri_status', 'samagri_status Is Required'),
            express_validator_1.body('payment_id', 'payment_id Is Required'),
            express_validator_1.body('payment_data', 'payment_data Is Required'),
            express_validator_1.body('item_data', 'item_data Is Required'),
            express_validator_1.body('name', 'name Is Required'),
            express_validator_1.body('address', 'address Is Required'),
            express_validator_1.body('phone', 'phone Is Required'),
            express_validator_1.body('status', 'status Is Required'),
        ];
    }
    static productCreate() {
        return [
            express_validator_1.body('item', 'item Is Required'),
            express_validator_1.body('item_id', 'item_id Is Required'),
            express_validator_1.body('amount', 'amount Is Required'),
            express_validator_1.body('payment_id', 'payment_id Is Required'),
            express_validator_1.body('payment_data', 'payment_data Is Required'),
            express_validator_1.body('item_data', 'item_data Is Required'),
            express_validator_1.body('name', 'name Is Required'),
            express_validator_1.body('address', 'address Is Required'),
            express_validator_1.body('phone', 'phone Is Required'),
            express_validator_1.body('status', 'status Is Required'),
        ];
    }
    static deposit() {
        return [
            express_validator_1.body('amount', 'amount Is Required'),
            express_validator_1.body('transaction_id', 'transaction_id Is Required'),
            express_validator_1.body('transaction_obj', 'transaction_obj Is Required'),
        ];
    }
    static order() {
        return [express_validator_1.param('id').custom((id, { req }) => {
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
        return [express_validator_1.param('id').custom((id, { req }) => {
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
        return [express_validator_1.param('item').custom((item, { req }) => {
                req.item = item;
                return true;
            })];
    }
    static orderStatus() {
        return [
            express_validator_1.query('item_id').custom((item_id, { req }) => {
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
            express_validator_1.body('query', 'item_id Is Required'),
        ];
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
