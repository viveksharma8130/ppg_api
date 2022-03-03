import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { CourseValidators } from "./validators/CourseValidators";

class CourseRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', GlobalMiddleWare.loginAuthenticate, CourseValidators.course(), GlobalMiddleWare.checkError, CourseController.course);
        this.router.get('/admin/id/:id', GlobalMiddleWare.adminAuthenticate, CourseValidators.course(), GlobalMiddleWare.checkError, CourseController.course);
        this.router.get('/all', GlobalMiddleWare.loginAuthenticate, CourseController.allCourse);
        this.router.get('/home/all', GlobalMiddleWare.loginAuthenticate, CourseController.allHomeCourse);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, CourseController.allAdminCourse);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), CourseValidators.create(), GlobalMiddleWare.checkError, CourseController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), CourseController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, new Utils().s3Multer.single('image'), CourseValidators.update(), GlobalMiddleWare.checkError, CourseController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, CourseValidators.delete(), GlobalMiddleWare.checkError,CourseController.delete)
    }
}

export default new CourseRouter().router;