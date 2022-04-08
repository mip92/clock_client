import {createContext} from 'react';
import React from 'react';
import {Clock} from "../types/mainInterfacesAndTypes";


export const FormContext = createContext({
    currentMaster:1,
    setCurrentMaster: (currentMaster: number)=>{},
    /*currentCity: 1,
    setCurrentCity: (currencyCity: number)=>{},*/
    /*currentTime: 1,
    setCurrentTime: (currencyTime: number)=>{},*/
    currentDay: 1,
    setCurrentDay: (currencyDay: number)=>{},
    clockSize: {
        small:true,
        middle:false,
        big:false,
    },
    setClockSize: (clockSize: Clock) => {},
    date: new Date(),
    setDate: (date: Date)=>{},
    email: {value: '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}, changeInput: (e: string) => {}},
    name: {value:'', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}, changeInput: (e: string) => {}},

},)