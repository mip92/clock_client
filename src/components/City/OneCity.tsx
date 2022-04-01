import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {changeCityName, delOneCity} from "../../actionCreators/adminCityActionCreators";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CachedIcon from '@material-ui/icons/Cached';
import CheckIcon from '@material-ui/icons/Check';
import s from "../../style/City.module.css"
import {Input} from "@material-ui/core";
import {useInput} from "../../hooks/useInput";
import MyAlert from "../utilits/MyAlert";
import {City} from '../../types/mainInterfacesAndTypes'


interface CityProps {
    city: City,
    currentPage: number
}

const OneCity: React.FC<CityProps> = ({city, currentPage}) => {
    const [isInputActivate, activateInput] = useState<boolean>(false)
    const newNameOfCity = useInput('')
    const [newPriceOfCity, setNewPriceOfCity] = useState<number>(0)
    const dispatch = useDispatch()

    const delCity = (): void => {
        dispatch(delOneCity(city.id))
    }

    const constChangeCityName = (): void => {
        newNameOfCity.changeInput(city.cityName)
        activateInput(true)
    }

    const cnangeCityNameEventListener = (): void => {
        dispatch(changeCityName(city.id, newNameOfCity.value))
        activateInput(false)
    }

    const changeCityPrice =(e)=>{
        if (e.target.value < 1) setNewPriceOfCity(1)
        else setNewPriceOfCity(e.target.value)
    }

    useEffect(() => {
        activateInput(false)
    }, [currentPage])

    if (!isInputActivate) {
        return (
            <div className={s.wrapper}>
                <div>{city.cityName}</div>
                <div>{city.price}</div>
                <CachedIcon onClick={constChangeCityName} style={{cursor: "pointer"}}/>
                <MyAlert handler={delCity}
                         text={`Вы точно хотите удалить ${city.cityName} из списка городов`}/>
            </div>
        );
    } else
        return (
            <div className={s.wrapper}>
                <Input
                    value={newNameOfCity.value}
                    onChange={newNameOfCity.onChange}
                    placeholder="Название города"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                    className={s.name}
                />
                <Input
                    value={newPriceOfCity}
                    onChange={(e)=>changeCityPrice(e)}
                    type='number'
                    placeholder="Цена за час"
                    color="primary"
                    inputProps={{'aria-label': 'description'}}
                    className={s.name}
                />
                <CheckIcon onClick={() => cnangeCityNameEventListener()} style={{cursor: "pointer"}}/>
                <HighlightOffIcon style={{cursor: "pointer"}} onClick={delCity}/>
            </div>
        );
}
export default OneCity