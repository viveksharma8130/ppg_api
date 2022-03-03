"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidators = void 0;
const express_validator_1 = require("express-validator");
const Event_1 = require("../../models/Event");
class EventValidators {
    static create() {
        return [
            (0, express_validator_1.body)('event', 'event Is Required').custom((event, { req }) => {
                return Event_1.default.findOne({ event: event }).then(event => {
                    if (event) {
                        throw new Error('Event Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            })
        ];
    }
    static Event() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }, { __v: 0 }).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            })];
    }
    static update() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }, { __v: 0 }).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            })];
    }
    static delete() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Event_1.default.findOne({ _id: id }, { __v: 0 }).then((event) => {
                    if (event) {
                        req.event = event;
                        return true;
                    }
                    else {
                        throw new Error('Event Does Not Exist');
                    }
                });
            })];
    }
}
exports.EventValidators = EventValidators;
