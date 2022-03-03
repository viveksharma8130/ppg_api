"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventController_1 = require("../controllers/EventController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const EventValidators_1 = require("./validators/EventValidators");
class EventRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', EventValidators_1.EventValidators.Event(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.Event);
        this.router.get('/all', EventController_1.EventController.allEvent);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, EventController_1.EventController.allAdminEvent);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, EventValidators_1.EventValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.create);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, EventValidators_1.EventValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, EventValidators_1.EventValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, EventController_1.EventController.delete);
    }
}
exports.default = new EventRouter().router;
