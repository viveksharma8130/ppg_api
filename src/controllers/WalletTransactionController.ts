import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import WalletTransaction from "../models/WalletTransaction";
import { Utils } from "../utils/Utils";

export class WalletTransactionController {

    static async signup(req, res, next){
        const phone = req.body.phone;
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hash = await Utils.encryptPassword(password);

        try {
            
            const data = {
                email: email,
                password: hash,
                name: name,
                phone: phone,
                created_at: new Utils().indianTimeZone,
                updated_at: new Utils().indianTimeZone
            };
            let walletTransaction = await new WalletTransaction(data).save();
            if(walletTransaction){
                const para={
                    WalletTransaction_id: walletTransaction._id,
                    email: email
                };
    
                const token = Jwt.sign(para, getEnvironmentVariables().jwt_secret, {expiresIn:'120d'});
                const data = {
                    message :'Success',
                    token:token,
                    data:WalletTransaction
                };
                res.json(data);
            }else{
                throw new Error('Something Went Wrong');
            }
        } catch (e) {
            next(e);
        }
        
    }

    static async login(req, res, next) {
        const password = req.query.password;
        const WalletTransaction = req.WalletTransaction;
        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptedPassword: WalletTransaction.password
            });
            const token = Jwt.sign({email: WalletTransaction.email, WalletTransaction_id: WalletTransaction._id},
                getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});
            const data = {token: token, data: WalletTransaction};
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    static async update(req, res, next) {
        const WalletTransactionId = req.WalletTransaction.WalletTransaction_id;

        let fileObject:any = {};
        if(req.files.profile_pic){
            const profile_picUrl:any = req.files.profile_pic[0].path.replace(/\\/g, "/");
            fileObject.profile_pic=profile_picUrl;
        }

        var update = {...{name:req.body.name}, ...fileObject, updated_at: new Date()}; 

        //res.send(req.body);
        try {
            const walletTransaction = await WalletTransaction.findOneAndUpdate({_id: WalletTransactionId}, update, {new: true, useFindAndModify: false});
            res.send(walletTransaction);
        } catch (e) {
            next(e);
        }

    }

    static async data(req, res, next){
        var WalletTransactionId= req.WalletTransaction.WalletTransaction_id;

        try {
            var walletTransaction = await WalletTransaction.findById({_id:WalletTransactionId}, {__v: 0});

            const data = {
                message : 'Success',
                walletTransaction:walletTransaction
            };

            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async all(req, res, next){
        try {
            const walletTransaction = await WalletTransaction.find({});
            const data = {
                message : 'Success !',
                walletTransaction:walletTransaction
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }


} 