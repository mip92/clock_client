import {combineReducers, compose} from "redux";
import {adminReducer} from "./adminReducer";
import {adminCitiesReducer} from "./adminCityReducer";
import {adminMasterReducer} from "./adminMasterReducer";

export const rootReducer=combineReducers(
    {
        admin:adminReducer,
        adminCity: adminCitiesReducer,
        adminMaster: adminMasterReducer
    }
)

export type RootStateType=ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

