import Filter from "../models/Filter";
import { Utils } from "../utils/Utils";

export class FilterController {

    static async create(req, res, next){  

        try {

            let category_data:any = await new Filter(req.body).save();
            res.json({
                message:'Filter Save Successfully',
                data:category_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Filter.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    
    }

    static async update(req, res, next) {
        const FilterId = req.filter._id;
        try {
            const filter = await Filter.findOneAndUpdate({_id: FilterId}, req.body, {new: true, useFindAndModify: false});
            res.send(filter);
        } catch (e) {
            next(e);
        }

    }

    static async filter(req, res, next){
        const filter = req.filter;
        const data = {
            message : 'Success',
            data:filter
        };
        res.json(data);
    }

    static async allFilter(req, res, next){

        try {
            const filter = await Filter.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:filter
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminFilter(req, res, next){

        try {
            const filter = await Filter.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:filter
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


    static async delete(req, res, next) {
        const filter = req.filter;
        try {
            await filter.remove();
            res.json({
                message:'Success ! Filter Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 