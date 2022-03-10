import { body, param, query } from "express-validator";

import Filter from "../../models/Filter";

export class FilterValidators{

    static create(){

        return  [ 
                    body('title', 'title Is Required').custom((title, {req})=>{
                        return  Filter.findOne({title:title}).then(filter => {
                                    if(filter){
                                        throw new Error('Filter Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static filter() {
        return [param('id').custom((id, {req}) => {
            return Filter.findOne({_id: id}, {__v: 0}).then((filter) => {
                if (filter) {
                    req.filter = filter;
                    return true;
                } else {
                    throw new Error('Filter Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Filter.findOne({_id: id}, {__v: 0}).then((filter) => {
                if (filter) {
                    req.filter = filter;
                    return true;
                } else {
                    throw new Error('Filter Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Filter.findOne({_id: id}, {__v: 0}).then((filter) => {
                if (filter) {
                    req.filter = filter;
                    return true;
                } else {
                    throw new Error('Filter Does Not Exist');
                }
            })
        })]
    }


}