"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticleController_1 = require("../controllers/ArticleController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const ArticleValidators_1 = require("./validators/ArticleValidators");
class ArticleRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', ArticleValidators_1.ArticleValidators.Article(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ArticleController_1.ArticleController.Article);
        this.router.get('/all', ArticleController_1.ArticleController.allArticle);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ArticleController_1.ArticleController.allAdminArticle);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), ArticleValidators_1.ArticleValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ArticleController_1.ArticleController.create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), ArticleValidators_1.ArticleValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ArticleController_1.ArticleController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, ArticleValidators_1.ArticleValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ArticleController_1.ArticleController.delete);
    }
}
exports.default = new ArticleRouter().router;
