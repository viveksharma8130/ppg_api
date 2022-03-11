import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const OrderSchema = new mongoose.Schema({
    order_id            : {type: String, required: false},
    item_id             : {type: mongoose.Types.ObjectId, refPath: 'item', required: true},
    item                : {type: String, enum: ['pujas','products'], required: true},
    user                : {type: mongoose.Types.ObjectId, ref: 'users', required: true},
    amount              : {type: Number, required: true},
    puja_date           : {type: Date, required: false},
    samagri_status      : {type: Boolean, required: false, default: false},
    payment_id          : {type: String, required: true},
    payment_data        : {type: String, required: true},
    item_data           : {type: String, required: true},
    item_variant_data   : {type: String, required: false},
    contact_name        : {type: String, required: true},
    contact_address     : {type: String, required: true},
    contact_phone       : {type: String, required: true},
    status              : {type: String, required: true, enum: ['success','order_dispatched','order_delivered']},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });

export default model('orders', OrderSchema);

