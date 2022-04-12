import ProductVariant from "../models/ProductVariant";
import { Utils } from "../utils/Utils";

export class ProductVariantController {

    static async create(req, res, next){  
        let fileObject:any = {};
        if(req.file){
            fileObject.image=req.file.location;
            fileObject.image_name=req.file.key;
        }
        var insert = {...fileObject, ...req.body}; 
        try {

            let variants:any = await new ProductVariant(insert).save();
            res.json({
                message:'ProductVariant Save Successfully',
                data:variants,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async update(req, res, next) {
        const ProductVariantId = req.variants._id;
        try {
            let fileObject:any = {};
            if(req.file){
                Utils.s3Delete(req.variants.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const variants = await ProductVariant.findOneAndUpdate({_id: ProductVariantId}, update, {new: true, useFindAndModify: false});
            res.send(variants);
        } catch (e) {
            next(e);
        }

    }

    static async ProductVariant(req, res, next){
        const variants = req.variants;
        const data = {
            message : 'Success',
            data:variants
        };
        res.json(data);
    }

    static async allProductVariant(req, res, next){

        try {
            const variants = await ProductVariant.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:variants
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminProductVariant(req, res, next){

        try {
            const variants = await ProductVariant.find();
            const data = {
                message : 'Success',
                data:variants
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


    static async delete(req, res, next) {
        const variants = req.variants;
        try {
            if(req.variants.image){
                Utils.s3Delete(req.variants.image_name);
            }
            await variants.remove();
            res.json({
                message:'Success ! ProductVariant Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 