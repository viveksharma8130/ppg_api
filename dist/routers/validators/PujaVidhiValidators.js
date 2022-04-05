"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PujaVidhiValidators = void 0;
const express_validator_1 = require("express-validator");
const PujaVidhi_1 = require("../../models/PujaVidhi");
class PujaVidhiValidators {
    static create() {
        return [
            express_validator_1.body('name', 'name Is Required'),
            express_validator_1.body('validity', 'validity Is Required').isNumeric(),
        ];
    }
    static PujaVidhi() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return PujaVidhi_1.default.findOne({ _id: id }, { __v: 0 }).then((pujaVidhi) => {
                    if (pujaVidhi) {
                        req.pujaVidhi = pujaVidhi;
                        return true;
                    }
                    else {
                        throw new Error('PujaVidhi Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return PujaVidhi_1.default.findOne({ _id: id }, { __v: 0 }).then((pujaVidhi) => {
                    if (pujaVidhi) {
                        req.pujaVidhi = pujaVidhi;
                        return true;
                    }
                    else {
                        throw new Error('PujaVidhi Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [express_validator_1.param('id').custom((id, { req }) => {
                return PujaVidhi_1.default.findOne({ _id: id }, { __v: 0 }).then((pujaVidhi) => {
                    if (pujaVidhi) {
                        req.pujaVidhi = pujaVidhi;
                        return true;
                    }
                    else {
                        throw new Error('PujaVidhi Does Not Exist');
                    }
                });
            })];
    }
}
exports.PujaVidhiValidators = PujaVidhiValidators;
