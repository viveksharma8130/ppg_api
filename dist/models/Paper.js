"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const PaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    paper: { type: String, required: true },
    content: { type: String, required: true },
    sequence: { type: Number, required: false, default: 1 },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
PaperSchema.set('toObject', { virtuals: true });
PaperSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('papers', PaperSchema);
