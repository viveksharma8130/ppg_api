"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PujaVidhiController_1 = require("../controllers/PujaVidhiController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const PujaVidhiValidators_1 = require("./validators/PujaVidhiValidators");
class PujaVidhiRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, PujaVidhiValidators_1.PujaVidhiValidators.PujaVidhi(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaVidhiController_1.PujaVidhiController.PujaVidhi);
        this.router.get('/admin/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaVidhiValidators_1.PujaVidhiValidators.PujaVidhi(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaVidhiController_1.PujaVidhiController.PujaVidhi);
        // this.router.get('/subject/:id', PujaVidhiValidators.PujaVidhiSubject(), GlobalMiddleWare.checkError, PujaVidhiController.PujaVidhiSubject);
        // this.router.get('/course/:id', PujaVidhiValidators.PujaVidhiCourse(), GlobalMiddleWare.checkError, PujaVidhiController.PujaVidhiCourse);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, PujaVidhiController_1.PujaVidhiController.allPujaVidhi);
        this.router.get('/home/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, PujaVidhiController_1.PujaVidhiController.allHomePujaVidhi);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaVidhiController_1.PujaVidhiController.allAdminPujaVidhi);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('path'), PujaVidhiValidators_1.PujaVidhiValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaVidhiController_1.PujaVidhiController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), PujaVidhiController_1.PujaVidhiController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('path'), PujaVidhiValidators_1.PujaVidhiValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaVidhiController_1.PujaVidhiController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PujaVidhiValidators_1.PujaVidhiValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PujaVidhiController_1.PujaVidhiController.delete);
    }
}
exports.default = new PujaVidhiRouter().router;
