import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const PackageSchema = new mongoose.Schema({
    item_id             : {type: mongoose.Types.ObjectId, refPath: 'item', required: true},
    item                : {type: String, enum: ['courses','test_series','notes','books','classes'], required: true},
    validity            : {type: String, required: true},
    price               : {type: String, required: true},
    status              : {type: Boolean, required: true, default: true},
    created_at          : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at          : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

PackageSchema.set('toObject', { virtuals: true });
PackageSchema.set('toJSON', { virtuals: true });

export default model('packages', PackageSchema);

