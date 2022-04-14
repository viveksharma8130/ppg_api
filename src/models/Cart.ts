import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const CartSchema = new mongoose.Schema({
    user                : {type: mongoose.Types.ObjectId, ref: 'users', required: true},
    product             : {type: mongoose.Types.ObjectId, ref: 'products', required: true},
    variant_data        : {type: String, required: false},
    amount              : {type: Number, required: false},
    quantity            : {type: Number, required: false, default:1},
    total_amount        : {type: Number, required: false},
    status              : {type: Boolean, required: false, default:0},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

CartSchema.set('toObject', { virtuals: true });
CartSchema.set('toJSON', { virtuals: true });

export default model('carts', CartSchema);

