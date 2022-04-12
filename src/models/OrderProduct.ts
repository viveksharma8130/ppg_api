import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const OrderProductSchema = new mongoose.Schema({
    order_id            : {type: mongoose.Types.ObjectId, ref: 'orders', required: true},
    user                : {type: mongoose.Types.ObjectId, ref: 'users', required: true},
    product             : {type: mongoose.Types.ObjectId, ref: 'products', required: true},
    product_variant     : {type: mongoose.Types.ObjectId, ref: 'product_variants', required: false},
    variant_data        : {type: String, required: true},
    amount              : {type: Number, required: true},
    quantity            : {type: Number, required: true, default:1},
    total_amount        : {type: Number, required: true},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

OrderProductSchema.set('toObject', { virtuals: true });
OrderProductSchema.set('toJSON', { virtuals: true });

export default model('order_products', OrderProductSchema);

