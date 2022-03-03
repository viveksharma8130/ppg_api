import Banner from "../models/Banner";
import admin from "../utils/firebase/firebaseConfig";
import { Utils } from "../utils/Utils";

export class BannerController {

    static async create(req, res, next){  
        try {
            let fileObject:any = {};
            if(req.file){
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var insert = {...fileObject, ...req.body}; 

            let banner:any = await new Banner(insert).save();
            res.json({
                message:'Banner Save Successfully',
                data:banner,
                status_code:200
            });     

        } catch (e) {
            next(e)
        }
    }

    static async excel(req, res, next){  

        const excelData = await Utils.importExcelData2MongoDB(req.file.path);
        await Banner.insertMany(excelData);
        
        res.json({
            message:'File uploaded/import successfully!',
            file_name: req.file,
            status_code:200
        });
    
    }

    static async update(req, res, next) {
        try {
            let fileObject:any = {};
            if(req.file){
                Utils.s3Delete(req.banner.image_name);
                fileObject.image=req.file.location;
                fileObject.image_name=req.file.key;
            }
            var update = {...fileObject, ...req.body}; 

            const banner = await Banner.findOneAndUpdate({_id: req.banner._id}, update, {new: true, useFindAndModify: false});
            res.send(banner);
        } catch (e) {
            next(e);
        }

    }

    static async delete(req, res, next) {
        const banner = req.banner;
        try {
            if(req.banner.image){
                Utils.s3Delete(req.banner.image_name);
            }
            await banner.remove();
            res.json({
                message:'Success ! Banner Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }

    static async banner(req, res, next){
        const banner = req.banner;
        const data = {
            message : 'Success',
            data:banner
        };
        res.json(data);
    }

    static async allBanner(req, res, next){

        try {
            const banner = await Banner.find({status:true}, {__v: 0}).sort({sequence:1});
            const data = {
                message : 'Success',
                data:banner
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async allBannerType(req, res, next){
        const banner = req.banner;
        const data = {
            message : 'Success',
            data:banner
        };
        res.json(data);
    }

    static async allAdminBanner(req, res, next){

        try {
            const banner = await Banner.find().sort({sequence:1});
            const data = {
                message : 'Success',
                data:banner
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async notifications(req, res, next){

        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        const registrationToken = 'fY3Ty-X3QZKy_rFZqH9RyU:APA91bErfLLilvz3aEMWzSSaG-X6cicLSshx4lDoLGg-PSC5JNCoMSaBsgqX_p9BFCFgu4VnWQl8AMO8WswzPELkkOK8nogSDJrvNtrD45sCDZhZZP_AgxUYIt2AtDdiGdk9So1Gj5H2';
        const message_notification = {
            notification: {
                title: req.body.notification_title,
                body: req.body.notification_body,
            }
        };
        
        admin.messaging().sendToDevice(registrationToken, message_notification, notification_options).then( response => {
            res.status(200).json({
                message:'Success ! Notification sent successfully',
                data:response,
                status_code: 200
            });
        }).catch( error => {
            console.log(error);
        });
    }

    static async notification(req, res, next){

        const registrationToken = 'fY3Ty-X3QZKy_rFZqH9RyU:APA91bErfLLilvz3aEMWzSSaG-X6cicLSshx4lDoLGg-PSC5JNCoMSaBsgqX_p9BFCFgu4VnWQl8AMO8WswzPELkkOK8nogSDJrvNtrD45sCDZhZZP_AgxUYIt2AtDdiGdk9So1Gj5H2';
        const message_notification = {
            notification: {
                title: req.body.notification_title,
                body: req.body.notification_body,
            }
        };
        
        const notification_response = await Utils.pushNotification(registrationToken, message_notification);
        res.status(200).json({
            message:'Success ! Notification sent successfully',
            status_code: 200
        });
    }
    
    static async upload(req, res, next) {

        try {

            if(!req.file) {
                res.status(400).send("Error: No files found")
            } else {
                const blob = admin.storage().bucket().file(req.file.originalname)
                
                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: req.file.mimetype
                    }
                });
                
                blobWriter.on('error', (err) => {
                    console.log(err)
                });
                
                blobWriter.on('finish', () => {
                    // Assembling public URL for accessing the file via HTTP
                    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                        admin.storage().bucket().name
                    }/o/${encodeURI(blob.name)}?alt=media`;

                    // Return the file name and its public URL
                    res.status(200).send({ fileName: req.file.originalname, fileLocation: publicUrl });
                });
                
                blobWriter.end(req.file.buffer);
            }

        } catch (error) {
            res.status(400).send(`Error, could not upload file: ${error}`);
            return;
        }
        
    }

} 