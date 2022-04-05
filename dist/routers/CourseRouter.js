"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CourseController_1 = require("../controllers/CourseController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const CourseValidators_1 = require("./validators/CourseValidators");
class CourseRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, CourseValidators_1.CourseValidators.course(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CourseController_1.CourseController.course);
        this.router.get('/admin/id/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CourseValidators_1.CourseValidators.course(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CourseController_1.CourseController.course);
        this.router.get('/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, CourseController_1.CourseController.allCourse);
        this.router.get('/home/all', GlobalMiddleWare_1.GlobalMiddleWare.loginAuthenticate, CourseController_1.CourseController.allHomeCourse);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CourseController_1.CourseController.allAdminCourse);
    }
    postRoutes() {
        this.router.post('/create', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), CourseValidators_1.CourseValidators.create(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CourseController_1.CourseController.create);
        this.router.post('/excel', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().excelMulter.single('excel'), CourseController_1.CourseController.excel);
    }
    patchRoutes() {
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, new Utils_1.Utils().s3Multer.single('image'), CourseValidators_1.CourseValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CourseController_1.CourseController.update);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, CourseValidators_1.CourseValidators.delete(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CourseController_1.CourseController.delete);
    }
}
exports.default = new CourseRouter().router;
