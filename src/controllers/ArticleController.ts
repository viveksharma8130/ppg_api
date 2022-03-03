import Article from "../models/Article";
import { Utils } from "../utils/Utils";

export class ArticleController {

    static async create(req, res, next){  

        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body};

            let article_data:any = await new Article(insert).save();
            res.json({
                message:'Article Save Successfully',
                data:article_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async update(req, res, next) {
        const ArticleId = req.article._id;
        try {
            let fileObject:any = {};
            if(req.file){
                Utils.s3Delete(req.article.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const article = await Article.findOneAndUpdate({_id: ArticleId}, update, {new: true, useFindAndModify: false});
            res.send(article);
        } catch (e) {
            next(e);
        }

    }

    static async Article(req, res, next){
        const article = req.article;
        const data = {
            message : 'Success',
            data:article
        };
        res.json(data);
    }

    static async allArticle(req, res, next){

        try {
            const article = await Article.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:article
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminArticle(req, res, next){

        try {
            const article = await Article.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:article
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async delete(req, res, next) {
        const article = req.article;
        try {
            if(req.article.image){
                Utils.s3Delete(req.article.image_name);
            }
            await article.remove();
            res.json({
                message:'Success ! Article Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 