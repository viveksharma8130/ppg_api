import Event from "../models/Event";

export class EventController {

    static async create(req, res, next){  

        const event = req.body.event;

        try {
            const data ={
                event: event
            }

            let Event_data:any = await new Event(data).save();
            res.json({
                message:'Event Save Successfully',
                data:Event_data,
                status_code:200
            });

        } catch (e) {
            next(e)
        }
        
   
    }

    static async update(req, res, next) {
        const EventId = req.Event._id;
        try {
            const event = await Event.findOneAndUpdate({_id: EventId}, req.body, {new: true, useFindAndModify: false});
            res.send(event);
        } catch (e) {
            next(e);
        }

    }

    static async Event(req, res, next){
        const event = req.event;
        const data = {
            message : 'Success',
            data:event
        };
        res.json(data);
    }

    static async allEvent(req, res, next){

        try {
            const event = await Event.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:event
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allAdminEvent(req, res, next){

        try {
            const event = await Event.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:event
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async delete(req, res, next) {
        const event = req.event;
        try {
            await event.remove();
            res.json({
                message:'Success ! Event Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

} 