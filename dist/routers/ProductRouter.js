"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const ProductValidators_1 = require("./validators/ProductValidators");
class ProductRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, ProductValidators_1.ProductValidators.product(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.product);
        this.router.get('/admin/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductValidators_1.ProductValidators.product(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.product);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, ProductController_1.ProductController.allProduct);
        this.router.get('/home/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, ProductController_1.ProductController.allHomeProduct);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductController_1.ProductController.allAdminProduct);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), ProductValidators_1.ProductValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), ProductController_1.ProductController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), ProductValidators_1.ProductValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ProductValidators_1.ProductValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ProductController_1.ProductController.delete);
    }
}
exports.default = new ProductRouter().router;
