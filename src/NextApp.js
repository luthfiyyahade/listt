import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore, { history } from './appRedux/store';
import "./firebase/firebase";
import App from "./containers/App/index";
import { PersistGate } from "redux-persist/integration/react";

// const store = configureStore(/* provide initial state if any */);
export const { store, persistor } =
  configureStore(/* provide initial state if any */);

const NextApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default NextApp;
