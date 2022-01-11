import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {city} from "../../types/adminCityTypes";
import {changeCityName, delOneCity} from "../../actionCreators/adminCityActionCreators";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import s from "../../style/City.module.css"
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import MyAlert from "../utilits/Alert";


interface cityProps {
    city: city,
    currentPage: number
}

const City: React.FC<cityProps> = ({city, currentPage}) => {
    console.log(city)
    const [isInputActivate, activateInput]=useState<boolean>(false)
    const newNameOfCity = useInput('')
    const dispatch =useDispatch()

    const delCity=(): void=>{
        dispatch(delOneCity(city.id))
    }
    const constChangeCityName=(): void=>{
        newNameOfCity.change(city.city_name)
        activateInput(true)
    }
    const cnangeCityNameEventListener=(): void=>{
        dispatch(changeCityName(city.id, newNameOfCity.value))
        activateInput(false)
    }
    useEffect(()=>{
        activateInput(false)
    },[currentPage])
    if (!isInputActivate) {
        return (
            <div className={s.wrapper}>
                <div>{city.city_name}</div>
                <CachedIcon onClick={constChangeCityName} style={{cursor: "pointer"}}/>
                <MyAlert handler={delCity}
                         text={`Вы точно хотите удалить ${city.city_name} из списка городов`}/>
            </div>
        );
    }
    else
        return (
            <div className={s.wrapper}>
                <Input {...newNameOfCity}
                       placeholder="Название города"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
                <CheckIcon onClick={()=>cnangeCityNameEventListener()} style={{cursor: "pointer"}}/>
                <HighlightOffIcon style={{cursor: "pointer"}} onClick={delCity}/>
            </div>
        );
}
export default City