import Product from "../models/Product";
import Order from "../models/Order";
import { Utils } from "../utils/Utils";

export class ProductController {

    static async create(req, res, next){  

        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body}; 
            let course_data:any = await new Product(insert).save();
            res.json({
                message:'Product Save Successfully',
                data:course_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Product.insertMany(excelData);
        
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
                Utils.s3Delete(req.product.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const product = await Product.findOneAndUpdate({_id: req.product._id}, update, {new: true, useFindAndModify: false});
            res.send(product);
        } catch (e) {
            next(e);
        }

    }

    static async delete(req, res, next) {
        const product = req.product;
        try {
            if(req.product.image){
                Utils.s3Delete(req.product.image_name);
            }
            await product.remove();
            res.json({
                message:'Success ! Product Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async product(req, res, next){
        var product = req.product;
        let myData:object = product.toObject();
        // order status
        myData['order_status']= false;
        if(req.user){
            let order_data = await Order.find({
                user:req.user.user_id, 
                item:'products', 
                item_id:myData['_id'], 
                to_date:{ $gte : new Date }
            });
            myData['order_data']= order_data;
            let order_status = await Order.countDocuments({
                    user:req.user.user_id, 
                    item:'products', 
                    item_id:myData['_id'], 
                    to_date:{ $gte : new Date }
                });
            if(order_status>0){
                myData['order_status']= true;
            }
        }
        const data = {
            message : 'Success',
            data:myData
        };
        res.json(data);
    }

    static async allProduct(req, res, next){

        try {
            const product = await Product.find({status:true}, {__v: 0}).sort({sequence:1});
            let course_array =[];
            for(let data of product){
                let myData:object = data.toObject();
                // order status
                myData['order_status']= false;
                if(req.user){
                    let order_data = await Order.find({
                        user:req.user.user_id, 
                        item:'products', 
                        item_id:myData['_id'], 
                        to_date:{ $gte : new Date }
                    });
                    myData['order_data']= order_data;
                    let order_status = await Order.countDocuments({
                            user:req.user.user_id, 
                            item:'products', 
                            item_id:myData['_id'], 
                            to_date:{ $gte : new Date }
                        });
                    if(order_status>0){
                        myData['order_status']= true;
                    }
                }
                course_array.push(myData);
            }

            const data = {
                message : 'Success',
                data:course_array
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allHomeProduct(req, res, next){

        try {
            const product = await Product.find({status:true, ishome:true}, {__v: 0}).sort({sequence:1});
            let course_array =[];
            for(let data of product){
                let myData:object = data.toObject();
                // order status
                myData['order_status']= false;
                if(req.user){
                    let order_data = await Order.find({
                        user:req.user.user_id, 
                        item:'products', 
                        item_id:myData['_id'], 
                        to_date:{ $gte : new Date }
                    });
                    myData['order_data']= order_data;
                    let order_status = await Order.countDocuments({
                            user:req.user.user_id, 
                            item:'products', 
                            item_id:myData['_id'], 
                            to_date:{ $gte : new Date }
                        });
                    if(order_status>0){
                        myData['order_status']= true;
                    }
                }
                course_array.push(myData);
            }

            const data = {
                message : 'Success',
                data:course_array
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminProduct(req, res, next){

        try {
            const product = await Product.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:product
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    

} 