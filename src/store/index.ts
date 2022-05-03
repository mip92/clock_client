import {applyMiddleware, createStore} from "redux"
import {composeEnhancers, rootReducer} from "./reducers";
import thunkMiddleware from "redux-thunk";

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

