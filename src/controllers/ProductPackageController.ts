import ProductPackage from "../models/ProductPackage";
import { Utils } from "../utils/Utils";

export class ProductPackageController {

    static async create(req, res, next){  

        try {

            let packages:any = await new ProductPackage(req.body).save();
            res.json({
                message:'ProductPackage Save Successfully',
                data:packages,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async update(req, res, next) {
        const ProductPackageId = req.packages._id;
        try {
            const packages = await ProductPackage.findOneAndUpdate({_id: ProductPackageId}, req.body, {new: true, useFindAndModify: false});
            res.send(packages);
        } catch (e) {
            next(e);
        }

    }

    static async ProductPackage(req, res, next){
        const packages = req.packages;
        const data = {
            message : 'Success',
            data:packages
        };
        res.json(data);
    }

    static async allProductPackage(req, res, next){

        try {
            const packages = await ProductPackage.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:packages
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminProductPackage(req, res, next){

        try {
            const packages = await ProductPackage.find();
            const data = {
                message : 'Success',
                data:packages
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


    static async delete(req, res, next) {
        const packages = req.packages;
        try {
            await packages.remove();
            res.json({
                message:'Success ! ProductPackage Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 