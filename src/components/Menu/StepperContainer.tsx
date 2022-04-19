import React, {useState} from 'react';
import {FormContext} from "../../context/formContext";
import {useInput} from "../../hooks/useInput";
import {Clock} from "../../types/mainInterfacesAndTypes";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import MyStepper from "./MySteper";

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
    const today =new Date()
    const tomorrow =new Date(today.setDate(today.getDate() + 1))
    const [date, setCurrentDate] = useState<Date>(tomorrow);
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
            setCurrentDate: setCurrentDate,
        }}>
            <div>
               <MyStepper/>
            </div>
        </FormContext.Provider>
    );
};

export default StepperContainer;