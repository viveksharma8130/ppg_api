"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const OrderProductSchema = new mongoose.Schema({
    order: { type: mongoose.Types.ObjectId, ref: 'orders', required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
    variant_data: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    total_amount: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
OrderProductSchema.set('toObject', { virtuals: true });
OrderProductSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('order_products', OrderProductSchema);
