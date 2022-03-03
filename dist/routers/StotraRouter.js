"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StotraController_1 = require("../controllers/StotraController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const StotraValidators_1 = require("./validators/StotraValidators");
class StotraRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, StotraValidators_1.StotraValidators.Stotra(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.Stotra);
        this.router.get('/admin/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, StotraValidators_1.StotraValidators.Stotra(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.Stotra);
        this.router.get('/subject/:id', StotraValidators_1.StotraValidators.StotraSubject(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.StotraSubject);
        this.router.get('/course/:id', StotraValidators_1.StotraValidators.StotraCourse(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.StotraCourse);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, StotraController_1.StotraController.allStotra);
        this.router.get('/home/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, StotraController_1.StotraController.allHomeStotra);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, StotraController_1.StotraController.allAdminStotra);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), StotraValidators_1.StotraValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), StotraController_1.StotraController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), StotraValidators_1.StotraValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, StotraValidators_1.StotraValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, StotraController_1.StotraController.delete);
    }
}
exports.default = new StotraRouter().router;
