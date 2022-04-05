"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    short_description: { type: String, required: false },
    image: { type: String, required: false },
    image_name: { type: String, required: false },
    price: { type: Number, required: true },
    validity: { type: Number, required: true },
    sequence: { type: Number, required: false, default: 1 },
    ishome: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
CourseSchema.set('toObject', { virtuals: true });
CourseSchema.set('toJSON', { virtuals: true });
exports.default = mongoose_1.model('courses', CourseSchema);
