"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayValidators = void 0;
const express_validator_1 = require("express-validator");
class RazorpayValidators {
    static order() {
        return [
            (0, express_validator_1.query)('amount', 'amount is Required').isString(),
            (0, express_validator_1.query)('currency', 'currency is Required').isString(),
            (0, express_validator_1.query)('receipt', 'receipt is Required').isString(),
            (0, express_validator_1.query)('payment_capture', 'payment_capture is Required').isString(),
        ];
    }
    static capture() {
        return [
            (0, express_validator_1.body)('amount', 'amount is Required').isNumeric,
            (0, express_validator_1.body)('currency', 'currency is Required').isString(),
            (0, express_validator_1.param)('paymentId', 'paymentId is Required').custom((paymentId, { req }) => {
                req.paymentId = paymentId;
                return true;
            }),
        ];
    }
    static fetch() {
        return [
            (0, express_validator_1.param)('paymentId', 'paymentId is Required').custom((paymentId, { req }) => {
                req.paymentId = paymentId;
                return true;
            }),
        ];
    }
}
exports.RazorpayValidators = RazorpayValidators;
