"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Utils_1 = require("../utils/Utils");
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: false },
    short_description: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: mongoose.Types.ObjectId, ref: 'categorys', required: false },
    image: { type: String, required: false },
    image_name: { type: String, required: false },
    mrp: { type: Number, required: false },
    price: { type: String, required: false },
    type: { type: String, required: false, enum: ['single', 'multiple'], default: 'single' },
    variant: { type: String, required: false },
    material: { type: String, required: false },
    design: { type: String, required: false },
    brand: { type: String, required: false },
    sequence: { type: Number, required: false, default: 1 },
    ishome: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
    updated_at: { type: Date, required: true, default: Utils_1.Utils.indianTimeZone },
}, { id: false });
ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.virtual('variants', {
    ref: 'product_variants',
    localField: '_id',
    foreignField: 'product_id'
});
exports.default = mongoose_1.model('products', ProductSchema);
//  var variant =[];
//  var variant =[{id:'1', mrp:'200', price:'150', size:'M', material:'Cotton', Colour:'Brown'}];
