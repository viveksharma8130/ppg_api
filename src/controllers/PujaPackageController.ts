import PujaPackage from "../models/PujaPackage";
import { Utils } from "../utils/Utils";

export class PujaPackageController {

    static async create(req, res, next){  

        try {

            let packages:any = await new PujaPackage(req.body).save();
            res.json({
                message:'PujaPackage Save Successfully',
                data:packages,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async update(req, res, next) {
        const PujaPackageId = req.packages._id;
        try {
            const packages = await PujaPackage.findOneAndUpdate({_id: PujaPackageId}, req.body, {new: true, useFindAndModify: false});
            res.send(packages);
        } catch (e) {
            next(e);
        }

    }

    static async PujaPackage(req, res, next){
        const packages = req.packages;
        const data = {
            message : 'Success',
            data:packages
        };
        res.json(data);
    }

    static async allPujaPackage(req, res, next){

        try {
            const packages = await PujaPackage.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:packages
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminPujaPackage(req, res, next){

        try {
            const packages = await PujaPackage.find();
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
                message:'Success ! PujaPackage Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 