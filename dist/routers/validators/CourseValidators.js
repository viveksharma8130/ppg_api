"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidators = void 0;
const express_validator_1 = require("express-validator");
const Course_1 = require("../../models/Course");
class CourseValidators {
    static create() {
        return [
            express_validator_1.body('name', 'name Is Required').custom((name, { req }) => {
                return Course_1.default.findOne({ name: name }).then(course => {
                    if (course) {
                        throw new Error('Course Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('price', 'price is Required').isString(),
            express_validator_1.body('validity', 'validity Is Required').isNumeric(),
        ];
    }
    static course() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Course_1.default.findOne({ _id: id }, { __v: 0 }).then((course) => {
                    if (course) {
                        req.course = course;
                        return true;
                    }
                    else {
                        throw new Error('Course Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Course_1.default.findOne({ _id: id }, { __v: 0 }).then((course) => {
                    if (course) {
                        req.course = course;
                        return true;
                    }
                    else {
                        throw new Error('Course Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Course_1.default.findOne({ _id: id }, { __v: 0 }).then((course) => {
                    if (course) {
                        req.course = course;
                        return true;
                    }
                    else {
                        throw new Error('Course Does Not Exist');
                    }
                });
            })];
    }
}
exports.CourseValidators = CourseValidators;
