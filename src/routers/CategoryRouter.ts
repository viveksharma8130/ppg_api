import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { CategoryValidators } from "./validators/CategoryValidators";

class CategoryRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', CategoryValidators.category(), GlobalMiddleWare.checkError, CategoryController.category);
        this.router.get('/all', CategoryController.allCategory);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, CategoryController.allAdminCategory);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, CategoryValidators.create(), GlobalMiddleWare.checkError, CategoryController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), CategoryController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, CategoryValidators.update(), GlobalMiddleWare.checkError, CategoryController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, CategoryValidators.delete(), GlobalMiddleWare.checkError,CategoryController.delete)
    }
}

export default new CategoryRouter().router;