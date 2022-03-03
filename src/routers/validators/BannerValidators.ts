import { body, param, query } from "express-validator";

import Banner from "../../models/Banner";

export class BannerValidators{


    static create(){

        return  [ 
                    body('title', 'title Is Required'),
                    body('type', 'type Is Required')
    
                ];
        
    }

    static banner() {
        return [param('id').custom((id, {req}) => {
            return Banner.findOne({_id: id}, {__v: 0}).then((banner) => {
                if (banner) {
                    req.banner = banner;
                    return true;
                } else {
                    throw new Error('Banner Does Not Exist');
                }
            })
        })]
    }

    static type() {
        return [param('type').custom((type, {req}) => {
            return Banner.find({type:type, status:true}, {__v: 0}).then((banner) => {
                if (banner) {
                    req.banner = banner;
                    return true;
                } else {
                    throw new Error('Banner Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Banner.findOne({_id: id}, {__v: 0}).then((banner) => {
                if (banner) {
                    req.banner = banner;
                    return true;
                } else {
                    throw new Error('Banner Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Banner.findOne({_id: id}, {__v: 0}).then((banner) => {
                if (banner) {
                    req.banner = banner;
                    return true;
                } else {
                    throw new Error('Banner Does Not Exist');
                }
            })
        })]
    }

    static notification(){

        return  [ 
                    body('notification_title', 'notification_title Is Required').isString(),
                    body('notification_body', 'notification_body Is Required').isString(),
                ];
        
    }


}