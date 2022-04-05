"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const StotraSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    short_description: { type: String, required: false },
    image: { type: String, required: false },
    image_name: { type: String, required: false },
    free: { type: String, required: true, enum: ['yes', 'no'], default: 'no' },
    price: { type: Number, required: true },
    discounted_price: { type: String, required: true },
    author: { type: String, required: true },
    validity: { type: Number, required: true },
    sequence: { type: Number, required: false, default: 1 },
    ishome: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
StotraSchema.set('toObject', { virtuals: true });
StotraSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('stotras', StotraSchema);
