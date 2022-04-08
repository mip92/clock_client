import React, {useContext, useEffect, useState} from 'react';
import MyStepper from "./MyStepper";
import {FormContext} from "../../context/formContext";
import {useInput} from "../../hooks/useInput";
import {City, Clock} from "../../types/mainInterfacesAndTypes";
import Navbar from "../Admin/Navbar";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const StepperContainer: React.FC = () => {
    const {authEmail, authName}=useTypedSelector(state => state.auth)
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [currentMaster, setCurrentMaster] = useState<number>(1)
    const [clockSize, setClockSize] = useState<Clock>({
        small: false,
        middle: false,
        big: false,
    });
    const email = useInput(authEmail || '')
    const name = useInput(authName || '')
    const [date, setDate] = useState<Date>(new Date());
    return (
        <FormContext.Provider value={{
            currentMaster,
            setCurrentMaster,
            currentDay: currentDay,
            setCurrentDay: setCurrentDay,
            clockSize,
            setClockSize,
            email,
            name,
            date,
            setDate,
        }}>
            <div>
                <MyStepper/>
            </div>
        </FormContext.Provider>
    );
};

export default StepperContainer;