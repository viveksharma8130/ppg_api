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
exports.AdminController = void 0;
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const Admin_1 = require("../models/Admin");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
const WalletTransaction_1 = require("../models/WalletTransaction");
const Utils_1 = require("../utils/Utils");
class AdminController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const phone = req.body.phone;
            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;
            const hash = yield Utils_1.Utils.encryptPassword(password);
            try {
                const data = {
                    email: email,
                    password: hash,
                    name: name,
                    phone: phone,
                    created_at: new Utils_1.Utils().indianTimeZone,
                    updated_at: new Utils_1.Utils().indianTimeZone
                };
                let admin = yield new Admin_1.default(data).save();
                if (admin) {
                    const para = {
                        admin_id: admin._id,
                        email: email
                    };
                    const token = Jwt.sign(para, env_1.getEnvironmentVariables().jwt_secret, { expiresIn: '120d' });
                    const data = {
                        message: 'Success',
                        token: token,
                        data: admin
                    };
                    res.json(data);
                }
                else {
                    throw new Error('Something Went Wrong');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.query.password;
            const admin = req.admin;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptedPassword: admin.password
                });
                const token = Jwt.sign({ email: admin.email, admin_id: admin._id }, env_1.getEnvironmentVariables().jwt_secret, { expiresIn: '120d' });
                const data = { token: token, data: admin };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = req.admin.admin_id;
            let fileObject = {};
            if (req.files && req.files.profile_pic) {
                const profile_picUrl = req.files.profile_pic[0].path.replace(/\\/g, "/");
                fileObject.profile_pic = profile_picUrl;
            }
            var update = Object.assign(Object.assign({ name: req.body.name }, fileObject), { updated_at: new Date() });
            //res.send(req.body);
            try {
                const admin = yield Admin_1.default.findOneAndUpdate({ _id: adminId }, update, { new: true, useFindAndModify: false });
                res.send(admin);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static data(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var adminId = req.admin.admin_id;
            try {
                var admin = yield Admin_1.default.findById({ _id: adminId }, { __v: 0 });
                const data = {
                    message: 'Success',
                    admin: admin
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static all(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin_1.default.find({});
                const data = {
                    message: 'Success !',
                    Admin: admin
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
                const order = yield WalletTransaction_1.default.find().sort({ '_id': -1 });
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
    static allUserTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield WalletTransaction_1.default.find({ user: req.user._id }).sort({ '_id': -1 });
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
    static deposit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // wallet transaction create for deposit
                const transaction_data = {
                    user: req.body.user,
                    channel: 'reward',
                    transaction_mode: 'credit',
                    amount: req.body.amount,
                    transaction_id: req.body.transaction_id,
                    //item_object:req.body.item_data,
                    transaction_obj: req.body.transaction_obj
                };
                let walletTransaction = yield new WalletTransaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.body.user }, { $inc: { wallet: req.body.amount } }, { new: true, useFindAndModify: false });
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
    static orderCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // order create
                const data = Object.assign({}, req.body);
                let order = yield new Order_1.default(data).save();
                // wallet transaction create for order
                const transaction_data = {
                    user: req.body.user,
                    channel: 'order',
                    transaction_mode: 'debit',
                    amount: req.body.amount,
                    transaction_id: req.body.payment_id,
                    item_object: req.body.item_data,
                    transaction_obj: req.body.payment_data
                };
                let walletTransaction = yield new WalletTransaction_1.default(transaction_data).save();
                // user wallet update
                const user_wallet = yield User_1.default.findOneAndUpdate({ _id: req.body.user }, { $inc: { wallet: -req.body.amount } }, { new: true, useFindAndModify: false });
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
}
exports.AdminController = AdminController;
