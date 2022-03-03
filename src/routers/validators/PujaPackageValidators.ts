import { body, param, query } from "express-validator";
import Puja from "../../models/Puja";

import PujaPackage from "../../models/PujaPackage";

export class PujaPackageValidators{

    static create(){

        return  [   
                    body('title', 'title Is Required'),
                    body('puja_id', 'puja_id Is Required').custom((puja_id, {req})=>{
                        return  Puja.findOne({_id:puja_id}).then(puja => {
                                    if(puja){
                                        return true;
                                    }else{
                                        throw new Error('Puja Doesnt Exist');
                                    }
                                })
                    }),
                    body('price', 'price Is Required')
    
                ];
        
    }

    static PujaPackage() {
        return [param('id').custom((id, {req}) => {
            return PujaPackage.findOne({_id: id}, {__v: 0}).then((packages) => {
                if (packages) {
                    req.packages = packages;
                    return true;
                } else {
                    throw new Error('Does Not Exist');
                }
            })
        })]
    } 

    static itemPujaPackage() {
        return [param('puja_id').custom((puja_id, {req}) => {
            return PujaPackage.find({puja_id: puja_id}, {__v: 0}).then((packages) => {
                if (packages) {
                    req.packages = packages;
                    return true;
                } else {
                    throw new Error('Package Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return PujaPackage.findOne({_id: id}, {__v: 0}).then((packages) => {
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
            return PujaPackage.findOne({_id: id}, {__v: 0}).then((packages) => {
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