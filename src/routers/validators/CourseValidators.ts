import { body, param, query } from "express-validator";

import Course from "../../models/Course";

export class CourseValidators{

    static create(){

        return  [ 
                    body('name', 'name Is Required').custom((name, {req})=>{
                        return  Course.findOne({name:name}).then(course => {
                                    if(course){
                                        throw new Error('Course Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    }),
                    body('price', 'price is Required').isString(),
                    body('validity', 'validity Is Required').isNumeric(),
    
                ];
        
    }

    static course() {
        return [param('id').custom((id, {req}) => {
            return Course.findOne({_id: id}, {__v: 0}).then((course) => {
                if (course) {
                    req.course = course;
                    return true;
                } else {
                    throw new Error('Course Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Course.findOne({_id: id}, {__v: 0}).then((course) => {
                if (course) {
                    req.course = course;
                    return true;
                } else {
                    throw new Error('Course Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Course.findOne({_id: id}, {__v: 0}).then((course) => {
                if (course) {
                    req.course = course;
                    return true;
                } else {
                    throw new Error('Course Does Not Exist');
                }
            })
        })]
    }


}