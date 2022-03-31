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
const User_1 = require("../models/User");
const WalletTransaction_1 = require("../models/WalletTransaction");
class OrderController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // order create
                const data = Object.assign(Object.assign({}, req.body), { user: req.user.user_id });
                let order = yield new Order_1.default(data).save();
                // wallet transaction create for order
                const transaction_data = {
                    user: req.user.user_id,
                    channel: 'order',
                    transaction_mode: 'debit',
                    amount: req.body.amount,
                    transaction_id: req.body.payment_id,
                    item_object: req.body.item_data,
                    transaction_obj: req.body.payment_data
                };
                let walletTransaction = yield new WalletTransaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.user.user_id }, { $inc: { wallet: -req.body.amount } }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Order Save Successfully',
                    data: order,
                    walletTransaction: walletTransaction,
                    user_wallet: user_wallet,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static pujaCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // order create
                const data = Object.assign(Object.assign({}, req.body), { user: req.user.user_id });
                let order = yield new Order_1.default(data).save();
                // wallet transaction create for order
                const transaction_data = {
                    user: req.user.user_id,
                    channel: 'order',
                    transaction_mode: 'debit',
                    amount: req.body.amount,
                    transaction_id: req.body.payment_id,
                    item_object: req.body.item_data,
                    transaction_obj: req.body.payment_data
                };
                let walletTransaction = yield new WalletTransaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.user.user_id }, { $inc: { wallet: -req.body.amount } }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Order Save Successfully',
                    data: order,
                    walletTransaction: walletTransaction,
                    user_wallet: user_wallet,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static productCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // order create
                const data = Object.assign(Object.assign({}, req.body), { user: req.user.user_id });
                let order = yield new Order_1.default(data).save();
                // wallet transaction create for order
                const transaction_data = {
                    user: req.user.user_id,
                    channel: 'order',
                    transaction_mode: 'debit',
                    amount: req.body.amount,
                    transaction_id: req.body.payment_id,
                    item_object: req.body.item_data,
                    transaction_obj: req.body.payment_data
                };
                let walletTransaction = yield new WalletTransaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.user.user_id }, { $inc: { wallet: -req.body.amount } }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'Order Save Successfully',
                    data: order,
                    walletTransaction: walletTransaction,
                    user_wallet: user_wallet,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deposit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // wallet transaction create for deposit
                const transaction_data = {
                    user: req.user.user_id,
                    channel: 'deposit',
                    transaction_mode: 'credit',
                    amount: req.body.amount,
                    transaction_id: req.body.transaction_id,
                    //item_object:req.body.item_data,
                    transaction_obj: req.body.transaction_obj
                };
                let walletTransaction = yield new WalletTransaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.user.user_id }, { $inc: { wallet: req.body.amount } }, { new: true, useFindAndModify: false });
                res.json({
                    message: 'deposit add to wallet Successfully',
                    walletTransaction: walletTransaction,
                    user_wallet: user_wallet,
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
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
    static orderStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.order;
            const data = {
                message: 'Success',
                data: order
            };
            res.json(data);
        });
    }
    static orderSt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.parent_id) {
                try {
                    let order = yield Order_1.default.findOne({ item_id: req.query.item_id, user: req.user.user_id }, { __v: 0 });
                    res.json({
                        message: 'Success',
                        data: order,
                        status_code: 200
                    });
                }
                catch (e) {
                    next(e);
                }
            }
            else if (req.query.parent_id) {
                try {
                    let order = yield Order_1.default.find({
                        $or: [
                            { user: req.user.user_id, item_id: req.query.item_id, to_date: { $gte: new Date } },
                            { user: req.user.user_id, item_id: req.query.parent_id, to_date: { $gte: new Date } }
                        ]
                    })
                        .populate([
                        { path: 'user' },
                        { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
                    ]);
                    res.json({
                        message: 'Success',
                        data: order,
                        status_code: 200
                    });
                }
                catch (e) {
                    next(e);
                }
            }
        });
    }
    static allOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.default.find({ user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
    static allTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield WalletTransaction_1.default.find({ user: req.user.user_id }, { __v: 0 })
                    .sort({ '_id': -1 });
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
    static item(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield Order_1.default.find({ user: req.user.user_id, item: req.item }, { __v: 0 })
                    .sort({ '_id': -1 })
                    .populate([
                    { path: 'user' },
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
                    { path: "item_id", select: ['-__v', '-updated_at', '-created_at'] }
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
