import { body, param, query } from "express-validator";

import Article from "../../models/Article";

export class ArticleValidators{

    static create(){

        return  [ 
                    body('title', 'title Is Required'),
                    body('description', 'description Is Required'),
                ];
        
    }

    static Article() {
        return [param('id').custom((id, {req}) => {
            return Article.findOne({_id: id}, {__v: 0}).then((article) => {
                if (article) {
                    req.article = article;
                    return true;
                } else {
                    throw new Error('Article Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Article.findOne({_id: id}, {__v: 0}).then((article) => {
                if (article) {
                    req.article = article;
                    return true;
                } else {
                    throw new Error('Article Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Article.findOne({_id: id}, {__v: 0}).then((article) => {
                if (article) {
                    req.article = article;
                    return true;
                } else {
                    throw new Error('Article Does Not Exist');
                }
            })
        })]
    }


}