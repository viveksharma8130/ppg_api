import Order from "../models/Order";
import OrderProduct from "../models/OrderProduct";

export class OrderController {

    static async productCreate(req, res, next){  

        try {
            // order create
            const data = {...req.body, ...{user:req.user.user_id}};
            let order:any = await new Order(data).save();
            for (const product of req.body.product_data) {
                let product_data = {...product, ...{order_id:order['_id']}};
                await new OrderProduct(product_data).save(); 
            }

            res.json({
                message:'Order Save Successfully',
                data:order,
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
                                        { path: "products"}
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

    static async allOrder(req, res, next){

        try {
            const order= await Order.find({user:req.user.user_id}, {__v: 0})
                                    .sort({'_id': -1})
                                    .populate([
                                        { path: 'user'},
                                        { path: "products"}
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
                                        { path: "products"}
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