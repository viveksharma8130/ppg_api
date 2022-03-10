"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FilterController_1 = require("../controllers/FilterController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const FilterValidators_1 = require("./validators/FilterValidators");
class FilterRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', FilterValidators_1.FilterValidators.filter(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, FilterController_1.FilterController.filter);
        this.router.get('/all', FilterController_1.FilterController.allFilter);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, FilterController_1.FilterController.allAdminFilter);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, FilterValidators_1.FilterValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, FilterController_1.FilterController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), FilterController_1.FilterController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, FilterValidators_1.FilterValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, FilterController_1.FilterController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, FilterValidators_1.FilterValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, FilterController_1.FilterController.delete);
    }
}
exports.default = new FilterRouter().router;
