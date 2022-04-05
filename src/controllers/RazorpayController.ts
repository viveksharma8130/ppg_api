import * as request from 'request';
import { RazorKeys } from "../utils/razorpay/RazorKeys";
import { RazorInstance } from "../utils/razorpay/Razorpay";

export class RazorpayController {

    static async order(req, res, next){ 
        
        try{
            const options ={
                amount : req.query.amount*100,                // 10*100
                currency : req.query.currency,                // "INR"
                receipt: req.query.receipt,                   // "receipt#1"
                payment_capture: req.query.payment_capture    // 0, 1
        
            };
            RazorInstance.razorInstance().orders.create(options,async function(err,order){
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        message: "Something error!s",
                        error:err
                    })
                }
                return res.status(200).json(order)
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: "Something error!s",
                error:err
            })
        }
    }

    static async capture(req, res, next){  
        try{
            return request(
                {
                    method : "POST",
                    url : `https://${RazorKeys.razorIdkey}:${RazorKeys.razorIdSecret}@api.razorpay.com/v1/payments/${req.paymentId}/capture`,
                    form:{
                        amount : req.body.amount*100,  // 10*100
                        currency : req.body.currency,  // INR          
                    },
                },
                async function(err,response,body){   
                    if(err){
                        return res.status(500).json({
                            message: "Something error!s",
                            error:err
                        })
                    }
                    return res.status(200).json(body);
                }
            )
        }
        catch(err){
            return res.status(500).json({
                message: err.message,
                error:err
            })
        }
    }

    static async fetch(req, res, next){  
        try{
            return request(
                {
                    method : "GET",
                    url : `https://${RazorKeys.razorIdkey}:${RazorKeys.razorIdSecret}@api.razorpay.com/v1/payments/${req.paymentId}`,
                },
                async function(err,response,body){   
                    if(err){
                        return res.status(500).json({
                            message: "Something error!s",
                            error:err
                        })
                    }
                    return res.status(200).json(body);
                }
            )
        }
        catch(err){
            return res.status(500).json({
                message: err.message,
                error:err
            })
        }
    }

} 