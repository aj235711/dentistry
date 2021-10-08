export interface IUser {
    name: string;
    email: string;
    password: string;
    _id: string;
    isLoggedIn: boolean;
    otpHash?: string;
}