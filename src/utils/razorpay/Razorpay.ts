import * as Razorpay from "razorpay"; // const Razorpay = require('razorpay');
import { RazorKeys } from "./RazorKeys";

export class RazorInstance {

    static razorInstance(){
        return new Razorpay({
                key_id: RazorKeys.razorIdkey,
                key_secret : RazorKeys.razorIdSecret
        });
    }
}