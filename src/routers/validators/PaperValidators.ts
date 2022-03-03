import { body, param, query } from "express-validator";

import Paper from "../../models/Paper";

export class PaperValidators{

    static create(){

        return  [ 
                    body('title', 'title Is Required').custom((title, {req})=>{
                        return  Paper.findOne({title:title}).then(paper => {
                                    if(paper){
                                        throw new Error('Paper Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('year', 'year Is Required'),
                    body('paper', 'paper Is Required'),
                    body('content', 'content Is Required')
    
                ];
        
    }

    static paper() {
        return [param('id').custom((id, {req}) => {
            return Paper.findOne({_id: id}, {__v: 0}).then((paper) => {
                if (paper) {
                    req.paper = paper;
                    return true;
                } else {
                    throw new Error('Paper Does Not Exist');
                }
            })
        })]
    }

    static paperType() {
        return [param('paper_type').custom((paper_type, {req}) => {
            return Paper.find({paper: paper_type}, {__v: 0}).then((paper) => {
                if (paper) {
                    req.paper_type = paper_type;
                    req.paper = paper;
                    return true;
                } else {
                    throw new Error('Paper Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Paper.findOne({_id: id}, {__v: 0}).then((paper) => {
                if (paper) {
                    req.paper = paper;
                    return true;
                } else {
                    throw new Error('Paper Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Paper.findOne({_id: id}, {__v: 0}).then((paper) => {
                if (paper) {
                    req.paper = paper;
                    return true;
                } else {
                    throw new Error('Paper Does Not Exist');
                }
            })
        })]
    }


}