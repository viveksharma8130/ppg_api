"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const userSchema = new mongoose.Schema({
    user_code: { type: String, required: true },
    //category                 : {type: mongoose.Types.ObjectId, ref: 'categorys', required: false},
    //education                : [{type: mongoose.Types.ObjectId, ref: 'educations', required: false}],
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: false, enum: ['male', 'female', 'other'], default: 'male' },
    dob: { type: String, required: false },
    profile_pic: { type: String, required: false },
    profile_pic_name: { type: String, required: false },
    pincode: { type: String, required: false },
    verified_profile: { type: Boolean, required: true, default: false },
    wallet: { type: Number, required: true, default: 0 },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('users', userSchema);
