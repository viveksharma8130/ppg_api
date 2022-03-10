import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const FilterSchema = new mongoose.Schema({
    title                    : {type: String, required: true},
    sequence                 : {type: Number, required: false, default:1},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

FilterSchema.set('toObject', { virtuals: true });
FilterSchema.set('toJSON', { virtuals: true });

export default model('filters', FilterSchema);

 