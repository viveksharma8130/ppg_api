import { body, param, query } from "express-validator";

import Stotra from "../../models/Stotra";

export class StotraValidators{

    static create(){

        return  [ 
                    body('name', 'name Is Required'),
                    body('free', 'free Is Required'),
                    body('price', 'price Is Required'),
                    body('discounted_price', 'discounted_price Is Required'),
                    body('author', 'author Is Required'),
                    body('validity', 'validity Is Required').isNumeric(),
                ];
        
    }

    static Stotra() {
        return [param('id').custom((id, {req}) => {
            return Stotra.findOne({_id: id}, {__v: 0}).then((stotra) => {
                if (stotra) {
                    req.stotra = stotra;
                    return true;
                } else {
                    throw new Error('Stotra Does Not Exist');
                }
            })
        })]
    }

    static StotraSubject() {
        return [param('id').custom((id, {req}) => {
            return Stotra.find({subject: id}, {__v: 0}).then((stotra) => {
                if (stotra) {
                    req.stotra = stotra;
                    return true;
                } else {
                    throw new Error('subject Does Not Exist');
                }
            })
        })]
    }

    static StotraCourse() {
        return [param('id').custom((id, {req}) => {
            return Stotra.find({course: id}, {__v: 0}).then((stotra) => {
                if (stotra) {
                    req.stotra = stotra;
                    return true;
                } else {
                    throw new Error('course Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Stotra.findOne({_id: id}, {__v: 0}).then((stotra) => {
                if (stotra) {
                    req.stotra = stotra;
                    return true;
                } else {
                    throw new Error('Stotra Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Stotra.findOne({_id: id}, {__v: 0}).then((stotra) => {
                if (stotra) {
                    req.stotra = stotra;
                    return true;
                } else {
                    throw new Error('Stotra Does Not Exist');
                }
            })
        })]
    }


}