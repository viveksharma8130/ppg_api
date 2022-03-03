import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const ProductCategorySchema = new mongoose.Schema({
    name                     : {type: String, required: true},
    description              : {type: String, required: false},
    short_description        : {type: String, required: false},
    image                    : {type: String, required: false},
    image_name               : {type: String, required: false},
    sequence                 : {type: Number, required: false, default:1},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

ProductCategorySchema.set('toObject', { virtuals: true });
ProductCategorySchema.set('toJSON', { virtuals: true });

export default model('product_categories', ProductCategorySchema);

