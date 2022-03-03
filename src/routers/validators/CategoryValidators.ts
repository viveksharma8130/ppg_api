import { body, param, query } from "express-validator";

import Category from "../../models/Category";

export class CategoryValidators{

    static create(){

        return  [ 
                    body('category', 'Category Is Required').custom((category, {req})=>{
                        return  Category.findOne({category:category}).then(category => {
                                    if(category){
                                        throw new Error('Category Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static category() {
        return [param('id').custom((id, {req}) => {
            return Category.findOne({_id: id}, {__v: 0}).then((Category) => {
                if (Category) {
                    req.Category = Category;
                    return true;
                } else {
                    throw new Error('Category Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Category.findOne({_id: id}, {__v: 0}).then((Category) => {
                if (Category) {
                    req.Category = Category;
                    return true;
                } else {
                    throw new Error('Category Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Category.findOne({_id: id}, {__v: 0}).then((Category) => {
                if (Category) {
                    req.Category = Category;
                    return true;
                } else {
                    throw new Error('Category Does Not Exist');
                }
            })
        })]
    }


}