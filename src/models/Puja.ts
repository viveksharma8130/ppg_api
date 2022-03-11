import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const PujaSchema = new mongoose.Schema({
    name                     : {type: String, required: true},
    slug                     : {type: String, required: false},
    description              : {type: String, required: false},
    short_description        : {type: String, required: false},
    image                    : {type: String, required: false},
    image_name               : {type: String, required: false},
    price                    : {type: String, required: false},
    samagri_price            : {type: Number, required: false},
    package_type             : {type: String, required: false, enum:['single','multiple'], default:'single'},
    sequence                 : {type: Number, required: false, default:1},
    ishome                   : {type: Boolean, required: true, default: false},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

PujaSchema.set('toObject', { virtuals: true });
PujaSchema.set('toJSON', { virtuals: true });

PujaSchema.virtual('packages', {   
    ref: 'puja_packages', 
    localField: '_id',
    foreignField: 'puja_id'
});

export default model('pujas', PujaSchema);

