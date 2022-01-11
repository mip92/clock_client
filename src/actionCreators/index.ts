import * as AppActionsCreators from "../actionCreators/adminActionCreators"
import * as adminMasterActionCreators from "../actionCreators/adminMasterActionCreators"
import * as adminCityActionCreators from "../actionCreators/adminCityActionCreators"
export default{
    ...AppActionsCreators,
    ...adminMasterActionCreators,
    ...adminCityActionCreators
}