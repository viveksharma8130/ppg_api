import { body, param, query } from "express-validator";
import Product from "../../models/Product";

import ProductVariant from "../../models/ProductVariant";

export class ProductVariantValidators{

    static create(){

        return  [   
                    body('colour', 'colour Is Required'),
                    body('size', 'size Is Required'),
                    body('product_id', 'product_id Is Required').custom((product_id, {req})=>{
                        return  Product.findOne({_id:product_id}).then(product => {
                                    if(product){
                                        return true;
                                    }else{
                                        throw new Error('Product Doesnt Exist');
                                    }
                                })
                    }),
                    body('price', 'price Is Required'),
                    body('mrp', 'mrp Is Required'),
    
                ];
        
    }

    static ProductVariant() {
        return [param('id').custom((id, {req}) => {
            return ProductVariant.findOne({_id: id}, {__v: 0}).then((variants) => {
                if (variants) {
                    req.variants = variants;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    } 

    static itemProductVariant() {
        return [param('product_id').custom((product_id, {req}) => {
            return ProductVariant.find({product_id: product_id}, {__v: 0}).then((variants) => {
                if (variants) {
                    req.variants = variants;
                    return true;
                } else {
                    throw new Error('Package Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return ProductVariant.findOne({_id: id}, {__v: 0}).then((variants) => {
                if (variants) {
                    req.variants = variants;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return ProductVariant.findOne({_id: id}, {__v: 0}).then((variants) => {
                if (variants) {
                    req.variants = variants;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    }


}