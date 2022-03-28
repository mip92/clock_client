import React, {useEffect, useState} from 'react';
import MyStepper from "./MyStepper";
import {FormContext} from "../../context/formContext";
import {useInput} from "../../hooks/useInput";
import {City, Clock} from "../../types/mainInterfacesAndTypes";
import Navbar from "../Admin/Navbar";

const StepperContainer: React.FC = () => {
    const [currentCity, setCurrentCity] = useState<number>(1);
    const [currentTime, setCurrentTime] = useState<number>(8);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [currentMaster, setCurrentMaster] = useState<number>(1)
    const [clockSize, setClockSize] = useState<Clock>({
        small: false,
        middle: false,
        big: false,
    });
    const email = useInput('')
    const name = useInput('')
    const [date, setDate] = useState<Date>(new Date());
    return (
        <FormContext.Provider value={{
            currentMaster,
            setCurrentMaster,
            currentCity: currentCity,
            setCurrentCity: setCurrentCity,
            currentTime: currentTime,
            setCurrentTime: setCurrentTime,
            currentDay: currentDay,
            setCurrentDay: setCurrentDay,
            clockSize,
            setClockSize,
            email,
            name,
            date,
            setDate,
        }}>
            <Navbar>
                <MyStepper/>
            </Navbar>
        </FormContext.Provider>
    );
};

export default StepperContainer;