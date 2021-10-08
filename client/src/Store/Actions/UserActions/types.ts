import { IUser } from '../../../interfaces/user';

export interface ISetUser {
  type: 'SET_USER';
  payload: IUser;
}

export interface ILogoutUser {
  type: 'LOGOUT';
}

export interface ISetOtpHash {
  type: 'SET_OTP_HASH';
  payload: string;
}

export type UserDispatchTypes = ISetUser | ILogoutUser | ISetOtpHash;
