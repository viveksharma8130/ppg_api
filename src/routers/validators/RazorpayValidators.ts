import { body, param, query } from "express-validator";

export class RazorpayValidators{

    static order(){

        return  [ 
                    query('amount', 'amount is Required').isString(),
                    query('currency', 'currency is Required').isString(),
                    query('receipt', 'receipt is Required').isString(),
                    query('payment_capture', 'payment_capture is Required').isString(),
    
                ];
        
    }

    static capture() {
        return  [   
                    body('amount', 'amount is Required').isNumeric,
                    body('currency', 'currency is Required').isString(),
                    param('paymentId', 'paymentId is Required').custom((paymentId, {req}) => {
                        req.paymentId = paymentId;
                        return true;
                    }),
                    
                ]
    }

    static fetch() {
        return  [   
                    param('paymentId', 'paymentId is Required').custom((paymentId, {req}) => {
                        req.paymentId = paymentId;
                        return true;
                    }),
                    
                ]
    }

} 