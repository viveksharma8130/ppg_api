import { body, param, query } from "express-validator";
import Order from "../../models/Order";

export class OrderValidators{

    static create(){

        return  [ 
                    body('amount', 'amount Is Required'),
                    body('payment_id', 'payment_id Is Required'),
                    body('payment_data', 'payment_data Is Required'),
                    body('contact_name', 'contact_name Is Required'),
                    body('contact_address', 'contact_address Is Required'),
                    body('contact_phone', 'contact_phone Is Required'),
                    body('status', 'status Is Required'),
                    body('product_data', 'product_data Is Required'),
                ];
        
    }

    static order() {
        return [param('id').custom((id, {req}) => {
            return Order.findOne({_id: id, user:req.user.user_id}, {__v: 0})
                        .sort({'_id': -1})
                        .populate([
                            { path: 'user'},
                            { path: "products"}
                        ])
                        .then((order) => {
                            if (order) {
                                req.order = order;
                                return true;
                            } else {
                                throw new Error('Order Does Not Exist');
                            }
                        })
        })]
    }

    static userOrder() {
        return [param('id').custom((id, {req}) => {
            return Order.find({user:id}, {__v: 0})
                        .sort({'_id': -1})
                        .populate([
                            { path: 'user'},
                            { path: "products"}
                        ])
                        .then((order) => {
                            if (order) {
                                req.order = order;
                                return true;
                            } else {
                                throw new Error('No Order Found');
                            }
                        })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Order.findOne({_id: id}, {__v: 0}).then((order) => {
                if (order) {
                    req.order = order;
                    return true;
                } else {
                    throw new Error('Order Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Order.findOne({_id: id}, {__v: 0}).then((order) => {
                if (order) {
                    req.order = order;
                    return true;
                } else {
                    throw new Error('Order Does Not Exist');
                }
            })
        })]
    }


}