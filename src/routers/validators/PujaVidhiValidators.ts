import { body, param, query } from "express-validator";
import Course from "../../models/Course";

import PujaVidhi from "../../models/PujaVidhi";

export class PujaVidhiValidators{

    static create(){

        return  [ 
                    body('name', 'name Is Required'),
                    body('validity', 'validity Is Required').isNumeric(),
                ];
        
    }

    static PujaVidhi() {
        return [param('id').custom((id, {req}) => {
            return PujaVidhi.findOne({_id: id}, {__v: 0}).then((pujaVidhi) => {
                if (pujaVidhi) {
                    req.pujaVidhi = pujaVidhi;
                    return true;
                } else {
                    throw new Error('PujaVidhi Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return PujaVidhi.findOne({_id: id}, {__v: 0}).then((pujaVidhi) => {
                if (pujaVidhi) {
                    req.pujaVidhi = pujaVidhi;
                    return true;
                } else {
                    throw new Error('PujaVidhi Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return PujaVidhi.findOne({_id: id}, {__v: 0}).then((pujaVidhi) => {
                if (pujaVidhi) {
                    req.pujaVidhi = pujaVidhi;
                    return true;
                } else {
                    throw new Error('PujaVidhi Does Not Exist');
                }
            })
        })]
    }


}