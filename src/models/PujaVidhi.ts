import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const PujaVidhiSchema = new mongoose.Schema({
    name                     : {type: String, required: true},
    description              : {type: String, required: false},
    short_description        : {type: String, required: false},
    path                     : {type: String, required: false},
    path_name                : {type: String, required: false},
    free                     : {type: String, required: true, enum: ['yes','no'], default:'no'},
    price                    : {type: Number, required: false},
    validity                 : {type: Number, required: true},
    sequence                 : {type: Number, required: false, default:1},
    ishome                   : {type: Boolean, required: true, default: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

PujaVidhiSchema.set('toObject', { virtuals: true });
PujaVidhiSchema.set('toJSON', { virtuals: true });

export default model('pujavidhis', PujaVidhiSchema);

