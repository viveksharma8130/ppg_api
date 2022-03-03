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
exports.EventController = void 0;
const Event_1 = require("../models/Event");
class EventController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = req.body.event;
            try {
                const data = {
                    event: event
                };
                let Event_data = yield new Event_1.default(data).save();
                res.json({
                    message: 'Event Save Successfully',
                    data: Event_data,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const EventId = req.Event._id;
            try {
                const event = yield Event_1.default.findOneAndUpdate({ _id: EventId }, req.body, { new: true, useFindAndModify: false });
                res.send(event);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Event(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = req.event;
            const data = {
                message: 'Success',
                data: event
            };
            res.json(data);
        });
    }
    static allEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield Event_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: event
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield Event_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: event
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = req.event;
            try {
                yield event.remove();
                res.json({
                    message: 'Success ! Event Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.EventController = EventController;
