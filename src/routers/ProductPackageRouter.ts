import { Router } from "express";
import { PackageController } from "../controllers/PackageController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { PackageValidators } from "./validators/PackageValidators";

class PackageRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', PackageValidators.Package(), GlobalMiddleWare.checkError, PackageController.Package);
        this.router.get('/item/:item_id', PackageValidators.itemPackage(), GlobalMiddleWare.checkError, PackageController.Package); 
        this.router.get('/all', PackageController.allPackage);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, PackageController.allAdminPackage);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, PackageValidators.create(), GlobalMiddleWare.checkError, PackageController.create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, PackageValidators.update(), GlobalMiddleWare.checkError, PackageController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, PackageValidators.delete(), GlobalMiddleWare.checkError,PackageController.delete)
    }
}

export default new PackageRouter().router;