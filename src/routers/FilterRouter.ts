import { Router } from "express";
import { FilterController } from "../controllers/FilterController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { FilterValidators } from "./validators/FilterValidators";

class FilterRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', FilterValidators.filter(), GlobalMiddleWare.checkError, FilterController.filter);
        this.router.get('/all', FilterController.allFilter);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, FilterController.allAdminFilter);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, FilterValidators.create(), GlobalMiddleWare.checkError, FilterController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), FilterController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, FilterValidators.update(), GlobalMiddleWare.checkError, FilterController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, FilterValidators.delete(), GlobalMiddleWare.checkError,FilterController.delete)
    }
}

export default new FilterRouter().router;