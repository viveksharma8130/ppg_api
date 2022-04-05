"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerValidators = void 0;
const express_validator_1 = require("express-validator");
const Banner_1 = require("../../models/Banner");
class BannerValidators {
    static create() {
        return [
            express_validator_1.body('title', 'title Is Required'),
            express_validator_1.body('type', 'type Is Required')
        ];
    }
    static banner() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Banner_1.default.findOne({ _id: id }, { __v: 0 }).then((banner) => {
                    if (banner) {
                        req.banner = banner;
                        return true;
                    }
                    else {
                        throw new Error('Banner Does Not Exist');
                    }
                });
            })];
    }
    static type() {
        return [express_validator_1.param('type').custom((type, { req }) => {
                return Banner_1.default.find({ type: type, status: true }, { __v: 0 }).then((banner) => {
                    if (banner) {
                        req.banner = banner;
                        return true;
                    }
                    else {
                        throw new Error('Banner Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Banner_1.default.findOne({ _id: id }, { __v: 0 }).then((banner) => {
                    if (banner) {
                        req.banner = banner;
                        return true;
                    }
                    else {
                        throw new Error('Banner Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return Banner_1.default.findOne({ _id: id }, { __v: 0 }).then((banner) => {
                    if (banner) {
                        req.banner = banner;
                        return true;
                    }
                    else {
                        throw new Error('Banner Does Not Exist');
                    }
                });
            })];
    }
    static notification() {
        return [
            express_validator_1.body('notification_title', 'notification_title Is Required').isString(),
            express_validator_1.body('notification_body', 'notification_body Is Required').isString(),
        ];
    }
}
exports.BannerValidators = BannerValidators;
