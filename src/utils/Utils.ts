import * as moment from 'moment-timezone';
import * as Bcrypt from 'bcrypt';
import * as multer from "multer";

import admin from "./firebase/firebaseConfig";

import * as aws from "aws-sdk";
import * as multerS3 from "multer-s3";
import {SpaceKeys} from "./digitalOcean/SpaceKeys";

import excelToJson = require("convert-excel-to-json");
import * as fs from 'fs';

// excel upload
const excelStorageOptions=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/excel')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(SpaceKeys.endpoint);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: SpaceKeys.accessKeyId,
    secretAccessKey: SpaceKeys.secretAccessKey
});

// push notification options
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

export class Utils{

    // upload file to firebase storage
    // public Upload=bucket.upload('');
    public firebaseMulter = multer({
        storage: multer.memoryStorage()
    });

    // Excel
    public excelMulter = multer({storage:excelStorageOptions});

    // s3 save file
    public s3Multer = multer({
        //limits: {fileSize: 1000000, files:3},
        storage: multerS3({
          s3: s3,
          bucket: SpaceKeys.bucketName,
          acl: 'public-read',
          metadata: function (req, file, cb) {
            cb(null, {fieldName: Date.now()+file.fieldname});
          },
          key: function (request, file, cb) {
            // console.log(file);
            cb(null, Date.now()+file.originalname);
          }
        })
      });   // .array('upload', 1);   (instead of route can also use here)

    // OTP VALIDATE TIME 
    public MAX_TOKEN_TIME=60000; // In MilliSeconds

    // INDIAN TIMEZONE FOR ALL SCHEMAS
    public indianTimeZone = moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');

    static indianTimeZone(){
        return moment.tz(Date.now(), "Asia/Kolkata").add(5, 'hours').add(30, 'minute');//.format('YYYY-MM-DD hh:mm:ss')
    }

    // s3 delete file
    static s3Delete(key){
        var params = { Bucket: SpaceKeys.bucketName, Key: key };
        s3.deleteObject(params, function(err, data) {
            if (err) {
                return false; // error : console.log(err, err.stack); 
            } else { 
                return true;  // success : deleted
            }     
        });
    }

    // push notification
    static async pushNotification(registrationToken, message_notification){
        await admin.messaging().sendToDevice(registrationToken, message_notification, notification_options).then( response => {
           // console.log("RES: "+response);
            return response;
        }).catch( error => {
           // console.log("ERR: "+error);
            return error;
        });
    }

    // IMPORT EXCEL TO MONGODB
    static async importExcelData2MongoDB(filePath){
        const excelData = await excelToJson({
            sourceFile: filePath,
            sheets:[{
                name: 'Sheet1',
                header:{
                   rows: 1
                },
                columnToKey: {
                    '*': '{{columnHeader}}'
                }
            }]
        });
        await fs.unlinkSync(filePath);
        return excelData.Sheet1;
    }

    // GENERATE OTP
    static generateVerificationToken(size: number=4){
        let digits='0123456789';
        let otp='';
        for(let i=0;i<size;i++){
            otp+=digits[Math.floor(Math.random()*10)];
        }
        return parseInt(otp);
    }

    // Encrypt Password
    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        })
    }

    // Compare Password
    static async comparePassword(password: { plainPassword: string, encryptedPassword: string }): Promise<any> {
        return new Promise(((resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    reject(new Error('User Password Does not Match'));
                } else {
                    resolve(true);
                }
            }))
        }))
    }

}