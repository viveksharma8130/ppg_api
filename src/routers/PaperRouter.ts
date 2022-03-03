import { Router } from "express";
import { PaperController } from "../controllers/PaperController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";
import { PaperValidators } from "./validators/PaperValidators";

class PaperRouter {
    public router: Router;
    constructor(){
        this.router=Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();

    }

    getRoutes(){
        this.router.get('/id/:id', PaperValidators.paper(), GlobalMiddleWare.checkError, PaperController.paper);
        this.router.get('/all', PaperController.allPaper);
        this.router.get('/paper_type/:paper_type', PaperValidators.paperType(), GlobalMiddleWare.checkError, PaperController.paperType);
        this.router.get('/paper_wise/:paper_type', PaperValidators.paperType(), GlobalMiddleWare.checkError, PaperController.paper_wise);
        this.router.get('/admin/all', GlobalMiddleWare.adminAuthenticate, PaperController.allAdminPaper);
    }
    postRoutes(){
        this.router.post('/create', GlobalMiddleWare.adminAuthenticate, PaperValidators.create(), GlobalMiddleWare.checkError, PaperController.create);
        this.router.post('/excel', GlobalMiddleWare.adminAuthenticate, new Utils().excelMulter.single('excel'), PaperController.excel);
    }
    patchRoutes(){
        this.router.patch('/update/:id', GlobalMiddleWare.adminAuthenticate, PaperValidators.update(), GlobalMiddleWare.checkError, PaperController.update);
    }
    deleteRoutes(){
        this.router.delete('/delete/:id', GlobalMiddleWare.adminAuthenticate, PaperValidators.delete(), GlobalMiddleWare.checkError,PaperController.delete)
    }
}

export default new PaperRouter().router;