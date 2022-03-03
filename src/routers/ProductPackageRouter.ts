import { Router } from "express";
import { ProductPackageController } from "../controllers/ProductPackageController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { ProductPackageValidators } from "./validators/ProductPackageValidators";

class ProductPackageRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', ProductPackageValidators.ProductPackage(), GlobalMiddleWare.checkError, ProductPackageController.ProductPackage);
        this.router.get('/item/:item_id', ProductPackageValidators.itemProductPackage(), GlobalMiddleWare.checkError, ProductPackageController.ProductPackage); 
        this.router.get('/all', ProductPackageController.allProductPackage);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, ProductPackageController.allAdminProductPackage);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, ProductPackageValidators.create(), GlobalMiddleWare.checkError, ProductPackageController.create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, ProductPackageValidators.update(), GlobalMiddleWare.checkError, ProductPackageController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, ProductPackageValidators.delete(), GlobalMiddleWare.checkError,ProductPackageController.delete)
    }
}

export default new ProductPackageRouter().router;