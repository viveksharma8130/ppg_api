import { body, param, query } from "express-validator";

import ProductPackage from "../../models/ProductPackage";

export class ProductPackageValidators{

    static create(){

        return  [   
                    body('item', 'item Is Required'),
                    body('item_id', 'item_id Is Required'),
                    body('validity', 'validity Is Required').custom((validity, {req})=>{
                        return  ProductPackage.findOne({validity:validity,item_id:req.body.item_id}).then(packages => {
                                    if(packages){
                                        throw new Error('Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('price', 'price Is Required')
    
                ];
        
    }

    static ProductPackage() {
        return [param('id').custom((id, {req}) => {
            return ProductPackage.findOne({_id: id}, {__v: 0}).then((packages) => {
                if (packages) {
                    req.packages = packages;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    } 

    static itemProductPackage() {
        return [param('item_id').custom((item_id, {req}) => {
            return ProductPackage.find({item_id: item_id}, {__v: 0}).then((packages) => {
                if (packages) {
                    req.packages = packages;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return ProductPackage.findOne({_id: id}, {__v: 0}).then((packages) => {
                if (packages) {
                    req.packages = packages;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return ProductPackage.findOne({_id: id}, {__v: 0}).then((packages) => {
                if (packages) {
                    req.packages = packages;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    }


}