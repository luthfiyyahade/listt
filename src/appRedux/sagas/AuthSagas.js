import { call, put } from "redux-saga/effects";
import AuthActions from "../reducers/AuthRedux";

import LoadingOverlayActions from "../reducers/LoadingOverlayRedux";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Row, Col } from "antd";
import moment from "moment";
// import { auth } from "../../firebase/firebase";
// import { TemplateSelectors } from '../Redux/TemplateRedux'

// const signInUserWithEmailPasswordRequest = async (email, password) =>
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then((authUser) => authUser)
//     .catch((error) => error);

// const signOutRequest = async () =>
//   await auth
//     .signOut()
//     .then((authUser) => authUser)
//     .catch((error) => error);
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export function* signinUser(api, action) {
  const { user, history } = action;
  // console.log("USER TERPASSINFG ???", user);
  const { email, password } = user;

  alert('login sagas not configured')
  const dummyData = {name: 'test'}
  localStorage.setItem("user_credent",JSON.stringify(dummyData))
  yield put(AuthActions.signinUserSuccess(dummyData))

  // try {
  //   const signInUserResponse = yield call(api.authRequest, {
  //     username: email,
  //     password,
  //   });
  //   console.log("signInUserResponse", JSON.stringify(signInUserResponse));
  //   if (signInUserResponse.ok) {
  //     if (signInUserResponse.data.status === "302") {
  //       Modal.error({
  //         centered: true,
  //         icon: <ExclamationCircleFilled />,
  //         okType: "danger",
  //         content: (
  //           <div>
  //             <p>
  //               {signInUserResponse &&
  //               signInUserResponse.data &&
  //               signInUserResponse.data.message
  //                 ? signInUserResponse.data.message
  //                 : "Your password has been expired, must be changed"}
  //             </p>
  //           </div>
  //         ),
  //         title: (
  //           <Row
  //             type="flex"
  //             justify="start"
  //             style={{ alignItems: "center" }}
  //             gutter={[5, 0]}
  //           >
  //             <Col>
  //               <span>Warning !</span>
  //             </Col>
  //           </Row>
  //         ),
  //         onOk() {
  //           const credent = {
  //             ...signInUserResponse.data.result,
  //             accessToken: signInUserResponse.headers["x-auth-token"],
  //           };
  //           const credentWithLoginTime = {
  //             ...credent,
  //             logintime: moment().format("YYYY-MM-DD HH:mm:ss"),
  //           };
  //           localStorage.setItem(
  //             "change_credent",
  //             JSON.stringify(credentWithLoginTime)
  //           );
  //           if (history) history.push("reset-password");
  //         },
  //         onCancel() {},
  //       });
  //       yield put(AuthActions.showAuthLoader(false));
  //       return;
  //     }

  //     const credent = {
  //       ...signInUserResponse.data.result,
  //       accessToken: signInUserResponse.headers["x-auth-token"],
  //     };
  //     if (!credent.accessToken) {
  //       Modal.error({
  //         centered: true,
  //         icon: <ExclamationCircleFilled />,
  //         okType: "danger",
  //         content: (
  //           <div>
  //             <p>{"Login Failed, token not found !"}</p>
  //           </div>
  //         ),
  //         title: (
  //           <Row
  //             type="flex"
  //             justify="start"
  //             style={{ alignItems: "center" }}
  //             gutter={[5, 0]}
  //           >
  //             <Col>
  //               <span>Warning !</span>
  //             </Col>
  //           </Row>
  //         ),
  //         onOk() {},
  //         onCancel() {},
  //       });
  //       yield put(AuthActions.showAuthLoader(false));
  //     }
  //     const credentWithLoginTime = {
  //       ...credent,
  //       logintime: moment().format("YYYY-MM-DD HH:mm:ss"),
  //     };
  //     localStorage.setItem(
  //       "user_credent",
  //       JSON.stringify(credentWithLoginTime)
  //     );
  //     yield put(AuthActions.signinUserSuccess(signInUserResponse.data.message));
  //   } else {
  //     //set attempt disini
  //     console.log("masuk sini ", signInUserResponse);
  //     yield put(
  //       AuthActions.setAttempRemaining(
  //         signInUserResponse.data &&
  //           signInUserResponse.data.result &&
  //           signInUserResponse.data.result.remaining_attempt > -1
  //           ? signInUserResponse.data.result.remaining_attempt
  //           : -1
  //       )
  //     );
  //     yield put(AuthActions.showAuthLoader(false));
  //   }
  // } catch (error) {
  //   yield put(AuthActions.showAuthMessage(error));
  // }
  
}

export function* userSignOut(api, action) {
  const { message } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Logging off ..."));
  try {
    const signOutResponse = yield call(api.logoutRequest);
    console.log("signOutResponse", JSON.stringify(signOutResponse));

    if (message) {
      Modal.error({
        centered: true,
        icon: <ExclamationCircleFilled />,
        okType: "danger",
        content: (
          <div>
            <p>{message}</p>
          </div>
        ),
        title: (
          <Row
            type="flex"
            justify="start"
            style={{ alignItems: "center" }}
            gutter={[5, 0]}
          >
            <Col>
              <span>Warning !</span>
            </Col>
          </Row>
        ),
        onOk() {},
        onCancel() {},
      });
    }
    localStorage.removeItem("user_credent");
    yield put(AuthActions.userSignOutSuccess(""));
    // } else {
    //   yield put(AuthActions.showAuthMessage(signOutUser.message));
    // }
  } catch (error) {
    yield put(AuthActions.showAuthMessage(error));
    yield put(LoadingOverlayActions.showLoadingOverlay(false));
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}

export function* authForgotPasswordRequest(api, action) {
  const { data, cb } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Requesting ..."));
  const response = yield call(api.authForgotPasswordRequest, data);
  console.log("authForgotPasswordRequest response", JSON.stringify(response));
  if (response.ok) {
    if (response.data && !response.data.error) {
      yield put(AuthActions.authForgotPasswordSuccess(response.data));
      if (cb) cb(response.data);
    } else {
      yield put(AuthActions.authForgotPasswordFailure());
    }
  } else {
    yield put(AuthActions.authForgotPasswordFailure());
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}

export function* authResetPasswordRequest(api, action) {
  const { data, cb } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Requesting ..."));
  const response = yield call(api.authResetPasswordRequest, data);
  console.log("authResetPasswordRequest response", JSON.stringify(response));
  if (response.ok) {
    if (response.data && !response.data.error) {
      yield put(AuthActions.authResetPasswordSuccess(response.data));
      if (cb) cb(response.data);
    } else {
      yield put(AuthActions.authResetPasswordFailure());
    }
  } else {
    yield put(AuthActions.authResetPasswordFailure());
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}

export function* authChangePasswordRequest(api, action) {
  const { data, cb } = action;
  yield put(LoadingOverlayActions.showLoadingOverlay(true, "Requesting ..."));
  const response = yield call(api.authChangePasswordRequest, data);
  console.log("authChangePasswordRequest response", JSON.stringify(response));
  if (response.ok) {
    if (response.data && !response.data.error) {
      yield put(AuthActions.authChangePasswordSuccess(response.data));
      if (cb) cb(response.data);
    } else {
      yield put(AuthActions.authChangePasswordFailure());
    }
  } else {
    yield put(AuthActions.authChangePasswordFailure());
  }
  yield put(LoadingOverlayActions.showLoadingOverlay(false));
}
