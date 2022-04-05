"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletTransactionController_1 = require("../controllers/WalletTransactionController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const WalletTransactionValidators_1 = require("./validators/WalletTransactionValidators");
class WalletTransactionRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/data', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, WalletTransactionController_1.WalletTransactionController.data);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, WalletTransactionController_1.WalletTransactionController.all);
        this.router.get('/login', WalletTransactionValidators_1.WalletTransactionValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, WalletTransactionController_1.WalletTransactionController.login);
    }
    postRoutes() {
        this.router.post('/signup', WalletTransactionValidators_1.WalletTransactionValidators.signup(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, WalletTransactionController_1.WalletTransactionController.signup);
    }
    patchRoutes() {
        this.router.patch('/update', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, WalletTransactionController_1.WalletTransactionController.update);
    }
    deleteRoutes() {
    }
}
exports.default = new WalletTransactionRouter().router;
