"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const OrderSchema = new mongoose.Schema({
    order_id: { type: String, required: false },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    amount: { type: Number, required: true },
    payment_id: { type: String, required: true },
    payment_data: { type: String, required: true },
    contact_name: { type: String, required: true },
    contact_address: { type: String, required: true },
    contact_phone: { type: String, required: true },
    product_data: { type: String, required: false },
    status: { type: String, required: true, enum: ['success', 'order_dispatched', 'order_delivered'] },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.virtual('products', {
    ref: 'order_products',
    localField: '_id',
    foreignField: 'order_id',
    count: false,
});
exports.default = mongoose_1.model('orders', OrderSchema);
