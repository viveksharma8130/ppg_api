import * as moment from 'moment-timezone';
import * as multer from "multer";
export declare class Utils {
    firebaseMulter: multer.Multer;
    excelMulter: multer.Multer;
    s3Multer: multer.Multer;
    MAX_TOKEN_TIME: number;
    indianTimeZone: moment.Moment;
    static indianTimeZone(): moment.Moment;
    static s3Delete(key: any): void;
    static pushNotification(registrationToken: any, message_notification: any): Promise<void>;
    static importExcelData2MongoDB(filePath: any): Promise<any[]>;
    static generateVerificationToken(size?: number): number;
    static encryptPassword(password: string): Promise<any>;
    static comparePassword(password: {
        plainPassword: string;
        encryptedPassword: string;
    }): Promise<any>;
}
