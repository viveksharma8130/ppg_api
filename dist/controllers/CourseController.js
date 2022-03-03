"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const Course_1 = require("../models/Course");
const Order_1 = require("../models/Order");
const Utils_1 = require("../utils/Utils");
class CourseController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let course_data = yield new Course_1.default(insert).save();
                res.json({
                    message: 'Course Save Successfully',
                    data: course_data,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static excel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const excelData = yield Utils_1.Utils.importExcelData2MongoDB(req.file.path);
            yield Course_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    Utils_1.Utils.s3Delete(req.course.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const course = yield Course_1.default.findOneAndUpdate({ _id: req.course._id }, update, { new: true, useFindAndModify: false });
                res.send(course);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = req.course;
            try {
                if (req.course.image) {
                    Utils_1.Utils.s3Delete(req.course.image_name);
                }
                yield course.remove();
                res.json({
                    message: 'Success ! Course Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static course(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var course = req.course;
            let myData = course.toObject();
            // order status
            myData['order_status'] = false;
            if (req.user) {
                let order_data = yield Order_1.default.find({
                    user: req.user.user_id,
                    item: 'courses',
                    item_id: myData['_id'],
                    to_date: { $gte: new Date }
                });
                myData['order_data'] = order_data;
                let order_status = yield Order_1.default.countDocuments({
                    user: req.user.user_id,
                    item: 'courses',
                    item_id: myData['_id'],
                    to_date: { $gte: new Date }
                });
                if (order_status > 0) {
                    myData['order_status'] = true;
                }
            }
            const data = {
                message: 'Success',
                data: myData
            };
            res.json(data);
        });
    }
    static allCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield Course_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                let course_array = [];
                for (let data of course) {
                    let myData = data.toObject();
                    // order status
                    myData['order_status'] = false;
                    if (req.user) {
                        let order_data = yield Order_1.default.find({
                            user: req.user.user_id,
                            item: 'courses',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        myData['order_data'] = order_data;
                        let order_status = yield Order_1.default.countDocuments({
                            user: req.user.user_id,
                            item: 'courses',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        if (order_status > 0) {
                            myData['order_status'] = true;
                        }
                    }
                    course_array.push(myData);
                }
                const data = {
                    message: 'Success',
                    data: course_array
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allHomeCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield Course_1.default.find({ status: true, ishome: true }, { __v: 0 }).sort({ sequence: 1 });
                let course_array = [];
                for (let data of course) {
                    let myData = data.toObject();
                    // order status
                    myData['order_status'] = false;
                    if (req.user) {
                        let order_data = yield Order_1.default.find({
                            user: req.user.user_id,
                            item: 'courses',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        myData['order_data'] = order_data;
                        let order_status = yield Order_1.default.countDocuments({
                            user: req.user.user_id,
                            item: 'courses',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        if (order_status > 0) {
                            myData['order_status'] = true;
                        }
                    }
                    course_array.push(myData);
                }
                const data = {
                    message: 'Success',
                    data: course_array
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield Course_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: course
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.CourseController = CourseController;
