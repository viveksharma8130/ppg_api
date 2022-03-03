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
exports.PujaVidhiController = void 0;
const PujaVidhi_1 = require("../models/PujaVidhi");
const Utils_1 = require("../utils/Utils");
class PujaVidhiController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.path = req.file.location;
                    fileObject.path_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let pujaVidhi = yield new PujaVidhi_1.default(insert).save();
                res.json({
                    message: 'PujaVidhi Save Successfully',
                    data: pujaVidhi,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static excel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const excelData = yield Utils_1.Utils.importExcelData2MongoDB(req.file.path);
            yield PujaVidhi_1.default.insertMany(excelData);
            res.json({
                message: 'File uploaded/import successfully!',
                file_name: req.file,
                status_code: 200
            });
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    Utils_1.Utils.s3Delete(req.PujaVidhi.path_name);
                    fileObject.path = req.file.location;
                    fileObject.path_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const pujaVidhi = yield PujaVidhi_1.default.findOneAndUpdate({ _id: req.PujaVidhi._id }, update, { new: true, useFindAndModify: false });
                res.send(pujaVidhi);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const pujaVidhi = req.pujaVidhi;
            try {
                if (req.pujaVidhi.path) {
                    Utils_1.Utils.s3Delete(req.pujaVidhi.path_name);
                }
                yield pujaVidhi.remove();
                res.json({
                    message: 'Success ! PujaVidhi Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static PujaVidhi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const pujaVidhi = req.pujaVidhi;
            const data = {
                message: 'Success',
                data: pujaVidhi
            };
            res.json(data);
        });
    }
    static allPujaVidhi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pujaVidhi = yield PujaVidhi_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: pujaVidhi
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allHomePujaVidhi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pujaVidhi = yield PujaVidhi_1.default.find({ status: true, ishome: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: pujaVidhi
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminPujaVidhi(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pujaVidhi = yield PujaVidhi_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: pujaVidhi
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PujaVidhiController = PujaVidhiController;
