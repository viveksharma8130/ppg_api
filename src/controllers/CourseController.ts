import Course from "../models/Course";
import Order from "../models/Order";
import { Utils } from "../utils/Utils";

export class CourseController {

    static async create(req, res, next){  

        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body}; 
            let course_data:any = await new Course(insert).save();
            res.json({
                message:'Course Save Successfully',
                data:course_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Course.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    
    }

    static async update(req, res, next) {
        try {
            let fileObject:any = {};
            if(req.file){
                Utils.s3Delete(req.course.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 
            const course = await Course.findOneAndUpdate({_id: req.course._id}, update, {new: true, useFindAndModify: false});
            res.send(course);
        } catch (e) {
            next(e);
        }

    }

    static async delete(req, res, next) {
        const course = req.course;
        try {
            if(req.course.image){
                Utils.s3Delete(req.course.image_name);
            }
            await course.remove();
            res.json({
                message:'Success ! Course Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async course(req, res, next){
        var course = req.course;
        let myData:object = course.toObject();
        // order status
        myData['order_status']= false;
        if(req.user){
            let order_data = await Order.find({
                user:req.user.user_id, 
                item:'courses', 
                item_id:myData['_id'], 
                to_date:{ $gte : new Date }
            });
            myData['order_data']= order_data;
            let order_status = await Order.countDocuments({
                    user:req.user.user_id, 
                    item:'courses', 
                    item_id:myData['_id'], 
                    to_date:{ $gte : new Date }
                });
            if(order_status>0){
                myData['order_status']= true;
            }
        }
        const data = {
            message : 'Success',
            data:myData
        };
        res.json(data);
    }

    static async allCourse(req, res, next){

        try {
            const course = await Course.find({status:true}, {__v: 0}).sort({sequence:1});
            let course_array =[];
            for(let data of course){
                let myData:object = data.toObject();
                // order status
                myData['order_status']= false;
                if(req.user){
                    let order_data = await Order.find({
                        user:req.user.user_id, 
                        item:'courses', 
                        item_id:myData['_id'], 
                        to_date:{ $gte : new Date }
                    });
                    myData['order_data']= order_data;
                    let order_status = await Order.countDocuments({
                            user:req.user.user_id, 
                            item:'courses', 
                            item_id:myData['_id'], 
                            to_date:{ $gte : new Date }
                        });
                    if(order_status>0){
                        myData['order_status']= true;
                    }
                }
                course_array.push(myData);
            }

            const data = {
                message : 'Success',
                data:course_array
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allHomeCourse(req, res, next){

        try {
            const course = await Course.find({status:true, ishome:true}, {__v: 0}).sort({sequence:1});
            let course_array =[];
            for(let data of course){
                let myData:object = data.toObject();
                // order status
                myData['order_status']= false;
                if(req.user){
                    let order_data = await Order.find({
                        user:req.user.user_id, 
                        item:'courses', 
                        item_id:myData['_id'], 
                        to_date:{ $gte : new Date }
                    });
                    myData['order_data']= order_data;
                    let order_status = await Order.countDocuments({
                            user:req.user.user_id, 
                            item:'courses', 
                            item_id:myData['_id'], 
                            to_date:{ $gte : new Date }
                        });
                    if(order_status>0){
                        myData['order_status']= true;
                    }
                }
                course_array.push(myData);
            }

            const data = {
                message : 'Success',
                data:course_array
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminCourse(req, res, next){

        try {
            const course = await Course.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:course
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    

} 