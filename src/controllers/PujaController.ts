import Puja from "../models/Puja";
import Order from "../models/Order";
import { Utils } from "../utils/Utils";
import WalletTransaction from "../models/WalletTransaction";
import User from "../models/User";
import OrderPuja from "../models/OrderPuja";

export class PujaController {

    static async create(req, res, next){  

        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body}; 
            let Puja_data:any = await new Puja(insert).save();
            res.json({
                message:'Puja Save Successfully',
                data:Puja_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Puja.insertMany(excelData);
        
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
                Utils.s3Delete(req.puja.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const puja = await Puja.findOneAndUpdate({_id: req.puja._id}, update, {new: true, useFindAndModify: false});
            res.send(puja);
        } catch (e) {
            next(e);
        }

    }

    static async delete(req, res, next) {
        const puja = req.puja;
        try {
            if(req.puja.image){
                Utils.s3Delete(req.puja.image_name);
            }
            await puja.remove();
            res.json({
                message:'Success ! Puja Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async Puja(req, res, next){
        var puja = req.puja;
        let myData:object = puja.toObject();
        // order status
        myData['order_status']= false;
        if(req.user){
            let order_data = await Order.find({
                user:req.user.user_id, 
                item:'pujas', 
                item_id:myData['_id'], 
                to_date:{ $gte : new Date }
            });
            myData['order_data']= order_data;
            let order_status = await Order.countDocuments({
                    user:req.user.user_id, 
                    item:'pujas', 
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

    static async allPuja(req, res, next){

        try {
            const puja = await Puja.find({status:true}, {__v: 0}).sort({sequence:1}).populate({path:'packages'});
            let Puja_array =[];
            for(let data of puja){
                let myData:object = data.toObject();
                // order status
                myData['order_status']= false;
                if(req.user){
                    let order_data = await Order.find({
                        user:req.user.user_id, 
                        item:'Pujas', 
                        item_id:myData['_id'], 
                        to_date:{ $gte : new Date }
                    });
                    myData['order_data']= order_data;
                    let order_status = await Order.countDocuments({
                            user:req.user.user_id, 
                            item:'Pujas', 
                            item_id:myData['_id'], 
                            to_date:{ $gte : new Date }
                        });
                    if(order_status>0){
                        myData['order_status']= true;
                    }
                }
                Puja_array.push(myData);
            }

            const data = {
                message : 'Success',
                data:Puja_array
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allHomePuja(req, res, next){

        try {
            const puja = await Puja.find({status:true, ishome:true}, {__v: 0}).sort({sequence:1}).populate({path:'packages'});
            let Puja_array =[];
            for(let data of puja){
                let myData:object = data.toObject();
                // order status
                myData['order_status']= false;
                if(req.user){
                    let order_data = await Order.find({
                        user:req.user.user_id, 
                        item:'Pujas', 
                        item_id:myData['_id'], 
                        to_date:{ $gte : new Date }
                    });
                    myData['order_data']= order_data;
                    let order_status = await Order.countDocuments({
                            user:req.user.user_id, 
                            item:'Pujas', 
                            item_id:myData['_id'], 
                            to_date:{ $gte : new Date }
                        });
                    if(order_status>0){
                        myData['order_status']= true;
                    }
                }
                Puja_array.push(myData);
            }

            const data = {
                message : 'Success',
                data:Puja_array
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminPuja(req, res, next){

        try {
            const puja = await Puja.find().sort({sequence:1}).populate({path:'packages'});
            const data = {
                message : 'Success',
                data:puja
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async orderCreate(req, res, next){  

        try {
            // order create
            const data = {...req.body, ...{user:req.user.user_id}};
            let order:any = await new OrderPuja(data).save();

            // wallet transaction create for order
            // const transaction_data = {
            //     user:req.user.user_id,
            //     channel:'order',
            //     transaction_mode:'debit',
            //     amount:req.body.amount,
            //     transaction_id:req.body.payment_id,
            //     item_object:req.body.puja_data,
            //     transaction_obj:req.body.payment_data
            // };
            // let walletTransaction:any = await new WalletTransaction(transaction_data).save();

            // user wallet update
            //const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: -req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({
                message:'Order Save Successfully',
                data:order,
                //walletTransaction:walletTransaction,
                //user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async allOrder(req, res, next){

        try {
            const puja = await OrderPuja.find({user:req.user.user_id}).sort({created_at:-1}).populate({path:'puja_id'});
            const data = {
                message : 'Success',
                data:puja
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminOrder(req, res, next){

        try {
            const puja = await OrderPuja.find({}).sort({created_at:-1}).populate({path:'puja_id'});
            const data = {
                message : 'Success',
                data:puja
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

} 