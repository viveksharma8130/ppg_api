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
exports.RazorpayController = void 0;
const request = require("request");
const RazorKeys_1 = require("../utils/razorpay/RazorKeys");
const Razorpay_1 = require("../utils/razorpay/Razorpay");
class RazorpayController {
    static order(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    amount: req.query.amount * 100,
                    currency: req.query.currency,
                    receipt: req.query.receipt,
                    payment_capture: req.query.payment_capture // 0, 1
                };
                Razorpay_1.RazorInstance.razorInstance().orders.create(options, function (err, order) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                message: "Something error!s",
                                error: err
                            });
                        }
                        return res.status(200).json(order);
                    });
                });
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Something error!s",
                    error: err
                });
            }
        });
    }
    static capture(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return request({
                    method: "POST",
                    url: `https://${RazorKeys_1.RazorKeys.razorIdkey}:${RazorKeys_1.RazorKeys.razorIdSecret}@api.razorpay.com/v1/payments/${req.paymentId}/capture`,
                    form: {
                        amount: req.body.amount * 100,
                        currency: req.body.currency, // INR          
                    },
                }, function (err, response, body) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return res.status(500).json({
                                message: "Something error!s",
                                error: err
                            });
                        }
                        return res.status(200).json(body);
                    });
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
        });
    }
    static fetch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return request({
                    method: "GET",
                    url: `https://${RazorKeys_1.RazorKeys.razorIdkey}:${RazorKeys_1.RazorKeys.razorIdSecret}@api.razorpay.com/v1/payments/${req.paymentId}`,
                }, function (err, response, body) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return res.status(500).json({
                                message: "Something error!s",
                                error: err
                            });
                        }
                        return res.status(200).json(body);
                    });
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
        });
    }
}
exports.RazorpayController = RazorpayController;
