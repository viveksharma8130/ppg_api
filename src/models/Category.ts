import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const CategorySchema = new mongoose.Schema({
    category                 : {type: String, required: true},
    slug                     : {type: String, required: false},
    filter                   : [{type: mongoose.Types.ObjectId, ref: 'filters', required: false}],
    sequence                 : {type: Number, required: false, default:1},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

export default model('categorys', CategorySchema);

