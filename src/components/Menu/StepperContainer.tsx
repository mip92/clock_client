import React, {useEffect, useState} from 'react';
import MyStepper from "./MyStepper";
import {FormContext} from "../../context/formContext";
import {useInput} from "../../hooks/useInput";
import {City, Clock} from "../../types/mainInterfacesAndTypes";

const StepperContainer: React.FC  = () => {
    /*const [cities, setCities] = useState<City[]>([{
        cityName: '',
        createdAt: '',
        updatedAt: '',
        id: 0,
    }])
    const [fetching, isLoading, error] = useFetching(async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    useEffect(() => {
        fetching()
        return () => {
            setCities([])
        };
    }, [])*/
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
            <MyStepper/>
        </FormContext.Provider>
    );
};

export default StepperContainer;