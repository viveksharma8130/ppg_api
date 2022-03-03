import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { AdminValidators } from "./validators/AdminValidators";

class AdminRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
 
    } 

    getRoutes(){
        this.router.get('/data', GlobalMiddleWare.adminAuthenticate, AdminController.data);
        this.router.get('/all', GlobalMiddleWare.adminAuthenticate, AdminController.all);
        this.router.get('/transaction/all', GlobalMiddleWare.adminAuthenticate, AdminController.allTransaction);
        this.router.get('/transaction/user/:id', GlobalMiddleWare.adminAuthenticate, AdminValidators.allUserTransaction(), GlobalMiddleWare.checkError, AdminController.allUserTransaction);
        this.router.get('/login', AdminValidators.login(), GlobalMiddleWare.checkError, AdminController.login);
    }
    postRoutes(){
        this.router.post('/signup', AdminValidators.signup(), GlobalMiddleWare.checkError, AdminController.signup);
        this.router.post('/deposit', GlobalMiddleWare.adminAuthenticate, AdminValidators.deposit(), GlobalMiddleWare.checkError, AdminController.deposit);
        this.router.post('/order/create', GlobalMiddleWare.adminAuthenticate, AdminValidators.orderCreate(), GlobalMiddleWare.checkError, AdminController.orderCreate);
    }
    patchRoutes(){
        this.router.patch('/update', GlobalMiddleWare.adminAuthenticate, AdminController.update);
    }
    deleteRoutes(){
    }
}

export default new AdminRouter().router;