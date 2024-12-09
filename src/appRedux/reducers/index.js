import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Settings from "./Settings";
// import Auth from "./Auth";
import Notes from "./Notes";
import Contact from "./Contact";
import Common from "./Common";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    // auth: Auth,
    notes: Notes,
    contact: Contact,
    common: Common,
    //kbij redux
    template: require("./TemplateRedux").reducer,
    auth: require("./AuthRedux").reducer,
    comments: require("./CommentsRedux").reducer,
    modalinfo: require("./ModalInfoRedux").reducer,
    loadingoverlay: require("./LoadingOverlayRedux").reducer,
     
  });

export default createRootReducer;
