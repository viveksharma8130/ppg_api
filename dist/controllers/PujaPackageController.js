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
exports.PujaPackageController = void 0;
const PujaPackage_1 = require("../models/PujaPackage");
class PujaPackageController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let packages = yield new PujaPackage_1.default(req.body).save();
                res.json({
                    message: 'PujaPackage Save Successfully',
                    data: packages,
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
            const PujaPackageId = req.packages._id;
            try {
                const packages = yield PujaPackage_1.default.findOneAndUpdate({ _id: PujaPackageId }, req.body, { new: true, useFindAndModify: false });
                res.send(packages);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static PujaPackage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const packages = req.packages;
            const data = {
                message: 'Success',
                data: packages
            };
            res.json(data);
        });
    }
    static allPujaPackage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packages = yield PujaPackage_1.default.find({ status: true }, { __v: 0 });
                const data = {
                    message: 'Success',
                    data: packages
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminPujaPackage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packages = yield PujaPackage_1.default.find();
                const data = {
                    message: 'Success',
                    data: packages
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
            const packages = req.packages;
            try {
                yield packages.remove();
                res.json({
                    message: 'Success ! PujaPackage Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PujaPackageController = PujaPackageController;
