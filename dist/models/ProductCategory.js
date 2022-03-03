"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const ProductCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    short_description: { type: String, required: false },
    image: { type: String, required: false },
    image_name: { type: String, required: false },
    sequence: { type: Number, required: false, default: 1 },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
ProductCategorySchema.set('toObject', { virtuals: true });
ProductCategorySchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('product_categories', ProductCategorySchema);
