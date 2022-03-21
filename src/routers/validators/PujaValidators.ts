import { body, param, query } from "express-validator";

import Puja from "../../models/Puja";

export class PujaValidators{

    static create(){

        return  [ 
                    body('name', 'name Is Required').custom((name, {req})=>{
                        return  Puja.findOne({name:name}).then(puja => {
                                    if(puja){
                                        throw new Error('Puja Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    //body('price', 'price is Required').isNumeric(),
                    //body('samagri_price', 'samagri_price Is Required').isNumeric(),
    
                ];
        
    }

    static Puja() {
        return [param('id').custom((id, {req}) => {
            return Puja.findOne({_id: id}, {__v: 0}).then((puja) => {
                if (puja) {
                    req.puja = puja;
                    return true;
                } else {
                    throw new Error('Puja Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Puja.findOne({_id: id}, {__v: 0}).populate({path:'packages'}).then((puja) => {
                if (puja) {
                    req.puja = puja;
                    return true;
                } else {
                    throw new Error('Puja Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Puja.findOne({_id: id}, {__v: 0}).then((puja) => {
                if (puja) {
                    req.puja = puja;
                    return true;
                } else {
                    throw new Error('Puja Does Not Exist');
                }
            })
        })]
    }


}