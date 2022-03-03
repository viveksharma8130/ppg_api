import { Router } from "express";
import { WalletTransactionController } from "../controllers/WalletTransactionController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { WalletTransactionValidators } from "./validators/WalletTransactionValidators";

class WalletTransactionRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    } 

    getRoutes(){
        this.router.get('/data', GlobalMiddleWare.adminAuthenticate, WalletTransactionController.data);
        this.router.get('/all', GlobalMiddleWare.adminAuthenticate, WalletTransactionController.all);
        this.router.get('/login', WalletTransactionValidators.login(), GlobalMiddleWare.checkError, WalletTransactionController.login);
    }
    postRoutes(){
        this.router.post('/signup', WalletTransactionValidators.signup(), GlobalMiddleWare.checkError, WalletTransactionController.signup);
    }
    patchRoutes(){
        this.router.patch('/update', GlobalMiddleWare.adminAuthenticate, WalletTransactionController.update);
    }
    deleteRoutes(){
    }
}

export default new WalletTransactionRouter().router;