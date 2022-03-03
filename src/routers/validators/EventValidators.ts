import { body, param, query } from "express-validator";

import Event from "../../models/Event";

export class EventValidators{

    static create(){

        return  [ 
                    body('event', 'event Is Required').custom((event, {req})=>{
                        return  Event.findOne({event:event}).then(event => {
                                    if(event){
                                        throw new Error('Event Already Exist');
                                    }else{
                                        return true;
                                    }
                                })
                    })
    
                ];
        
    }

    static Event() {
        return [param('id').custom((id, {req}) => {
            return Event.findOne({_id: id}, {__v: 0}).then((event) => {
                if (event) {
                    req.event = event;
                    return true;
                } else {
                    throw new Error('Event Does Not Exist');
                }
            })
        })]
    }

    static update() {
        return [param('id').custom((id, {req}) => {
            return Event.findOne({_id: id}, {__v: 0}).then((event) => {
                if (event) {
                    req.event = event;
                    return true;
                } else {
                    throw new Error('Event Does Not Exist');
                }
            })
        })]
    }

    static delete() {
        return [param('id').custom((id, {req}) => {
            return Event.findOne({_id: id}, {__v: 0}).then((event) => {
                if (event) {
                    req.event = event;
                    return true;
                } else {
                    throw new Error('Event Does Not Exist');
                }
            })
        })]
    }


}