import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ReduxPersist from '../../util/ReduxPersist'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import rootSaga from "../sagas/index";
import createRootReducer from '../reducers'

const createBrowserHistory = require('history').createBrowserHistory;


export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk,sagaMiddleware, routeMiddleware];


export default function configureStore(preloadedState = {}) {
  const persistedReducer = persistReducer(ReduxPersist.storeConfig, createRootReducer(history))

  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      ),
    ),
  );
  let persistor
  try {
    const curRev = localStorage.getItem('reducerVersion')
    if (!curRev) {
      localStorage.setItem('reducerVersion', ReduxPersist.reducerVersion)
      persistor = persistStore(store)
    } else if (ReduxPersist.reducerVersion !== curRev) {
      persistor = persistStore(store, null).purge()
      localStorage.setItem('reducerVersion', ReduxPersist.reducerVersion)
    } else {
      localStorage.setItem('reducerVersion', ReduxPersist.reducerVersion)
      persistor = persistStore(store)
    }
  } catch(e) {
    localStorage.setItem('reducerVersion', ReduxPersist.reducerVersion)
    persistor = persistStore(store)
  }
  
  

  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}
