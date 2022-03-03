"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const PujaVidhiSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    short_description: { type: String, required: false },
    path: { type: String, required: false },
    path_name: { type: String, required: false },
    free: { type: String, required: true, enum: ['yes', 'no'], default: 'no' },
    price: { type: Number, required: false },
    validity: { type: Number, required: true },
    sequence: { type: Number, required: false, default: 1 },
    ishome: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
PujaVidhiSchema.set('toObject', { virtuals: true });
PujaVidhiSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('pujavidhis', PujaVidhiSchema);
