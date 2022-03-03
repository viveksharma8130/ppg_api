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
exports.BannerController = void 0;
const Banner_1 = require("../models/Banner");
const firebaseConfig_1 = require("../utils/firebase/firebaseConfig");
const Utils_1 = require("../utils/Utils");
class BannerController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let banner = yield new Banner_1.default(insert).save();
                res.json({
                    message: 'Banner Save Successfully',
                    data: banner,
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
            yield Banner_1.default.insertMany(excelData);
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
                    Utils_1.Utils.s3Delete(req.banner.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const banner = yield Banner_1.default.findOneAndUpdate({ _id: req.banner._id }, update, { new: true, useFindAndModify: false });
                res.send(banner);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const banner = req.banner;
            try {
                if (req.banner.image) {
                    Utils_1.Utils.s3Delete(req.banner.image_name);
                }
                yield banner.remove();
                res.json({
                    message: 'Success ! Banner Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static banner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const banner = req.banner;
            const data = {
                message: 'Success',
                data: banner
            };
            res.json(data);
        });
    }
    static allBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banner = yield Banner_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: banner
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allBannerType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const banner = req.banner;
            const data = {
                message: 'Success',
                data: banner
            };
            res.json(data);
        });
    }
    static allAdminBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banner = yield Banner_1.default.find().sort({ sequence: 1 });
                const data = {
                    message: 'Success',
                    data: banner
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static notifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification_options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
            const registrationToken = 'fY3Ty-X3QZKy_rFZqH9RyU:APA91bErfLLilvz3aEMWzSSaG-X6cicLSshx4lDoLGg-PSC5JNCoMSaBsgqX_p9BFCFgu4VnWQl8AMO8WswzPELkkOK8nogSDJrvNtrD45sCDZhZZP_AgxUYIt2AtDdiGdk9So1Gj5H2';
            const message_notification = {
                notification: {
                    title: req.body.notification_title,
                    body: req.body.notification_body,
                }
            };
            firebaseConfig_1.default.messaging().sendToDevice(registrationToken, message_notification, notification_options).then(response => {
                res.status(200).json({
                    message: 'Success ! Notification sent successfully',
                    data: response,
                    status_code: 200
                });
            }).catch(error => {
                console.log(error);
            });
        });
    }
    static notification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationToken = 'fY3Ty-X3QZKy_rFZqH9RyU:APA91bErfLLilvz3aEMWzSSaG-X6cicLSshx4lDoLGg-PSC5JNCoMSaBsgqX_p9BFCFgu4VnWQl8AMO8WswzPELkkOK8nogSDJrvNtrD45sCDZhZZP_AgxUYIt2AtDdiGdk9So1Gj5H2';
            const message_notification = {
                notification: {
                    title: req.body.notification_title,
                    body: req.body.notification_body,
                }
            };
            const notification_response = yield Utils_1.Utils.pushNotification(registrationToken, message_notification);
            res.status(200).json({
                message: 'Success ! Notification sent successfully',
                status_code: 200
            });
        });
    }
    static upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).send("Error: No files found");
                }
                else {
                    const blob = firebaseConfig_1.default.storage().bucket().file(req.file.originalname);
                    const blobWriter = blob.createWriteStream({
                        metadata: {
                            contentType: req.file.mimetype
                        }
                    });
                    blobWriter.on('error', (err) => {
                        console.log(err);
                    });
                    blobWriter.on('finish', () => {
                        // Assembling public URL for accessing the file via HTTP
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig_1.default.storage().bucket().name}/o/${encodeURI(blob.name)}?alt=media`;
                        // Return the file name and its public URL
                        res.status(200).send({ fileName: req.file.originalname, fileLocation: publicUrl });
                    });
                    blobWriter.end(req.file.buffer);
                }
            }
            catch (error) {
                res.status(400).send(`Error, could not upload file: ${error}`);
                return;
            }
        });
    }
}
exports.BannerController = BannerController;
