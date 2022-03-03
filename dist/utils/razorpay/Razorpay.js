"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorInstance = void 0;
const Razorpay = require("razorpay"); // const Razorpay = require('razorpay');
const RazorKeys_1 = require("./RazorKeys");
class RazorInstance {
    static razorInstance() {
        return new Razorpay({
            key_id: RazorKeys_1.RazorKeys.razorIdkey,
            key_secret: RazorKeys_1.RazorKeys.razorIdSecret
        });
    }
}
exports.RazorInstance = RazorInstance;
