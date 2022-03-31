import { Router } from "express";
import { PujaController } from "../controllers/PujaController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { PujaValidators } from "./validators/PujaValidators";

class PujaRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', GlobalMiddleWare.loginAuthenticate, PujaValidators.Puja(), GlobalMiddleWare.checkError, PujaController.Puja);
        this.router.get('/admin/id/:id', GlobalMiddleWare.adminAuthenticate, PujaValidators.Puja(), GlobalMiddleWare.checkError, PujaController.Puja);
        this.router.get('/all', GlobalMiddleWare.loginAuthenticate, PujaController.allPuja);
        this.router.get('/home/all', GlobalMiddleWare.loginAuthenticate, PujaController.allHomePuja);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, PujaController.allAdminPuja);
        this.router.get('/order/all', GlobalMiddleWare.authenticate, PujaController.allOrder);
        this.router.get('/order/admin/all', GlobalMiddleWare.authenticate, PujaController.allAdminOrder);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), PujaValidators.create(), GlobalMiddleWare.checkError, PujaController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), PujaController.excel);

        this.router.post('/order/create', GlobalMiddleWare.adminAuthenticate, PujaValidators.orderCreate(), GlobalMiddleWare.checkError, PujaController.orderCreate);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), PujaValidators.update(), GlobalMiddleWare.checkError, PujaController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, PujaValidators.delete(), GlobalMiddleWare.checkError,PujaController.delete)
    }
}

export default new PujaRouter().router;