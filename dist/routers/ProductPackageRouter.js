"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductPackageController_1 = require("../controllers/ProductPackageController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const ProductPackageValidators_1 = require("./validators/ProductPackageValidators");
class ProductPackageRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', ProductPackageValidators_1.ProductPackageValidators.ProductPackage(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductPackageController_1.ProductPackageController.ProductPackage);
        this.router.get('/item/:item_id', ProductPackageValidators_1.ProductPackageValidators.itemProductPackage(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductPackageController_1.ProductPackageController.ProductPackage);
        this.router.get('/all', ProductPackageController_1.ProductPackageController.allProductPackage);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductPackageController_1.ProductPackageController.allAdminProductPackage);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductPackageValidators_1.ProductPackageValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductPackageController_1.ProductPackageController.create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductPackageValidators_1.ProductPackageValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductPackageController_1.ProductPackageController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductPackageValidators_1.ProductPackageValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductPackageController_1.ProductPackageController.delete);
    }
}
exports.default = new ProductPackageRouter().router;
