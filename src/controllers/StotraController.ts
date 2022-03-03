import Stotra from "../models/Stotra";
import Order from "../models/Order";
import { Utils } from "../utils/Utils";

export class StotraController {

    static async create(req, res, next){  

        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body}; 
            let stotra:any = await new Stotra(insert).save();
            res.json({
                message:'Stotra Save Successfully',
                data:stotra,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Stotra.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    
    }

    static async update(req, res, next) {
        try {
            let fileObject:any = {};
            if(req.file){
                Utils.s3Delete(req.Stotra.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const stotra = await Stotra.findOneAndUpdate({_id: req.Stotra._id}, update, {new: true, useFindAndModify: false}).populate([{ path: "course"},{ path: "subject"}]);
            res.send(stotra);
        } catch (e) {
            next(e);
        }

    }

    static async delete(req, res, next) {
        const stotra = req.stotra;
        try {
            if(req.stotra.image){
                Utils.s3Delete(req.stotra.image_name);
            }
            await stotra.remove();
            res.json({
                message:'Success ! Stotra Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Stotra(req, res, next){
        const stotra = req.stotra;
    
        const data = {
            message : 'Success',
            data:stotra
        };
        res.json(data);
    }

    static async StotraSubject(req, res, next){
        const stotra = req.stotra;
        const data = {
            message : 'Success',
            data:stotra
        };
        res.json(data);
    }

    static async StotraCourse(req, res, next){
        const stotra = req.stotra;
        const data = {
            message : 'Success',
            data:stotra
        };
        res.json(data);
    }

    static async allStotra(req, res, next){

        try {
            const stotra = await Stotra.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:stotra
            }; 

            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allHomeStotra(req, res, next){

        try {
            const stotra = await Stotra.find({status:true, ishome:true}, {__v: 0}).sort({sequence:1});

            const data = {
                message : 'Success',
                data:stotra
            }; 

            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminStotra(req, res, next){

        try {
            const stotra = await Stotra.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:stotra
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    

} 