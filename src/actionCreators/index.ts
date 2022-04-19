import * as AppActionsCreators from "./authActionCreators"
import * as adminMasterActionCreators from "../actionCreators/adminMasterActionCreators"
import * as adminCityActionCreators from "../actionCreators/adminCityActionCreators"
import * as navbarActionCreators from "../actionCreators/navbarActionCreators"

export default {
    ...AppActionsCreators,
    ...adminMasterActionCreators,
    ...adminCityActionCreators,
    ...navbarActionCreators
}