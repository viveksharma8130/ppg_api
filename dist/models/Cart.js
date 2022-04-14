"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
    variant_data: { type: String, required: false },
    amount: { type: Number, required: false },
    quantity: { type: Number, required: false, default: 1 },
    total_amount: { type: Number, required: false },
    status: { type: Boolean, required: false, default: 0 },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
CartSchema.set('toObject', { virtuals: true });
CartSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('carts', CartSchema);
