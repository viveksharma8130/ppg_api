import Paper from "../models/Paper";
import { Utils } from "../utils/Utils";

export class PaperController {

    static async create(req, res, next){  

        try {

            let Paper_data:any = await new Paper(req.body).save();
            res.json({
                message:'Paper Save Successfully',
                data:Paper_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Paper.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    
    }

    static async update(req, res, next) {
        const PaperId = req.paper._id;
        try {
            const paper = await Paper.findOneAndUpdate({_id: PaperId}, req.body, {new: true, useFindAndModify: false});
            res.send(paper);
        } catch (e) {
            next(e);
        }

    }

    static async paper(req, res, next){
        const paper = req.paper;
        const data = {
            message : 'Success',
            data:paper
        };
        res.json(data);
    }

    static async paperType(req, res, next){
        const paper = req.paper;
        const data = {
            message : 'Success',
            data:paper
        };
        res.json(data);
    }

    static async paper_wise(req, res, next) {

        // var condition: any = [
        //     {
        //         $group :
        //         {
        //             _id:"$year",
        //             results: {$push: '$$ROOT'}   
        //         }
        //     },
        //     {   $match:{ paper:req.paper_type} }
        // ];
        //const paper= await Paper.aggregate(condition);

        var year_array=[];
        let papers= await Paper.find({paper:req.paper_type});
        for (var element of papers) {
            var index = year_array.findIndex(x => x.year==element['year']); 
            if(index === -1){
                var dat=await Paper.find({paper:req.paper_type,year:element['year']}).sort({sequence:1});
                year_array.push({
                    year:element['year'], 
                    data:dat
                });
            }
        }
        const data = {
            message : 'Success',
            data:year_array
        };
        res.json(data);
    }

    static async allPaper(req, res, next){

        try {
            const paper = await Paper.find({status:true}, {__v: 0});
            const data = {
                message : 'Success',
                data:paper
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminPaper(req, res, next){

        try {
            const paper = await Paper.find();
            const data = {
                message : 'Success',
                data:paper
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


    static async delete(req, res, next) {
        const paper = req.paper;
        try {
            await paper.remove();
            res.json({
                message:'Success ! Paper Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 