import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const OrderSchema = new mongoose.Schema({
    order_id            : {type: String, required: false},
    user                : {type: mongoose.Types.ObjectId, ref: 'users', required: true},
    amount              : {type: Number, required: true},
    payment_id          : {type: String, required: true},
    payment_data        : {type: String, required: true},
    contact_name        : {type: String, required: true},
    contact_address     : {type: String, required: true},
    contact_phone       : {type: String, required: true},
    product_data        : {type: String, required: true},
    status              : {type: String, required: true, enum: ['success','order_dispatched','order_delivered']},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });

OrderSchema.virtual('products',{
    ref: 'order_products', 
    localField: '_id',
    foreignField: 'order_id',
    count: false,
});

export default model('orders', OrderSchema);

