import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const ProductVariantSchema = new mongoose.Schema({
    product_id          : {type: mongoose.Types.ObjectId, ref: 'products', required: true},
    colour              : {type: String, required: true},
    image               : {type: String, required: false},
    image_name          : {type: String, required: false},
    size                : {type: String, required: true},
    mrp                 : {type: String, required: true},
    price               : {type: String, required: true},
    status              : {type: Boolean, required: true, default: true},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

ProductVariantSchema.set('toObject', { virtuals: true });
ProductVariantSchema.set('toJSON', { virtuals: true });

export default model('product_variants', ProductVariantSchema);

