import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { ArticleValidators } from "./validators/ArticleValidators";

class ArticleRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', ArticleValidators.Article(), GlobalMiddleWare.checkError, ArticleController.Article);
        this.router.get('/all', ArticleController.allArticle);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, ArticleController.allAdminArticle);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), ArticleValidators.create(), GlobalMiddleWare.checkError, ArticleController.create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, ArticleValidators.update(), GlobalMiddleWare.checkError, ArticleController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, ArticleValidators.delete(), GlobalMiddleWare.checkError,ArticleController.delete)
    }
}

export default new ArticleRouter().router;