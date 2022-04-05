"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../controllers/CategoryController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const CategoryValidators_1 = require("./validators/CategoryValidators");
class CategoryRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', CategoryValidators_1.CategoryValidators.category(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CategoryController_1.CategoryController.category);
        this.router.get('/all', CategoryController_1.CategoryController.allCategory);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CategoryController_1.CategoryController.allAdminCategory);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CategoryValidators_1.CategoryValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CategoryController_1.CategoryController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), CategoryController_1.CategoryController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CategoryValidators_1.CategoryValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CategoryController_1.CategoryController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CategoryValidators_1.CategoryValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CategoryController_1.CategoryController.delete);
    }
}
exports.default = new CategoryRouter().router;
