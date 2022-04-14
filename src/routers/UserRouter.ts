import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { UserValidators } from "./validators/UserValidators";

class UserRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes(); 
        this.deleteRoutes();
    } 

    getRoutes(){
        this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/user_data', GlobalMiddleWare.authenticate, UserController.userData);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, UserController.all);
        this.router.get('/cart/all', GlobalMiddleWare.authenticate, UserController.cartAll);
        this.router.get('/wishlist/all', GlobalMiddleWare.authenticate, UserController.wishlistAll);
    }
    postRoutes(){
        // session
        this.router.post('/session', UserValidators.session(), UserController.session);
        this.router.post('/cart/create', GlobalMiddleWare.authenticate, UserValidators.cartCreate(), UserController.cartCreate);
        this.router.post('/signup', UserValidators.signup(), GlobalMiddleWare.checkError, UserController.signup);
        this.router.post('/password/forgot', UserValidators.passwordForgot(), GlobalMiddleWare.checkError, UserController.passwordForgot);
        this.router.post('/password/change', GlobalMiddleWare.authenticate, UserValidators.passwordChange(), GlobalMiddleWare.checkError, UserController.passwordChange);
    }
    patchRoutes(){
        this.router.patch('/profile', GlobalMiddleWare.authenticate, new Utils().s3Multer.single('profile_pic'), GlobalMiddleWare.checkError, UserController.profile);
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, UserValidators.update(), GlobalMiddleWare.checkError, UserController.update);
        this.router.patch('/cart/update/:id', GlobalMiddleWare.authenticate, UserValidators.cartUpdate(), GlobalMiddleWare.checkError, UserController.cartUpdate);
    }

    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.authenticate, UserValidators.deleteUser(), GlobalMiddleWare.checkError, UserController.deleteUser);
        this.router.delete('/cart/delete/:id', GlobalMiddleWare.authenticate, UserValidators.deleteUser(), GlobalMiddleWare.checkError, UserController.deleteUser);
    }
}

export default new UserRouter().router;