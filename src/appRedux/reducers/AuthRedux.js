import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signinUser: ["user", "history"],
  signinUserSuccess: ["payload"],
  showAuthMessage: ["message"],
  hideMessage: null,
  userSignOut: ['message'],
  userSignOutSuccess: ["user"],
  showAuthLoader: ['show'], // ga kepakai
  setAttempRemaining: ['remaining_attempt'],
  //
  //Forgot Password
  authForgotPasswordRequest: ['data', 'cb'],
  authForgotPasswordSuccess: ['payload'],
  authForgotPasswordFailure: null,

  //Reset Password
  authResetPasswordRequest: ['data', 'cb'],
  authResetPasswordSuccess: ['payload'],
  authResetPasswordFailure: null,

  //change
  authChangePasswordRequest: ['data', 'cb'],
  authChangePasswordSuccess: ['payload'],
  authChangePasswordFailure: null,
  


  
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  loader: false,
  alertMessage: "",
  showMessage: false,
  initURL: "",
  authUser: localStorage.getItem("user_credent") ? JSON.parse(localStorage.getItem("user_credent")) : null,

  data: null,
  payload: null,
  error: null,
  remaining_attempt: -1
});

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getData: (state) => state.data,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const signinuser = (state, { user }) =>
  state.merge({ loader: true, user });

// successful api lookup
export const signinusersuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ loader: false, authUser: payload, error: null, remaining_attempt: -1 });
};

export const usersignoutsuccess = (state) => {
  return state.merge({
    authUser: null,
    initURL: "/",
    loader: false,
  });
};

export const message = (state, action) => {
  const { message } = action;
  return state.merge({
    alertMessage: message,
    // alertMessage: "User ID atau Password tidak salah",
    showMessage: true,
    loader: false,
  });
};

export const hidemessage = (state, action) => {
  return state.merge({
    alertMessage: "",
    showMessage: false,
    loader: false,
  });
};

export const showloader = (state, action) => {
  const {show} = action
  return state.merge({ 
    loader: show
  });
};

// Something went wrong somewhere.
export const failure = (state) => state.merge({ fetching: false, error: true });

export const fprprequest = (state, action) => {
  const {data} = action
  return state.merge({ loader: true, data });
};

export const fprpsuccess = (state, action) => {
  const {payload} = action
  return state.merge({ loader: false, payload, error: false });
};

export const fprpfailure = (state) => { 
  return state.merge({ loader: false, error: true });
}; 
 
export const setattemp = (state, action) => {  
  const {remaining_attempt} = action
  return state.merge({ remaining_attempt });
}; 

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN_USER]: signinuser,
  [Types.SIGNIN_USER_SUCCESS]: signinusersuccess,
  [Types.SHOW_AUTH_MESSAGE]: message,
  [Types.USER_SIGN_OUT]: usersignoutsuccess,
  [Types.SHOW_AUTH_LOADER]: showloader,
  //FORGOT PASSWORD
  [Types.AUTH_FORGOT_PASSWORD_REQUEST]: fprprequest,
  [Types.AUTH_FORGOT_PASSWORD_SUCCESS]: fprpsuccess,
  [Types.AUTH_FORGOT_PASSWORD_FAILURE]: fprpfailure,
  //RESET PASSWORD  
  [Types.AUTH_RESET_PASSWORD_REQUEST]: fprprequest,
  [Types.AUTH_RESET_PASSWORD_SUCCESS]: fprpsuccess,
  [Types.AUTH_RESET_PASSWORD_FAILURE]: fprpfailure,

  [Types.AUTH_CHANGE_PASSWORD_REQUEST]: fprprequest,
  [Types.AUTH_CHANGE_PASSWORD_SUCCESS]: fprpsuccess,
  [Types.AUTH_CHANGE_PASSWORD_FAILURE]: fprpfailure,

  [Types.SET_ATTEMP_REMAINING]: setattemp,
   
});
