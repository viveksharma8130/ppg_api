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
exports.StotraController = void 0;
const Stotra_1 = require("../models/Stotra");
const Utils_1 = require("../utils/Utils");
class StotraController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let stotra = yield new Stotra_1.default(insert).save();
                res.json({
                    message: 'Stotra Save Successfully',
                    data: stotra,
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
            yield Stotra_1.default.insertMany(excelData);
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
                    Utils_1.Utils.s3Delete(req.Stotra.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const stotra = yield Stotra_1.default.findOneAndUpdate({ _id: req.Stotra._id }, update, { new: true, useFindAndModify: false }).populate([{ path: "course" }, { path: "subject" }]);
                res.send(stotra);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const stotra = req.stotra;
            try {
                if (req.stotra.image) {
                    Utils_1.Utils.s3Delete(req.stotra.image_name);
                }
                yield stotra.remove();
                res.json({
                    message: 'Success ! Stotra Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Stotra(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const stotra = req.stotra;
            const data = {
                message: 'Success',
                data: stotra
            };
            res.json(data);
        });
    }
    static StotraSubject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const stotra = req.stotra;
            const data = {
                message: 'Success',
                data: stotra
            };
            res.json(data);
        });
    }
    static StotraCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const stotra = req.stotra;
            const data = {
                message: 'Success',
                data: stotra
            };
            res.json(data);
        });
    }
    static allStotra(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stotra = yield Stotra_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: stotra
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allHomeStotra(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stotra = yield Stotra_1.default.find({ status: true, ishome: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: stotra
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminStotra(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stotra = yield Stotra_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: stotra
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.StotraController = StotraController;
