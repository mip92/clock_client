import {createContext} from 'react';

export const MasterContext = createContext({
    cities: [{
        createdAt:'',
        updatedAt:'',
        cityName: '',
        id: 0,
    }],
},)