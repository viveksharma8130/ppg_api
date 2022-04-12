import { Router } from "express";
import { ProductVariantController } from "../controllers/ProductVariantController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { ProductVariantValidators } from "./validators/ProductVariantValidators";

class ProductVariantRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', ProductVariantValidators.ProductVariant(), GlobalMiddleWare.checkError, ProductVariantController.ProductVariant);
        this.router.get('/product/:product_id', ProductVariantValidators.itemProductVariant(), GlobalMiddleWare.checkError, ProductVariantController.ProductVariant); 
        this.router.get('/all', ProductVariantController.allProductVariant);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, ProductVariantController.allAdminProductVariant);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), ProductVariantValidators.create(), GlobalMiddleWare.checkError, ProductVariantController.create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), ProductVariantValidators.update(), GlobalMiddleWare.checkError, ProductVariantController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, ProductVariantValidators.delete(), GlobalMiddleWare.checkError,ProductVariantController.delete)
    }
}

export default new ProductVariantRouter().router;