"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PujaController_1 = require("../controllers/PujaController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const PujaValidators_1 = require("./validators/PujaValidators");
class PujaRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, PujaValidators_1.PujaValidators.Puja(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaController_1.PujaController.Puja);
        this.router.get('/admin/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaValidators_1.PujaValidators.Puja(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaController_1.PujaController.Puja);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, PujaController_1.PujaController.allPuja);
        this.router.get('/home/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, PujaController_1.PujaController.allHomePuja);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaController_1.PujaController.allAdminPuja);
        this.router.get('/order/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PujaController_1.PujaController.allOrder);
        this.router.get('/order/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PujaController_1.PujaController.allAdminOrder);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), PujaValidators_1.PujaValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaController_1.PujaController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), PujaController_1.PujaController.excel);
        this.router.post('/order/create', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, PujaValidators_1.PujaValidators.orderCreate(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaController_1.PujaController.orderCreate);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), PujaValidators_1.PujaValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaController_1.PujaController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaValidators_1.PujaValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaController_1.PujaController.delete);
    }
}
exports.default = new PujaRouter().router;
