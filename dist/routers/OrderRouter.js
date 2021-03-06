"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const OrderValidators_1 = require("./validators/OrderValidators");
class OrderRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, OrderController_1.OrderController.allOrder);
        this.router.get('/user/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, OrderValidators_1.OrderValidators.userOrder(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, OrderController_1.OrderController.userOrder);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, OrderController_1.OrderController.allAdminOrder);
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, OrderValidators_1.OrderValidators.order(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, OrderController_1.OrderController.order);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, OrderValidators_1.OrderValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, OrderController_1.OrderController.productCreate);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, OrderValidators_1.OrderValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, OrderController_1.OrderController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, OrderValidators_1.OrderValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, OrderController_1.OrderController.delete);
    }
}
exports.default = new OrderRouter().router;
