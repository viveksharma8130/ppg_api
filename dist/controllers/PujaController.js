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
exports.PujaController = void 0;
const Puja_1 = require("../models/Puja");
const Order_1 = require("../models/Order");
const Utils_1 = require("../utils/Utils");
const OrderPuja_1 = require("../models/OrderPuja");
class PujaController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileObject = {};
                if (req.file) {
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var insert = Object.assign(Object.assign({}, fileObject), req.body);
                let Puja_data = yield new Puja_1.default(insert).save();
                res.json({
                    message: 'Puja Save Successfully',
                    data: Puja_data,
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
            yield Puja_1.default.insertMany(excelData);
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
                    Utils_1.Utils.s3Delete(req.puja.image_name);
                    fileObject.image = req.file.location;
                    fileObject.image_name = req.file.key;
                }
                var update = Object.assign(Object.assign({}, fileObject), req.body);
                const puja = yield Puja_1.default.findOneAndUpdate({ _id: req.puja._id }, update, { new: true, useFindAndModify: false });
                res.send(puja);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const puja = req.puja;
            try {
                if (req.puja.image) {
                    Utils_1.Utils.s3Delete(req.puja.image_name);
                }
                yield puja.remove();
                res.json({
                    message: 'Success ! Puja Deleted Successfully',
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static Puja(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var puja = req.puja;
            let myData = puja.toObject();
            // order status
            myData['order_status'] = false;
            if (req.user) {
                let order_data = yield Order_1.default.find({
                    user: req.user.user_id,
                    item: 'pujas',
                    item_id: myData['_id'],
                    to_date: { $gte: new Date }
                });
                myData['order_data'] = order_data;
                let order_status = yield Order_1.default.countDocuments({
                    user: req.user.user_id,
                    item: 'pujas',
                    item_id: myData['_id'],
                    to_date: { $gte: new Date }
                });
                if (order_status > 0) {
                    myData['order_status'] = true;
                }
            }
            const data = {
                message: 'Success',
                data: myData
            };
            res.json(data);
        });
    }
    static allPuja(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const puja = yield Puja_1.default.find({ status: true }, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'packages' });
                let Puja_array = [];
                for (let data of puja) {
                    let myData = data.toObject();
                    // order status
                    myData['order_status'] = false;
                    if (req.user) {
                        let order_data = yield Order_1.default.find({
                            user: req.user.user_id,
                            item: 'Pujas',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        myData['order_data'] = order_data;
                        let order_status = yield Order_1.default.countDocuments({
                            user: req.user.user_id,
                            item: 'Pujas',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        if (order_status > 0) {
                            myData['order_status'] = true;
                        }
                    }
                    Puja_array.push(myData);
                }
                const data = {
                    message: 'Success',
                    data: Puja_array
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allHomePuja(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const puja = yield Puja_1.default.find({ status: true, ishome: true }, { __v: 0 }).sort({ sequence: 1 }).populate({ path: 'packages' });
                let Puja_array = [];
                for (let data of puja) {
                    let myData = data.toObject();
                    // order status
                    myData['order_status'] = false;
                    if (req.user) {
                        let order_data = yield Order_1.default.find({
                            user: req.user.user_id,
                            item: 'Pujas',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        myData['order_data'] = order_data;
                        let order_status = yield Order_1.default.countDocuments({
                            user: req.user.user_id,
                            item: 'Pujas',
                            item_id: myData['_id'],
                            to_date: { $gte: new Date }
                        });
                        if (order_status > 0) {
                            myData['order_status'] = true;
                        }
                    }
                    Puja_array.push(myData);
                }
                const data = {
                    message: 'Success',
                    data: Puja_array
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminPuja(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const puja = yield Puja_1.default.find().sort({ sequence: 1 }).populate({ path: 'packages' });
                const data = {
                    message: 'Success',
                    data: puja
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static orderCreate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // order create
                const data = Object.assign(Object.assign({}, req.body), { user: req.user.user_id });
                let order = yield new OrderPuja_1.default(data).save();
                // wallet transaction create for order
                // const transaction_data = {
                //     user:req.user.user_id,
                //     channel:'order',
                //     transaction_mode:'debit',
                //     amount:req.body.amount,
                //     transaction_id:req.body.payment_id,
                //     item_object:req.body.puja_data,
                //     transaction_obj:req.body.payment_data
                // };
                // let walletTransaction:any = await new WalletTransaction(transaction_data).save();
                // user wallet update
                //const user_wallet = await User.findOneAndUpdate({_id: req.user.user_id}, { $inc: { wallet: -req.body.amount} }, {new: true, useFindAndModify: false});
                res.json({
                    message: 'Order Save Successfully',
                    data: order,
                    //walletTransaction:walletTransaction,
                    //user_wallet:user_wallet,
                    status_code: 200
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const puja = yield OrderPuja_1.default.find({ user: req.user.user_id }).sort({ created_at: -1 }).populate({ path: 'puja_id' });
                const data = {
                    message: 'Success',
                    data: puja
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static allAdminOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const puja = yield OrderPuja_1.default.find({}).sort({ created_at: -1 }).populate({ path: 'puja_id' });
                const data = {
                    message: 'Success',
                    data: puja
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PujaController = PujaController;
