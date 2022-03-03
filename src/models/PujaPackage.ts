import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const PujaPackageSchema = new mongoose.Schema({
    puja_id             : {type: mongoose.Types.ObjectId, ref: 'pujas', required: true},
    title               : {type: String, required: true},
    price               : {type: String, required: true},
    samagri_price       : {type: String, required: false},
    status              : {type: Boolean, required: true, default: true},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

PujaPackageSchema.set('toObject', { virtuals: true });
PujaPackageSchema.set('toJSON', { virtuals: true });

export default model('puja_packages', PujaPackageSchema);

