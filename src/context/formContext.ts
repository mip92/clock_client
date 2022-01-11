import {createContext} from 'react';
import React from 'react';
import {IClock} from "../types/mainInterfaces";


export const FormContext = createContext({
    currentMaster:1,
    setCurrentMaster: (currentMaster: number)=>{},
    currencyCity: 1,
    setCurrencyCity: (currencyCity: number)=>{},
    currencyTime: 1,
    setCurrencyTime: (currencyTime: number)=>{},
    currencyDay: 1,
    setCurrencyDay: (currencyDay: number)=>{},
    clockSize: {
        small:true,
        middle:false,
        big:false,
    },
    setClockSize: (clockSize: IClock) => {},
    date: new Date(),
    setDate: (date: Date)=>{},

    email: {value: '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}, change: (e: string) => {}},
    name: {value:'', onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}, change: (e: string) => {}},

},)