import React from "react";
import {useDispatch} from "react-redux";
import {Avatar, Popover} from "antd"; 
import AuthActions from "../../appRedux/reducers/AuthRedux";

const UserInfo = () => {

  const dispatch = useDispatch();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => dispatch(AuthActions.userSignOut())}>Logout</li> 
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar src={"https://via.placeholder.com/150"} className="gx-avatar gx-pointer" alt=""/>
    </Popover>
  );
};

export default UserInfo;
