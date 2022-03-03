import { Router } from "express";
import { StotraController } from "../controllers/StotraController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { StotraValidators } from "./validators/StotraValidators";

class StotraRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', GlobalMiddleWare.loginAuthenticate, StotraValidators.Stotra(), GlobalMiddleWare.checkError, StotraController.Stotra);
        this.router.get('/admin/id/:id', GlobalMiddleWare.adminAuthenticate, StotraValidators.Stotra(), GlobalMiddleWare.checkError, StotraController.Stotra);
        this.router.get('/subject/:id', StotraValidators.StotraSubject(), GlobalMiddleWare.checkError, StotraController.StotraSubject);
        this.router.get('/course/:id', StotraValidators.StotraCourse(), GlobalMiddleWare.checkError, StotraController.StotraCourse);
        this.router.get('/all', GlobalMiddleWare.loginAuthenticate, StotraController.allStotra);
        this.router.get('/home/all', GlobalMiddleWare.loginAuthenticate, StotraController.allHomeStotra);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, StotraController.allAdminStotra);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), StotraValidators.create(), GlobalMiddleWare.checkError, StotraController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), StotraController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), StotraValidators.update(), GlobalMiddleWare.checkError, StotraController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, StotraValidators.delete(), GlobalMiddleWare.checkError,StotraController.delete)
    }
}

export default new StotraRouter().router;