import { body, param, query } from "express-validator";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import User from "../../models/User";
import UserSession from "../../models/UserSession";

export class UserValidators{

    static session(){

        return  [ 
                    body('firebase_token', 'firebase_token is Required').isString(),
                    body('device_detail', 'device_detail is Required').isString(),
                    body('device_id', 'device_id Is Required').isString().custom((device_id, {req})=>{
                        return  UserSession.findOne({device_id:device_id}).then(userSession => {
                                    if(userSession){
                                        req.action='update';
                                        return true;
                                    }else{
                                        req.action='save';
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static signup(){

        return  [ 
                    body('name', 'name is Required').isString(),
                    body('password', 'password is Required').isString(),
                    body('email', 'email Is Required').isEmail().custom((email, {req})=>{
                        return  User.findOne({email:email}).then(user => {
                                    if(user){
                                        throw new Error('User Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({min:10, max:10}).withMessage('Phone must be 10 digit').custom((phone, {req})=>{
                        return  User.findOne({phone:phone}).then(user => {
                                    if(user){
                                        throw new Error('User Already Exist');
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
                return User.findOne({email: email, status:1}).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    } else {
                        throw  new Error('User Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isString()]
    }

    static passwordForgot(){

        return  [ 
                    body('password', 'Alphanumeric password is Required').isAlphanumeric(),
                    body('email', 'Email Is Required').isEmail().custom((email, {req})=>{
                        return  User.findOne({email:email}).then(user => {
                                    if(user){
                                        return true;
                                    }else{
                                        throw new Error('User Not Exist');
                                    }
                                })
                    }),
    
                ];
        
    }

    static passwordChange(){

        return  [ 
                    body('password', 'Alphanumeric password is Required').isString(),
                    body('old_password', 'Old password is Required').isString().custom((old_password, {req})=>{
                        return  User.findOne({_id:req.user.user_id}).then(user => {
                                    if(user){
                                        req.user_data=user;
                                        return true;
                                    }else{
                                        throw new Error('User Not Exist');
                                    }
                                })
                    }),
    
                ];
        
    }

    static deleteUser() {
        return [param('id').custom((id, {req}) => {
            return User.findOne({_id: id}, {__v: 0}).then((user) => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('user Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return User.findOne({_id: id}, {__v: 0}).then((user) => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User Does Not Exist');
                }
            })
        })]
    }

    static cartCreate(){

        return  [ 
                    // body('total_amount', 'total_amount is Required').isNumeric(),
                    // body('quantity', 'quantity is Required').isNumeric(),
                    body('product', 'product Is Required').isString().custom((product, {req})=>{
                        return  Product.findOne({_id:product}).then(pr => {
                                    if(pr){
                                        return true;
                                    }else{
                                        throw new Error('Product Does Not Exist');
                                    }
                                })
                    }),
                    // body('amount', 'amount is Required').isNumeric().custom((amount, {req})=>{
                    //     return  Cart.findOne({product:req.body.product, user:req.user.user_id}).then(cart => {
                    //                 if(cart){
                    //                     throw new Error('Product Already Exist in cart');
                                        
                    //                 }else{
                    //                     return true;
                    //                 }
                    //             })
                    // }),
    
                ];
        
    }

    static cartUpdate() {
        return [param('id').custom((id, {req}) => {
            return Cart.findOne({_id: id}, {__v: 0}).then((cart) => {
                if (cart) {
                    req.cart = cart;
                    return true;
                } else {
                    throw new Error('Cart Does Not Exist');
                }
            })
        })]
    }

    static deleteCart() {
        return [param('id').custom((id, {req}) => {
            return Cart.findOne({_id: id}, {__v: 0}).then((cart) => {
                if (cart) {
                    req.cart = cart;
                    return true;
                } else {
                    throw new Error('cart Does Not Exist');
                }
            })
        })]
    }


} 