import { Router } from "express";
import { PujaPackageController } from "../controllers/PujaPackageController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { PujaPackageValidators } from "./validators/PujaPackageValidators";

class PujaPackageRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', PujaPackageValidators.PujaPackage(), GlobalMiddleWare.checkError, PujaPackageController.PujaPackage);
        this.router.get('/puja/:puja_id', PujaPackageValidators.itemPujaPackage(), GlobalMiddleWare.checkError, PujaPackageController.PujaPackage); 
        this.router.get('/all', PujaPackageController.allPujaPackage);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, PujaPackageController.allAdminPujaPackage);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, PujaPackageValidators.create(), GlobalMiddleWare.checkError, PujaPackageController.create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, PujaPackageValidators.update(), GlobalMiddleWare.checkError, PujaPackageController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, PujaPackageValidators.delete(), GlobalMiddleWare.checkError,PujaPackageController.delete)
    }
}

export default new PujaPackageRouter().router;