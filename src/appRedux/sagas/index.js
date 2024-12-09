import { takeLatest, all } from "redux-saga/effects";
import API from "../../services/Api";
import ApiSample from "../../services/ApiSample";

/* ------------- Types ------------- */

import { TemplateTypes } from "../reducers/TemplateRedux"; 
import { AuthTypes } from "../reducers/AuthRedux";
import { CommentsTypes } from "../reducers/CommentsRedux";
 
/* ------------- Sagas ------------- */

import { templateRequest } from "./TemplateSagas";  
import {
  signinUser,
  userSignOut,
  authForgotPasswordRequest,
  authResetPasswordRequest,
  authChangePasswordRequest
} from "./AuthSagas";
import { getRequest } from "./CommentsSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();
const apisample = ApiSample.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  // console.log('ROOT sagas JALAN !')
  yield all([
    takeLatest(TemplateTypes.TEMPLATE_REQUEST, templateRequest, api),
    takeLatest(AuthTypes.SIGNIN_USER, signinUser, api),
    takeLatest(AuthTypes.USER_SIGN_OUT, userSignOut, api),
    takeLatest(
      AuthTypes.AUTH_FORGOT_PASSWORD_REQUEST,
      authForgotPasswordRequest,
      api
    ),
    takeLatest(
      AuthTypes.AUTH_RESET_PASSWORD_REQUEST,
      authResetPasswordRequest,
      api
    ),
    takeLatest(
      AuthTypes.AUTH_CHANGE_PASSWORD_REQUEST,
      authChangePasswordRequest,
      api
    ),
     
    //Comment
    takeLatest(CommentsTypes.GET_REQUEST, getRequest, api), 
    
  ]);
}
