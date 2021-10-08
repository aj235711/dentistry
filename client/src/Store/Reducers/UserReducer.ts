import * as actionTypes from '../Actions/UserActions/types';

export type IState = {
    _id: string;
    name: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    otpHash?: string;
}

const initialState: IState = {
    _id: '',
    name: '',
    email: '',
    password: '',
    otpHash: '',
    isLoggedIn: false
};

const reducer = (
  state = initialState,
  action: actionTypes.UserDispatchTypes,
): IState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        name: action.payload.name,
        email:  action.payload.email,
        password:  action.payload.password,
        _id:  action.payload._id,
        isLoggedIn: true
      };
    case 'LOGOUT':
      return initialState;
    case 'SET_OTP_HASH':
      return {
        ...state,
        otpHash: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
