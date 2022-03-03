import { Router } from "express";
import { PujaVidhiController } from "../controllers/PujaVidhiController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { PujaVidhiValidators } from "./validators/PujaVidhiValidators";

class PujaVidhiRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', GlobalMiddleWare.loginAuthenticate, PujaVidhiValidators.PujaVidhi(), GlobalMiddleWare.checkError, PujaVidhiController.PujaVidhi);
        this.router.get('/admin/id/:id', GlobalMiddleWare.adminAuthenticate, PujaVidhiValidators.PujaVidhi(), GlobalMiddleWare.checkError, PujaVidhiController.PujaVidhi);
        // this.router.get('/subject/:id', PujaVidhiValidators.PujaVidhiSubject(), GlobalMiddleWare.checkError, PujaVidhiController.PujaVidhiSubject);
        // this.router.get('/course/:id', PujaVidhiValidators.PujaVidhiCourse(), GlobalMiddleWare.checkError, PujaVidhiController.PujaVidhiCourse);
        this.router.get('/all', GlobalMiddleWare.loginAuthenticate, PujaVidhiController.allPujaVidhi);
        this.router.get('/home/all', GlobalMiddleWare.loginAuthenticate, PujaVidhiController.allHomePujaVidhi);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, PujaVidhiController.allAdminPujaVidhi);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('path'), PujaVidhiValidators.create(), GlobalMiddleWare.checkError, PujaVidhiController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), PujaVidhiController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('path'), PujaVidhiValidators.update(), GlobalMiddleWare.checkError, PujaVidhiController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, PujaVidhiValidators.delete(), GlobalMiddleWare.checkError,PujaVidhiController.delete)
    }
}

export default new PujaVidhiRouter().router;