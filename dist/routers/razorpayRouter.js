"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RazorpayController_1 = require("../controllers/RazorpayController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const RazorpayValidators_1 = require("./validators/RazorpayValidators");
class RazorpayRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get('/order', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, RazorpayValidators_1.RazorpayValidators.order(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, RazorpayController_1.RazorpayController.order);
        this.router.get('/fetch/:paymentId', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, RazorpayValidators_1.RazorpayValidators.fetch(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, RazorpayController_1.RazorpayController.fetch);
    }
    postRoutes() {
        this.router.post('/capture/:paymentId', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, RazorpayValidators_1.RazorpayValidators.capture(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, RazorpayController_1.RazorpayController.capture);
    }
}
exports.default = new RazorpayRouter().router;
