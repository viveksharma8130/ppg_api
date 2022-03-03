import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Utils } from '../utils/Utils';

const EventSchema = new mongoose.Schema({
    event                    : {type: String, required: true},
    sequence                 : {type: Number, required: false, default:1},
    status                   : {type: Boolean, required: true, default: true},
    created_at               : {type: Date, required: true, default: Utils.indianTimeZone},
    updated_at               : {type: Date, required: true, default: Utils.indianTimeZone},
},{ id : false });

EventSchema.set('toObject', { virtuals: true });
EventSchema.set('toJSON', { virtuals: true });

export default model('events', EventSchema);

