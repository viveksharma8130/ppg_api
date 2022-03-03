import PujaVidhi from "../models/PujaVidhi";
import { Utils } from "../utils/Utils";

export class PujaVidhiController {

    static async create(req, res, next){  

        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.path=req.file.location;
                fileObject.path_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body}; 
            let pujaVidhi:any = await new PujaVidhi(insert).save();
            res.json({
                message:'PujaVidhi Save Successfully',
                data:pujaVidhi,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await PujaVidhi.insertMany(excelData);
        
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
                Utils.s3Delete(req.PujaVidhi.path_name);
                fileObject.path=req.file.location;
                fileObject.path_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const pujaVidhi = await PujaVidhi.findOneAndUpdate({_id: req.PujaVidhi._id}, update, {new: true, useFindAndModify: false});
            res.send(pujaVidhi);
        } catch (e) {
            next(e);
        }

    }

    static async delete(req, res, next) {
        const pujaVidhi = req.pujaVidhi;
        try {
            if(req.pujaVidhi.path){
                Utils.s3Delete(req.pujaVidhi.path_name);
            }
            await pujaVidhi.remove();
            res.json({
                message:'Success ! PujaVidhi Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async PujaVidhi(req, res, next){
        const pujaVidhi = req.pujaVidhi;
        const data = {
            message : 'Success',
            data:pujaVidhi
        };
        res.json(data);
    }

    static async allPujaVidhi(req, res, next){

        try {
            const pujaVidhi = await PujaVidhi.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:pujaVidhi
            }; 

            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allHomePujaVidhi(req, res, next){

        try {
            const pujaVidhi = await PujaVidhi.find({status:true, ishome:true}, {__v: 0}).sort({sequence:1});

            const data = {
                message : 'Success',
                data:pujaVidhi
            }; 

            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminPujaVidhi(req, res, next){

        try {
            const pujaVidhi = await PujaVidhi.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:pujaVidhi
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    

} 