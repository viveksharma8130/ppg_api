import { body, param, query } from "express-validator";
import WalletTransaction from "../../models/WalletTransaction";

export class WalletTransactionValidators{

    static signup(){

        return  [ 
                    body('name', 'name is Required').isString(),
                    body('password', 'password is Required').isString(),
                    body('email', 'email Is Required').isEmail().custom((email, {req})=>{
                        return  WalletTransaction.findOne({email:email}).then(WalletTransaction => {
                                    if(WalletTransaction){
                                        throw new Error('WalletTransaction Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('phone', 'Phone with numeric value Is Required').isNumeric().isLength({min:10, max:10}).withMessage('Phone must be 10 digit').custom((phone, {req})=>{
                        return  WalletTransaction.findOne({phone:phone}).then(WalletTransaction => {
                                    if(WalletTransaction){
                                        throw new Error('WalletTransaction Already Exist');
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
                return WalletTransaction.findOne({email: email}).then(WalletTransaction => {
                    if (WalletTransaction) {
                        req.WalletTransaction = WalletTransaction;
                        return true;
                    } else {
                        throw  new Error('WalletTransaction Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isAlphanumeric()]
    }


} 