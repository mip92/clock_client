import {createContext} from 'react';
import React from 'react';
import {Clock} from "../types/mainInterfacesAndTypes";


const today = new Date();
let date2 =today.setDate(today.getDate() + 1)
export const FormContext = createContext({
    currentMaster:1,
    setCurrentMaster: (currentMaster: number)=>{},
    currentDay: 1,
    setCurrentDay: (currencyDay: number)=>{},
    clockSize: {
        small:true,
        middle:false,
        big:false,
    },
    setClockSize: (clockSize: Clock) => {},
    date: new Date(date2),
    setCurrentDate: (date: Date)=>{},
    email: {value: '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}, changeInput: (e: string) => {}},
    name: {value:'', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}, changeInput: (e: string) => {}},

},)