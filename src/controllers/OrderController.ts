import Order from "../models/Order";
import User from "../models/User";
import WalletTransaction from "../models/WalletTransaction";

export class OrderController {

    static async create(req, res, next){  

        try {
            // order create
            const data = {...req.body, ...{user:req.user.user_id}};
            let order:any = await new Order(data).save();

            // wallet transaction create for order
            const transaction_data = {
                user:req.user.user_id,
                channel:'order',
                transaction_mode:'debit',
                amount:req.body.amount,
                transaction_id:req.body.payment_id,
                item_object:req.body.item_data,
                transaction_obj:req.body.payment_data
            };
            let walletTransaction:any = await new WalletTransaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: -req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({
                message:'Order Save Successfully',
                data:order,
                walletTransaction:walletTransaction,
                user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async pujaCreate(req, res, next){  

        try {
            // order create
            const data = {...req.body, ...{user:req.user.user_id}};
            let order:any = await new Order(data).save();

            // wallet transaction create for order
            const transaction_data = {
                user:req.user.user_id,
                channel:'order',
                transaction_mode:'debit',
                amount:req.body.amount,
                transaction_id:req.body.payment_id,
                item_object:req.body.item_data,
                transaction_obj:req.body.payment_data
            };
            let walletTransaction:any = await new WalletTransaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: -req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({
                message:'Order Save Successfully',
                data:order,
                walletTransaction:walletTransaction,
                user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async productCreate(req, res, next){  

        try {
            // order create
            const data = {...req.body, ...{user:req.user.user_id}};
            let order:any = await new Order(data).save();

            // wallet transaction create for order
            const transaction_data = {
                user:req.user.user_id,
                channel:'order',
                transaction_mode:'debit',
                amount:req.body.amount,
                transaction_id:req.body.payment_id,
                item_object:req.body.item_data,
                transaction_obj:req.body.payment_data
            };
            let walletTransaction:any = await new WalletTransaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: -req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({
                message:'Order Save Successfully',
                data:order,
                walletTransaction:walletTransaction,
                user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }


    static async deposit(req, res, next){  

        try {
            // wallet transaction create for deposit
            const transaction_data = {
                user:req.user.user_id,
                channel:'deposit',
                transaction_mode:'credit',
                amount:req.body.amount,
                transaction_id:req.body.transaction_id,
                //item_object:req.body.item_data,
                transaction_obj:req.body.transaction_obj
            };
            let walletTransaction:any = await new WalletTransaction(transaction_data).save();

            // user wallet update
            const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: req.body.amount} }, {new: true, useFindAndModify: false});

            res.json({
                message:'deposit add to wallet Successfully',
                walletTransaction:walletTransaction,
                user_wallet:user_wallet,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
    }

    static async update(req, res, next) {
        const orderId = req.order._id;
        try {
            const order =await Order.findOneAndUpdate({_id: orderId}, req.body, {new: true, useFindAndModify: false})
                                    .populate([
                                        { path: 'user'},
                                        { path: "item_id", select:['-__v','-updated_at','-created_at']}
                                    ]);
            res.send(order);
        } catch (e) {
            next(e);
        }

    }

    static async order(req, res, next){
        const order = req.order;
        const data = {
            message : 'Success',
            data:order
        };
        res.json(data);
    }

    static async userOrder(req, res, next){
        const order = req.order;
        const data = {
            message : 'Success',
            data:order
        };
        res.json(data);
    }

    static async orderStatus(req, res, next){
        const order = req.order;
        const data = {
            message : 'Success',
            data:order
        };
        res.json(data);
    }

    static async orderSt(req, res, next){
        if(!req.query.parent_id){

            try {
                let order:any = await Order.findOne({item_id:req.query.item_id,user:req.user.user_id}, {__v: 0});
                res.json({
                    message:'Success',
                    data:order,
                    status_code:200
                });
  
    
            } catch (e) {
                next(e)
            }
        }else if(req.query.parent_id){
            try {
                let order:any = await Order.find({
                    $or : [
                            {user:req.user.user_id, item_id:req.query.item_id, to_date:{ $gte : new Date }  },
                            {user:req.user.user_id, item_id:req.query.parent_id, to_date:{ $gte : new Date }  }
                        ]
                    })
                    .populate([
                        { path: 'user'},
                        { path: "item_id", select:['-__v','-updated_at','-created_at']}
                    ]);

                res.json({
                    message:'Success',
                    data:order,
                    status_code:200
                });
            } catch (e) { 
                next(e);
            }
        }
    }

    static async allOrder(req, res, next){

        try {
            const order= await Order.find({user:req.user.user_id}, {__v: 0})
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: 'user'},
                                        { path: "item_id", select:['-__v','-updated_at','-created_at']}
                                    ]);
            const data = {
                message : 'Success',
                data:order
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allTransaction(req, res, next){

        try {
            const order= await WalletTransaction.find({user:req.user.user_id}, {__v: 0})
                                    .sort({'_id': -1});
            const data = {
                message : 'Success',
                data:order
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async item(req, res, next){

        try {
            const order= await Order.find({user:req.user.user_id, item:req.item}, {__v: 0})
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: 'user'},
                                        { path: "item_id", select:['-__v','-updated_at','-created_at']}
                                    ]);
            const data = {
                message : 'Success',
                data:order
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminOrder(req, res, next){

        try {
            const order = await Order.find()
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: 'user'},
                                        { path: "item_id", select:['-__v','-updated_at','-created_at']}
                                    ]);
            const data = {
                message : 'Success',
                data:order
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async delete(req, res, next) {
        const order = req.order;
        try {
            await order.remove();
            res.json({
                message:'Success ! Order Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 