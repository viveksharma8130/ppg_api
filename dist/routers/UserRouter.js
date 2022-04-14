"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
const UserValidators_1 = require("./validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/login', UserValidators_1.UserValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.login);
        this.router.get('/user_data', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserController_1.UserController.userData);
        this.router.get('/admin/all', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, UserController_1.UserController.all);
        this.router.get('/cart/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserController_1.UserController.cartAll);
        this.router.get('/wishlist/all', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserController_1.UserController.wishlistAll);
    }
    postRoutes() {
        // session
        this.router.post('/session', UserValidators_1.UserValidators.session(), UserController_1.UserController.session);
        this.router.post('/cart/create', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidators_1.UserValidators.cartCreate(), UserController_1.UserController.cartCreate);
        this.router.post('/signup', UserValidators_1.UserValidators.signup(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.signup);
        this.router.post('/password/forgot', UserValidators_1.UserValidators.passwordForgot(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.passwordForgot);
        this.router.post('/password/change', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidators_1.UserValidators.passwordChange(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.passwordChange);
    }
    patchRoutes() {
        this.router.patch('/profile', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, new Utils_1.Utils().s3Multer.single('profile_pic'), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.profile);
        this.router.patch('/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.adminAuthenticate, UserValidators_1.UserValidators.update(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.update);
        this.router.patch('/cart/update/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidators_1.UserValidators.cartUpdate(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.cartUpdate);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidators_1.UserValidators.deleteUser(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.deleteUser);
        this.router.delete('/cart/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidators_1.UserValidators.deleteUser(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.deleteUser);
    }
}
exports.default = new UserRouter().router;
