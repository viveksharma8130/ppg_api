import { body, param, query } from "express-validator";
import Admin from "../../models/Admin";
import User from "../../models/User";

export class AdminValidators{

    static signup(){

        return  [ 
                    body('name', 'name is Required').isString(),
                    body('password', 'password is Required').isString(),
                    body('email', 'email Is Required').isEmail().custom((email, {req})=>{
                        return  Admin.findOne({email:email}).then(admin => {
                                    if(admin){
                                        throw new Error('Admin Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({min:10, max:10}).withMessage('Phone must be 10 digit').custom((phone, {req})=>{
                        return  Admin.findOne({phone:phone}).then(admin => {
                                    if(admin){
                                        throw new Error('Admin Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static login() {
        return [query('email', 'Email is Required').isEmail()
            .custom((email, {req}) => {
                return Admin.findOne({email: email}).then(admin => {
                    if (admin) {
                        req.admin = admin;
                        return true;
                    } else {
                        throw  new Error('Admin Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isAlphanumeric()]
    }

    static allUserTransaction() {
        return [param('id').custom((id, {req}) => {
            return User.findOne({_id:id}, {__v: 0}).then(user => {
                            if(user){
                                req.user=user;
                                return true;
                            } else {
                                throw new Error('No user Found');
                            }
                        })
        })]
    }

    static deposit(){

        return  [ 
                    body('amount', 'amount Is Required'),
                    body('transaction_id', 'transaction_id Is Required'),
                    body('transaction_obj', 'transaction_obj Is Required'),
                    body('user', 'user Is Required').custom((user, {req})=>{
                        return  User.findOne({_id:user}).then(user => {
                                    if(user){
                                        req.user=user;
                                        return true;
                                    }else{
                                        throw new Error('user not Exist');
                                    }
                                })
                    })
                ];
        
    }

    static orderCreate(){

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
                    body('user', 'user Is Required').custom((user, {req})=>{
                        return  User.findOne({_id:user}).then(user => {
                                    if(user){
                                        return true;
                                    }else{
                                        throw new Error('user not Exist');
                                    }
                                })
                    })
                ];
        
    }


} 