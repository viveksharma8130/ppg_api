import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const CourseSchema = new mongoose.Schema({
    name                     : {type: String, required: true},
    description              : {type: String, required: false},
    short_description        : {type: String, required: false},
    image                    : {type: String, required: false},
    image_name               : {type: String, required: false},
    price                    : {type: Number, required: true},
    validity                 : {type: Number, required: true},
    sequence                 : {type: Number, required: false, default:1},
    ishome                   : {type: Boolean, required: true, default: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

CourseSchema.set('toObject', { virtuals: true });
CourseSchema.set('toJSON', { virtuals: true });

export default model('courses', CourseSchema);

