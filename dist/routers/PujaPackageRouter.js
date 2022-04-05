"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PujaPackageController_1 = require("../controllers/PujaPackageController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const PujaPackageValidators_1 = require("./validators/PujaPackageValidators");
class PujaPackageRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', PujaPackageValidators_1.PujaPackageValidators.PujaPackage(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaPackageController_1.PujaPackageController.PujaPackage);
        this.router.get('/puja/:puja_id', PujaPackageValidators_1.PujaPackageValidators.itemPujaPackage(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaPackageController_1.PujaPackageController.PujaPackage);
        this.router.get('/all', PujaPackageController_1.PujaPackageController.allPujaPackage);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaPackageController_1.PujaPackageController.allAdminPujaPackage);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaPackageValidators_1.PujaPackageValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaPackageController_1.PujaPackageController.create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaPackageValidators_1.PujaPackageValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaPackageController_1.PujaPackageController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaPackageValidators_1.PujaPackageValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaPackageController_1.PujaPackageController.delete);
    }
}
exports.default = new PujaPackageRouter().router;
