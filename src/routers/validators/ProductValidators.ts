import { body, param, query } from "express-validator";

import Product from "../../models/Product";

export class ProductValidators{

    static create(){

        return  [ 
                    body('name', 'name Is Required').custom((name, {req})=>{
                        return  Product.findOne({name:name}).then(product => {
                                    if(product){
                                        throw new Error('Product Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('variant', 'variant is Required'),
    
                ];
        
    }

    static product() {
        return [param('id').custom((id, {req}) => {
            return Product.findOne({_id: id}, {__v: 0}).then((product) => {
                if (product) {
                    req.product = product;
                    return true;
                } else {
                    throw new Error('Product Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Product.findOne({_id: id}, {__v: 0}).then((product) => {
                if (product) {
                    req.product = product;
                    return true;
                } else {
                    throw new Error('Product Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Product.findOne({_id: id}, {__v: 0}).then((product) => {
                if (product) {
                    req.product = product;
                    return true;
                } else {
                    throw new Error('Product Does Not Exist');
                }
            })
        })]
    }


}