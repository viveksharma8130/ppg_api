"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidators = void 0;
const express_validator_1 = require("express-validator");
const Admin_1 = require("../../models/Admin");
const User_1 = require("../../models/User");
class AdminValidators {
    static signup() {
        return [
            express_validator_1.body('name', 'name is Required').isString(),
            express_validator_1.body('password', 'password is Required').isString(),
            express_validator_1.body('email', 'email Is Required').isEmail().custom((email, { req }) => {
                return Admin_1.default.findOne({ email: email }).then(admin => {
                    if (admin) {
                        throw new Error('Admin Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digit').custom((phone, { req }) => {
                return Admin_1.default.findOne({ phone: phone }).then(admin => {
                    if (admin) {
                        throw new Error('Admin Already Exist');
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
                return Admin_1.default.findOne({ email: email }).then(admin => {
                    if (admin) {
                        req.admin = admin;
                        return true;
                    }
                    else {
                        throw new Error('Admin Does Not Exist');
                    }
                });
            }), express_validator_1.query('password', 'Password is Required').isAlphanumeric()];
    }
    static allUserTransaction() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return User_1.default.findOne({ _id: id }, { __v: 0 }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('No user Found');
                    }
                });
            })];
    }
    static deposit() {
        return [
            express_validator_1.body('amount', 'amount Is Required'),
            express_validator_1.body('transaction_id', 'transaction_id Is Required'),
            express_validator_1.body('transaction_obj', 'transaction_obj Is Required'),
            express_validator_1.body('user', 'user Is Required').custom((user, { req }) => {
                return User_1.default.findOne({ _id: user }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('user not Exist');
                    }
                });
            })
        ];
    }
    static orderCreate() {
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
            express_validator_1.body('user', 'user Is Required').custom((user, { req }) => {
                return User_1.default.findOne({ _id: user }).then(user => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('user not Exist');
                    }
                });
            })
        ];
    }
}
exports.AdminValidators = AdminValidators;
