import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { ProductValidators } from "./validators/ProductValidators";

class ProductRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', GlobalMiddleWare.loginAuthenticate, ProductValidators.product(), GlobalMiddleWare.checkError, ProductController.product);
        this.router.get('/admin/id/:id', GlobalMiddleWare.adminAuthenticate, ProductValidators.product(), GlobalMiddleWare.checkError, ProductController.product);
        this.router.get('/all', GlobalMiddleWare.loginAuthenticate, ProductController.allProduct);
        this.router.get('/home/all', GlobalMiddleWare.loginAuthenticate, ProductController.allHomeProduct);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, ProductController.allAdminProduct);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), ProductValidators.create(), GlobalMiddleWare.checkError, ProductController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), ProductController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), ProductValidators.update(), GlobalMiddleWare.checkError, ProductController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, ProductValidators.delete(), GlobalMiddleWare.checkError,ProductController.delete)
    }
}

export default new ProductRouter().router;