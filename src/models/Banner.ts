import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const BannerSchema = new mongoose.Schema({
    type                     : {type: String, required: true, enum:['homepage','pujas','products'], default:'homepage'},
    title                    : {type: String, required: false},
    image                    : {type: String, required: false},
    image_name               : {type: String, required: false},
    url                      : {type: String, required: false},
    sequence                 : {type: Number, required: false, default:1},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

BannerSchema.set('toObject', { virtuals: true });
BannerSchema.set('toJSON', { virtuals: true });

export default model('banners', BannerSchema);

