import {AdminCitiesAction, AdminCitiesActionTypes, AdminCitiesStateType} from "../../types/adminCityTypes";

const initState: AdminCitiesStateType = {
    cities: [],
    newCity: '',
    error: null,
    isFetch: false,
    citiesCount: 0,
    totalPages: 0,
    pagesArray: [1]
}

export const adminCitiesReducer = (state = initState, action: AdminCitiesAction): AdminCitiesStateType => {
    switch (action.type) {
        case AdminCitiesActionTypes.FETCH_CITIES:
            return {
                ...state,
                cities: action.payload.cities,
                citiesCount: action.payload.citiesCount,
                totalPages: action.payload.totalPages,
                pagesArray: action.payload.pagesArray
            }
        case AdminCitiesActionTypes.FETCH_START:
            return {...state, isFetch: action.payload.payload}
        case AdminCitiesActionTypes.FETCH_ERROR:
            return {...state, error: action.payload.payload}
        case AdminCitiesActionTypes.DELETE_CITY:
            return {...state, cities: state.cities.filter(сity => сity.id !== action.payload.payload.id)}
        case AdminCitiesActionTypes.SET_CITY_NAME:
            return {...state, newCity: action.payload.payload}
        case AdminCitiesActionTypes.ADD_CITY:
            return {...state, cities: [...state.cities, action.payload.payload]}
        case AdminCitiesActionTypes.CHANGE_CITY_NAME:
            return <AdminCitiesStateType>{
                ...state,
                cities: state.cities.map(сity => {
                        if (сity.id === action.city.payload.id) return action.city.payload
                        else return сity
                    }
                )
            }
        default:
            return state
    }
}