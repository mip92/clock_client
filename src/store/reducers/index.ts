import {combineReducers, compose} from "redux";
import {authReducer} from "./authReducer";
import {adminCitiesReducer} from "./adminCityReducer";
import {adminMasterReducer} from "./adminMasterReducer";
import {navbarReducer} from "./navbarReducer";
import {workplaseReducer} from "./workplaceReducer";
import {orderReducer} from "./orderReducer";

export const rootReducer=combineReducers(
    {
        auth:authReducer,
        adminCity: adminCitiesReducer,
        adminMaster: adminMasterReducer,
        navbar: navbarReducer,
        workplase: workplaseReducer,
        order: orderReducer
    }
)

export type RootStateType=ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

