export declare class RazorpayValidators {
    static order(): import("express-validator").ValidationChain[];
    static capture(): (import("express-validator").ValidationChain | ((options?: import("express-validator/src/options").IsNumericOptions) => import("express-validator").ValidationChain))[];
    static fetch(): import("express-validator").ValidationChain[];
}
