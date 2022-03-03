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
exports.WalletTransactionController = void 0;
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const WalletTransaction_1 = require("../models/WalletTransaction");
const Utils_1 = require("../utils/Utils");
class WalletTransactionController {
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
                let walletTransaction = yield new WalletTransaction_1.default(data).save();
                if (walletTransaction) {
                    const para = {
                        WalletTransaction_id: walletTransaction._id,
                        email: email
                    };
                    const token = Jwt.sign(para, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                    const data = {
                        message: 'Success',
                        token: token,
                        data: WalletTransaction_1.default
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
            const WalletTransaction = req.WalletTransaction;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptedPassword: WalletTransaction.password
                });
                const token = Jwt.sign({ email: WalletTransaction.email, WalletTransaction_id: WalletTransaction._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: '120d' });
                const data = { token: token, data: WalletTransaction };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const WalletTransactionId = req.WalletTransaction.WalletTransaction_id;
            let fileObject = {};
            if (req.files.profile_pic) {
                const profile_picUrl = req.files.profile_pic[0].path.replace(/\\/g, "/");
                fileObject.profile_pic = profile_picUrl;
            }
            var update = Object.assign(Object.assign({ name: req.body.name }, fileObject), { updated_at: new Date() });
            //res.send(req.body);
            try {
                const walletTransaction = yield WalletTransaction_1.default.findOneAndUpdate({ _id: WalletTransactionId }, update, { new: true, useFindAndModify: false });
                res.send(walletTransaction);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static data(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var WalletTransactionId = req.WalletTransaction.WalletTransaction_id;
            try {
                var walletTransaction = yield WalletTransaction_1.default.findById({ _id: WalletTransactionId }, { __v: 0 });
                const data = {
                    message: 'Success',
                    walletTransaction: walletTransaction
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
                const walletTransaction = yield WalletTransaction_1.default.find({});
                const data = {
                    message: 'Success !',
                    walletTransaction: walletTransaction
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.WalletTransactionController = WalletTransactionController;
