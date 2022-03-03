"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PujaVidhiValidators = void 0;
const express_validator_1 = require("express-validator");
const PujaVidhi_1 = require("../../models/PujaVidhi");
class PujaVidhiValidators {
    static create() {
        return [
            (0, express_validator_1.body)('name', 'name Is Required'),
            (0, express_validator_1.body)('validity', 'validity Is Required').isNumeric(),
        ];
    }
    static PujaVidhi() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
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
