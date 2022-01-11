import {createContext} from 'react';


export const MasterContext = createContext({
    cities: [{
        city_name: '',
        id: 0,
    }],
},)