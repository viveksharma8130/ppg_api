import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import User from "../models/User";
import { Utils } from "../utils/Utils";
import * as fs from 'fs';
import UserSession from "../models/UserSession";

export class UserController {

    static async session(req, res, next){  

        const firebase_token = req.body.firebase_token;
        const device_detail = req.body.device_detail;
        const device_id = req.body.device_id;

        if(req.action=='save') {

            try {
                const data ={
                    firebase_token : firebase_token,
                    device_detail : device_detail,
                    device_id: device_id
                }

                let userSession:any = await new UserSession(data).save();
                res.json({
                    message:'Session Saved Successfully',
                    data:userSession
                });
            

            } catch (e) {
                next(e)
            }
        
        } else {
            try {
                req.body.updated_at= new Utils().indianTimeZone;

                const userSession:any = await UserSession.findOneAndUpdate({  
                    device_id: device_id 
                },
                req.body,
                {
                    new :true, 
                    useFindAndModify: false
                });  
    
                //res.send(user); 
                res.json({
                    message:'Session Updated Successfully',
                    data:userSession
                });
            

            } catch (e) {
                next(e)
            }
        }
        
    }

    static async signup(req, res, next){
        const phone = req.body.phone;
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hash = await Utils.encryptPassword(password);

        // Generate Unique UserCode Via User Counts
        const user_count=await User.countDocuments()+1;
        const user_code=Number(user_count+'00000000000').toString(36);

        try {

            const data = {
                email: email,
                password: hash,
                name: name,
                phone: phone,
                user_code: user_code,
                created_at: new Utils().indianTimeZone,
                updated_at: new Utils().indianTimeZone
            };
            console.log(data);

            let user = await new User(data).save();
            if(user){
                const para={
                    user_id: user._id,
                    email: email
                };
    
                const token = Jwt.sign(para, getEnvironmentVariables().jwt_secret, {expiresIn:'120d'});
                const data = {
                    message :'Success',
                    token:token,
                    data:user
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
        const user = req.user;
        try {
            await Utils.comparePassword({
                plainPassword: password,
                encryptedPassword: user.password
            });
            const token = Jwt.sign({email: user.email, user_id: user._id},
                getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});
            const data = {token: token, data: user};
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    
    static async passwordChange(req, res, next) {
        const user_id = req.user.user_id;
        const password = req.body.password;
        const old_password = req.body.old_password;

        const hash = await Utils.encryptPassword(password);
        var update = {...{password:hash}, updated_at: new Utils().indianTimeZone}; 

        try {
            await Utils.comparePassword({
                plainPassword: old_password,
                encryptedPassword: req.user_data.password
            });

            const user = await User.findOneAndUpdate({_id: user_id}, update, {new: true, useFindAndModify: false});
            res.json({
                message:'Password change Successfully',
                data:user,
                status_code:200
            });
        } catch (e) {
            next(e);
        }
 
    }


    static async passwordForgot(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        const hash = await Utils.encryptPassword(password);
        var update = {...{password:hash}, updated_at: new Utils().indianTimeZone}; 

        try {
            const user = await User.findOneAndUpdate({email: email}, update, {new: true, useFindAndModify: false});
            res.json({
                message:'Password update Successfully',
                data:user,
                status_code:200
            });
        } catch (e) {
            next(e);
        }
 
    }

    static async userData(req, res, next){
        var userId= req.user.user_id;

        try {
           var users = await User.findById({_id:userId}, {__v: 0}).populate([
            {   path: "category", select: 'category'},
            {   path: 'education', select: 'education' },
           ]);

            const data = {
                message : 'Success',
                data:users
            };
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async all(req, res, next){

        try {
            const category = await User.find().populate({ path: "education"});
            const data = {
                message : 'Success',
                data:category
            }; 
            res.json(data);
        } catch (e) {
            next(e)
        }
    }

    static async profile(req, res, next) {
        const userId = req.user.user_id;
        const users= await User.findOne({_id:req.user.user_id});
        try {
            let fileObject:any = {};
            if(req.file){
                Utils.s3Delete(users['profile_pic_name']);
                fileObject.profile_pic=req.file.location;
                fileObject.profile_pic_name=req.file.key;
            }
            var update = {...fileObject, ...req.body, ...{verified_profile:true}, updated_at: new Utils().indianTimeZone}; 

            const user = await User.findOneAndUpdate({_id: userId}, update, {new: true, useFindAndModify: false}).populate([
                {   path: "category", select: 'category'},
                {   path: 'education', select: 'education' },
               ]);;
            res.json({
                message:'user update Successfully',
                data:user,
                status_code:200
            });
        } catch (e) {
            next(e);
        }
 
    }

    static async update(req, res, next) {
        const userId = req.user._id;
        try {
            const user = await User.findOneAndUpdate({_id: userId}, req.body, {new: true, useFindAndModify: false});
            res.send(user);
        } catch (e) {
            next(e);
        }

    }

    static async deleteUser(req, res, next) {
        const user = req.user;
        try {
            // await fs.unlink(user['image'], async (err) => {
            //     if (err) throw err;
            // });
            if(req.user.profile_pic){
                Utils.s3Delete(req.user.profile_pic_name);
            }
            await user.remove();
            res.json({
                message:'Success ! User Deleted Successfully',
                status_code: 200
            });
        } catch (e) {
            next(e);
        }
    }


} 