"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BannerController_1 = require("../controllers/BannerController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const BannerValidators_1 = require("./validators/BannerValidators");
class BannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', BannerValidators_1.BannerValidators.banner(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.banner);
        this.router.get('/all', BannerController_1.BannerController.allBanner);
        this.router.get('/type/:type', BannerValidators_1.BannerValidators.type(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.allBannerType);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BannerController_1.BannerController.allAdminBanner);
    }
    postRoutes() {
        // DIGITALOCEAN SPACE
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), BannerValidators_1.BannerValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.create);
        // .array('file', 1)   
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), BannerController_1.BannerController.excel);
        // FIREBASE 
        this.router.post('/upload', new Utils_1.Utils().firebaseMulter.single('file'), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.upload);
        this.router.post('/firebase/notification', BannerValidators_1.BannerValidators.notification(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.notification);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BannerValidators_1.BannerValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, BannerValidators_1.BannerValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, BannerController_1.BannerController.delete);
    }
}
exports.default = new BannerRouter().router;
