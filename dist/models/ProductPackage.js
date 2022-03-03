"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const PackageSchema = new mongoose.Schema({
    item_id: { type: mongoose.Types.ObjectId, refPath: 'item', required: true },
    item: { type: String, enum: ['courses', 'test_series', 'notes', 'books', 'classes'], required: true },
    validity: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
PackageSchema.set('toObject', { virtuals: true });
PackageSchema.set('toJSON', { virtuals: true });
exports.default = (0, mongoose_1.model)('packages', PackageSchema);
