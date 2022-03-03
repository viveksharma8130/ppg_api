import { Router } from "express";
import { BannerController } from "../controllers/BannerController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { BannerValidators } from "./validators/BannerValidators";

class BannerRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', BannerValidators.banner(), GlobalMiddleWare.checkError, BannerController.banner);
        this.router.get('/all', BannerController.allBanner);
        this.router.get('/type/:type', BannerValidators.type(), GlobalMiddleWare.checkError, BannerController.allBannerType);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, BannerController.allAdminBanner);
    }
    postRoutes(){
         // DIGITALOCEAN SPACE
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), BannerValidators.create(), GlobalMiddleWare.checkError, BannerController.create);
                                                                                         // .array('file', 1)   
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), BannerController.excel);                                                                                    
        // FIREBASE 
        this.router.post('/upload', new Utils().firebaseMulter.single('file'), GlobalMiddleWare.checkError, BannerController.upload);
        this.router.post('/firebase/notification', BannerValidators.notification(), GlobalMiddleWare.checkError, BannerController.notification);

    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), GlobalMiddleWare.adminAuthenticate, BannerValidators.update(), GlobalMiddleWare.checkError, BannerController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, BannerValidators.delete(), GlobalMiddleWare.checkError,BannerController.delete)
    }
}

export default new BannerRouter().router;