import Package from "../models/Package";
import { Utils } from "../utils/Utils";

export class PackageController {

    static async create(req, res, next){  

        try {

            let packages:any = await new Package(req.body).save();
            res.json({
                message:'Package Save Successfully',
                data:packages,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async update(req, res, next) {
        const PackageId = req.packages._id;
        try {
            const packages = await Package.findOneAndUpdate({_id: PackageId}, req.body, {new: true, useFindAndModify: false});
            res.send(packages);
        } catch (e) {
            next(e);
        }

    }

    static async Package(req, res, next){
        const packages = req.packages;
        const data = {
            message : 'Success',
            data:packages
        };
        res.json(data);
    }

    static async allPackage(req, res, next){

        try {
            const packages = await Package.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:packages
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminPackage(req, res, next){

        try {
            const packages = await Package.find();
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
                message:'Success ! Package Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 