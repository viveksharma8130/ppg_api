"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: false },
    image: { type: String, required: true },
    description: { type: String, required: true },
    sequence: { type: Number, required: false, default: 1 },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
ArticleSchema.set('toObject', { virtuals: true });
ArticleSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('articles', ArticleSchema);
