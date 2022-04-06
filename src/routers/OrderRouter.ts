import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { OrderValidators } from "./validators/OrderValidators";

class OrderRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/all', GlobalMiddleWare.authenticate, OrderController.allOrder);
        this.router.get('/user/:id', GlobalMiddleWare.adminAuthenticate, OrderValidators.userOrder(), GlobalMiddleWare.checkError, OrderController.userOrder);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, OrderController.allAdminOrder);
        this.router.get('/id/:id', GlobalMiddleWare.authenticate, OrderValidators.order(), GlobalMiddleWare.checkError, OrderController.order);  
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.authenticate, OrderValidators.create(), GlobalMiddleWare.checkError, OrderController.productCreate);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, OrderValidators.update(), GlobalMiddleWare.checkError, OrderController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, OrderValidators.delete(), GlobalMiddleWare.checkError,OrderController.delete)
    }
}

export default new OrderRouter().router;