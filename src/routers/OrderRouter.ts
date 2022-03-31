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
        this.router.get('/transaction/all', GlobalMiddleWare.authenticate, OrderController.allTransaction);
        this.router.get('/user/:id', GlobalMiddleWare.adminAuthenticate, OrderValidators.userOrder(), GlobalMiddleWare.checkError, OrderController.userOrder);
        this.router.get('/item/:item', GlobalMiddleWare.authenticate, OrderValidators.item(), GlobalMiddleWare.checkError, OrderController.item);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, OrderController.allAdminOrder);
        this.router.get('/id/:id', GlobalMiddleWare.authenticate, OrderValidators.order(), GlobalMiddleWare.checkError, OrderController.order);
        this.router.get('/order_status', GlobalMiddleWare.authenticate, OrderValidators.orderStatus(), GlobalMiddleWare.checkError, OrderController.orderStatus);
        this.router.get('/order_status2', GlobalMiddleWare.authenticate, OrderValidators.orderSt(), GlobalMiddleWare.checkError, OrderController.orderSt);
        
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.authenticate, OrderValidators.create(), GlobalMiddleWare.checkError, OrderController.create);
        this.router.post('/puja/create', GlobalMiddleWare.authenticate, OrderValidators.pujaCreate(), GlobalMiddleWare.checkError, OrderController.pujaCreate);
        this.router.post('/product/create', GlobalMiddleWare.authenticate, OrderValidators.productCreate(), GlobalMiddleWare.checkError, OrderController.productCreate);
        this.router.post('/deposit', GlobalMiddleWare.authenticate, OrderValidators.deposit(), GlobalMiddleWare.checkError, OrderController.deposit);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, OrderValidators.update(), GlobalMiddleWare.checkError, OrderController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, OrderValidators.delete(), GlobalMiddleWare.checkError,OrderController.delete)
    }
}

export default new OrderRouter().router;