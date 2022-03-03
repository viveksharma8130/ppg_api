import Category from "../models/Category";
import { Utils } from "../utils/Utils";

export class CategoryController {

    static async create(req, res, next){  

        const category = req.body.category;

        try {
            const data ={
                category: category
            }

            let category_data:any = await new Category(data).save();
            res.json({
                message:'Category Save Successfully',
                data:category_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Category.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    
    }

    static async update(req, res, next) {
        const CategoryId = req.Category._id;
        try {
            const category = await Category.findOneAndUpdate({_id: CategoryId}, req.body, {new: true, useFindAndModify: false});
            res.send(category);
        } catch (e) {
            next(e);
        }

    }

    static async category(req, res, next){
        const category = req.Category;
        const data = {
            message : 'Success',
            data:category
        };
        res.json(data);
    }

    static async allCategory(req, res, next){

        try {
            const category = await Category.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:category
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminCategory(req, res, next){

        try {
            const category = await Category.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:category
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


    static async delete(req, res, next) {
        const Category = req.Category;
        try {
            await Category.remove();
            res.json({
                message:'Success ! Category Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 