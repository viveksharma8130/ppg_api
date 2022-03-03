import { Router } from "express";
import { RazorpayController } from "../controllers/RazorpayController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { RazorpayValidators } from "./validators/RazorpayValidators";

class RazorpayRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
    } 

    getRoutes(){
        this.router.get('/order', GlobalMiddleWare.authenticate, RazorpayValidators.order(), GlobalMiddleWare.checkError, RazorpayController.order);
        this.router.get('/fetch/:paymentId', GlobalMiddleWare.authenticate, RazorpayValidators.fetch(), GlobalMiddleWare.checkError, RazorpayController.fetch);
    }
    postRoutes(){
        this.router.post('/capture/:paymentId', GlobalMiddleWare.authenticate, RazorpayValidators.capture(), GlobalMiddleWare.checkError, RazorpayController.capture);
    }
}

export default new RazorpayRouter().router;
