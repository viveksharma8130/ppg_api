import Article from "../models/Article";

export class ArticleController {

    static async create(req, res, next){  

        const article = req.body.article;

        try {
            const data ={
                article: article
            }

            let article_data:any = await new Article(data).save();
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
        const ArticleId = req.Article._id;
        try {
            const article = await Article.findOneAndUpdate({_id: ArticleId}, req.body, {new: true, useFindAndModify: false});
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