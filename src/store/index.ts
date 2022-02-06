import {applyMiddleware, createStore} from "redux"
import {composeEnhancers, rootReducer} from "./reducers";
import thunkMiddleware from "redux-thunk";
import NetworkService from "../http/network-service";

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
NetworkService.setupInterceptors(store);
