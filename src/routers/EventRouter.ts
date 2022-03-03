import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { EventValidators } from "./validators/EventValidators";

class EventRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', EventValidators.Event(), GlobalMiddleWare.checkError, EventController.Event);
        this.router.get('/all', EventController.allEvent);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, EventController.allAdminEvent);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, EventValidators.create(), GlobalMiddleWare.checkError, EventController.create);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, EventValidators.update(), GlobalMiddleWare.checkError, EventController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, EventValidators.delete(), GlobalMiddleWare.checkError,EventController.delete)
    }
}

export default new EventRouter().router;