"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const OrderSchema = new mongoose.Schema({
    item_id: { type: mongoose.Types.ObjectId, refPath: 'item', required: true },
    item: { type: String, enum: ['courses', 'test_series', 'notes', 'books', 'classes'], required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    amount: { type: Number, required: true },
    from_date: { type: Date, required: true },
    to_date: { type: Date, required: true },
    payment_id: { type: String, required: true },
    payment_data: { type: String, required: true },
    item_data: { type: String, required: true },
    address: { type: String, required: false },
    order_reference_id: { type: String, required: false },
    status: { type: String, required: true, enum: ['success', 'payment_received', 'order_dispatched', 'order_delivered'] },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('orders', OrderSchema);
