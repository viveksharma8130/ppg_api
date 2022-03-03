"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaperController_1 = require("../controllers/PaperController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const PaperValidators_1 = require("./validators/PaperValidators");
class PaperRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', PaperValidators_1.PaperValidators.paper(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PaperController_1.PaperController.paper);
        this.router.get('/all', PaperController_1.PaperController.allPaper);
        this.router.get('/paper_type/:paper_type', PaperValidators_1.PaperValidators.paperType(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PaperController_1.PaperController.paperType);
        this.router.get('/paper_wise/:paper_type', PaperValidators_1.PaperValidators.paperType(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PaperController_1.PaperController.paper_wise);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PaperController_1.PaperController.allAdminPaper);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PaperValidators_1.PaperValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PaperController_1.PaperController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), PaperController_1.PaperController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PaperValidators_1.PaperValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PaperController_1.PaperController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, PaperValidators_1.PaperValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, PaperController_1.PaperController.delete);
    }
}
exports.default = new PaperRouter().router;
