import { body, param, query } from "express-validator";
import Order from "../../models/Order";

export class OrderValidators{

    static create(){

        return  [ 
                    body('item', 'item Is Required'),
                    body('item_id', 'item_id Is Required'),
                    body('amount', 'amount Is Required'),
                    body('from_date', 'from_date Is Required'),
                    body('to_date', 'to_date Is Required'),
                    body('payment_id', 'payment_id Is Required'),
                    body('payment_data', 'payment_data Is Required'),
                    body('item_data', 'item_data Is Required'),
                    body('status', 'status Is Required'),
                ];
        
    }

    static pujaCreate(){

        return  [ 
                    body('item', 'item Is Required'),
                    body('item_id', 'item_id Is Required'),
                    body('amount', 'amount Is Required'),
                    body('puja_date', 'puja_date Is Required'),
                    body('samagri_status', 'samagri_status Is Required'),
                    body('payment_id', 'payment_id Is Required'),
                    body('payment_data', 'payment_data Is Required'),
                    body('item_data', 'item_data Is Required'),
                    body('name', 'name Is Required'),
                    body('address', 'address Is Required'),
                    body('phone', 'phone Is Required'),
                    body('status', 'status Is Required'),
                ];
        
    }

    static productCreate(){

        return  [ 
                    body('item', 'item Is Required'),
                    body('item_id', 'item_id Is Required'),
                    body('amount', 'amount Is Required'),
                    body('payment_id', 'payment_id Is Required'),
                    body('payment_data', 'payment_data Is Required'),
                    body('item_data', 'item_data Is Required'),
                    body('name', 'name Is Required'),
                    body('address', 'address Is Required'),
                    body('phone', 'phone Is Required'),
                    body('status', 'status Is Required'),
                ];
        
    }

    static deposit(){

        return  [ 
                    body('amount', 'amount Is Required'),
                    body('transaction_id', 'transaction_id Is Required'),
                    body('transaction_obj', 'transaction_obj Is Required'),
                ];
        
    }

    static order() {
        return [param('id').custom((id, {req}) => {
            return Order.findOne({_id: id, user:req.user.user_id}, {__v: 0})
                        .sort({'_id': -1})
                        .populate([
                            { path: 'user'},
                            { path: "item_id", select:['-__v','-updated_at','-created_at']}
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
                            { path: "item_id", select:['-__v','-updated_at','-created_at']}
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

    static item() {
        return [param('item').custom((item, {req}) => {
            req.item = item;
            return true;
        })]
    }

    static orderStatus() {
        return [
                query('item_id').custom((item_id, {req}) => {
                return Order.findOne({item_id: item_id, user:req.user.user_id}, {__v: 0})
                            .sort({'_id': -1})
                            .populate([
                                { path: 'user'},
                                { path: "item_id", select:['-__v','-updated_at','-created_at']}
                            ])
                            .then((order) => {
                                if (order) {
                                    req.order = order;
                                    return true;
                                } else {
                                    throw new Error('Order Does Not Exist');
                                }
                            })
            })
        ]
    }

    static orderSt(){

        return  [ 
                    body('query', 'item_id Is Required'),
                ];
        
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