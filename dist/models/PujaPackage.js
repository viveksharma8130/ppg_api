"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const PujaPackageSchema = new mongoose.Schema({
    puja_id: { type: mongoose.Types.ObjectId, ref: 'pujas', required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    samagri_price: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
PujaPackageSchema.set('toObject', { virtuals: true });
PujaPackageSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('puja_packages', PujaPackageSchema);
