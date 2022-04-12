"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductVariantController_1 = require("../controllers/ProductVariantController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const ProductVariantValidators_1 = require("./validators/ProductVariantValidators");
class ProductVariantRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', ProductVariantValidators_1.ProductVariantValidators.ProductVariant(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductVariantController_1.ProductVariantController.ProductVariant);
        this.router.get('/product/:product_id', ProductVariantValidators_1.ProductVariantValidators.itemProductVariant(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductVariantController_1.ProductVariantController.ProductVariant);
        this.router.get('/all', ProductVariantController_1.ProductVariantController.allProductVariant);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductVariantController_1.ProductVariantController.allAdminProductVariant);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), ProductVariantValidators_1.ProductVariantValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductVariantController_1.ProductVariantController.create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), ProductVariantValidators_1.ProductVariantValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductVariantController_1.ProductVariantController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductVariantValidators_1.ProductVariantValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductVariantController_1.ProductVariantController.delete);
    }
}
exports.default = new ProductVariantRouter().router;
