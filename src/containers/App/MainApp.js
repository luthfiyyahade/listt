import React, {useEffect} from "react";
import {Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";

import BelowHeader from "../Topbar/BelowHeader/index";
import Topbar from "../Topbar/index";
import config, {footerText} from "../../util/config";
import App from "../../routes/index";

import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import {useRouteMatch} from "react-router-dom";
import {updateWindowWidth} from "../../appRedux/actions";
import AppSidebar from "./AppSidebar";

import AuthActions from "../../appRedux/reducers/AuthRedux";
import { useIdleTimer } from "react-idle-timer";
import moment from "moment";

const {Content, Footer} = Layout;

const getContainerClass = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return '';
  }
};

const getNavStyles = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DEFAULT_HORIZONTAL :
      return <HorizontalDefault/>;
    case NAV_STYLE_DARK_HORIZONTAL :
      return <HorizontalDark/>;
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
      return <InsideHeader/>;
    case NAV_STYLE_ABOVE_HEADER :
      return <AboveHeader/>;
    case NAV_STYLE_BELOW_HEADER :
      return <BelowHeader/>;
    case NAV_STYLE_FIXED :
      return <Topbar/>;
    case NAV_STYLE_DRAWER :
      return <Topbar/>;
    case NAV_STYLE_MINI_SIDEBAR :
      return <Topbar/>;
    case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
      return <NoHeaderNotification/>;
    case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
      return <NoHeaderNotification/>;
    default :
      return null;
  }
};

const MainApp = () => {
  const {navStyle} = useSelector(({settings}) => settings);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const userCredent = localStorage.getItem("user_credent")
    ? JSON.parse(localStorage.getItem("user_credent"))
    : null;
  // const idleTimeout = !!userCredent.idleTimeout
  //   ? 1000 * 60 * Number(userCredent.idleTimeout)
  //   : config.SESSION_TIMEOUT;

  // const handleOnIdle = (event) => {
  //   if (config.IS_SESSION_TIMEOUT_ACTIVE) {
  //     console.log("user is idle", event);
  //     console.log("last active", getLastActiveTime());
  //     dispatch(AuthActions.userSignOut("Your Session has Expired")); 
  //   }
  // };

  // const handleOnActive = (event) => {
  //   // console.log('user is active', event)
  //   // console.log('time remaining', getRemainingTime())
  // };

  // const handleOnAction = (event) => {
  //   // console.log('user did something', event)
  // };

  // const { /*getRemainingTime, */ getLastActiveTime } = useIdleTimer({
  //   timeout: idleTimeout, //harusnya 1000 * 60 * 15
  //   onIdle: handleOnIdle,
  //   onActive: handleOnActive,
  //   onAction: handleOnAction,
  //   debounce: 500,
  // });

  useEffect(() => {
    localStorage.removeItem("change_credent");
    console.log("change_credent removed");
  }, []);  

  
  useEffect(() => {
    // if (userCredent.logintime) {
    //   console.log("onload main MY TOKEN", userCredent);
    //   console.log("onload idleTimeout", idleTimeout);
    //   const strLogintime = userCredent.logintime;

    //   console.log("onload logintime", strLogintime);

    //   const currentTime = moment();
    //   const loginTime = moment(strLogintime, "YYYY-MM-DD HH:mm:ss");

    //   const duration = moment.duration(currentTime.diff(loginTime));
    //   const minutesDiff = duration.asMinutes();

    //   console.log("minutes dfiff", minutesDiff);

    //   if (1000 * 60 * minutesDiff > idleTimeout) {
    //     console.log("expired");
    //     dispatch(AuthActions.userSignOut("Your Session has Expired"));
    //   }
    // } else {
    //   dispatch(AuthActions.userSignOut("Your Session has Expired"));
    // }
    window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth));
    })
  }, [dispatch]);

  return (
    <Layout className="gx-app-layout">
      <AppSidebar navStyle={navStyle}/>
      <Layout>
        {getNavStyles(navStyle)}
        <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
          <App match={match}/>
          <Footer>
            <div className="gx-layout-footer-content">
              {footerText}
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
};
export default MainApp;

