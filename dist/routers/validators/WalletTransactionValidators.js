"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionValidators = void 0;
const express_validator_1 = require("express-validator");
const WalletTransaction_1 = require("../../models/WalletTransaction");
class WalletTransactionValidators {
    static signup() {
        return [
            express_validator_1.body('name', 'name is Required').isString(),
            express_validator_1.body('password', 'password is Required').isString(),
            express_validator_1.body('email', 'email Is Required').isEmail().custom((email, { req }) => {
                return WalletTransaction_1.default.findOne({ email: email }).then(WalletTransaction => {
                    if (WalletTransaction) {
                        throw new Error('WalletTransaction Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digit').custom((phone, { req }) => {
                return WalletTransaction_1.default.findOne({ phone: phone }).then(WalletTransaction => {
                    if (WalletTransaction) {
                        throw new Error('WalletTransaction Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static login() {
        return [express_validator_1.query('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return WalletTransaction_1.default.findOne({ email: email }).then(WalletTransaction => {
                    if (WalletTransaction) {
                        req.WalletTransaction = WalletTransaction;
                        return true;
                    }
                    else {
                        throw new Error('WalletTransaction Does Not Exist');
                    }
                });
            }), express_validator_1.query('password', 'Password is Required').isAlphanumeric()];
    }
}
exports.WalletTransactionValidators = WalletTransactionValidators;
