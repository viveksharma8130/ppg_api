export declare class UserController {
    static session(req: any, res: any, next: any): Promise<void>;
    static signup(req: any, res: any, next: any): Promise<void>;
    static login(req: any, res: any, next: any): Promise<void>;
    static passwordChange(req: any, res: any, next: any): Promise<void>;
    static passwordForgot(req: any, res: any, next: any): Promise<void>;
    static userData(req: any, res: any, next: any): Promise<void>;
    static all(req: any, res: any, next: any): Promise<void>;
    static profile(req: any, res: any, next: any): Promise<void>;
    static update(req: any, res: any, next: any): Promise<void>;
    static deleteUser(req: any, res: any, next: any): Promise<void>;
    static cartAll(req: any, res: any, next: any): Promise<void>;
    static wishlistAll(req: any, res: any, next: any): Promise<void>;
    static cartCreate(req: any, res: any, next: any): Promise<void>;
    static cartUpdate(req: any, res: any, next: any): Promise<void>;
    static deleteCart(req: any, res: any, next: any): Promise<void>;
}
