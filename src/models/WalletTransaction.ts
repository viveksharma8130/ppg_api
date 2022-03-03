import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const WalletTransactionSchema = new mongoose.Schema({
    user                     : {type: mongoose.Types.ObjectId, ref: 'users', required: false},
    channel                  : {type: String, required: true, enum:['reward','deposit','order']},
    transaction_mode         : {type: String, required: true, enum:['credit','debit']},
    amount                   : {type: Number, required: true},
    transaction_id           : {type: String, required: true},
    item_object              : {type: String, required: false},
    transaction_obj          : {type: String, required: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

WalletTransactionSchema.set('toObject', { virtuals: true });
WalletTransactionSchema.set('toJSON', { virtuals: true });

export default model('wallet_transactions', WalletTransactionSchema);

