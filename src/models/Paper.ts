import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const PaperSchema = new mongoose.Schema({
    title                    : {type: String, required: true},
    year                     : {type: Number, required: true},
    paper                    : {type: String, required: true},
    content                  : {type: String, required: true},
    sequence                 : {type: Number, required: false, default:1},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

PaperSchema.set('toObject', { virtuals: true });
PaperSchema.set('toJSON', { virtuals: true });

export default model('papers', PaperSchema);

