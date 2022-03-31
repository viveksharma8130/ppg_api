"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const OrderPujaSchema = new mongoose.Schema({
    order_id: { type: String, required: false },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    puja_id: { type: mongoose.Types.ObjectId, ref: 'pujas', required: true },
    package_id: { type: mongoose.Types.ObjectId, ref: 'puja_packages', required: false },
    puja_amount: { type: Number, required: true },
    samagri_status: { type: Boolean, required: false, default: false },
    samagri_amount: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },
    puja_data: { type: String, required: true },
    payment_id: { type: String, required: true },
    payment_data: { type: String, required: true },
    puja_date: { type: Date, required: true },
    contact_name: { type: String, required: true },
    contact_address: { type: String, required: true },
    contact_phone: { type: String, required: true },
    status: { type: String, required: true, enum: ['success', 'processing', 'completed', 'cancelled'] },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
OrderPujaSchema.set('toObject', { virtuals: true });
OrderPujaSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('order_pujas', OrderPujaSchema);
