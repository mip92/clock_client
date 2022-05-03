import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {delOneCity} from "../../../actionCreators/adminCityActionCreators";
import CachedIcon from '@material-ui/icons/Cached';
import s from "../../../style/City.module.css"
import {useInput} from "../../../hooks/useInput";
import MyAlert from "../../utilits/MyAlert";
import {City} from '../../../types/mainInterfacesAndTypes'
import ChangeCity from "./ChangeCity";


interface CityProps {
    city: City,
    currentPage: number,
    isOpen:boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const OneCity: React.FC<CityProps> = ({city, currentPage, isOpen, setIsOpen}) => {
    const [isInputActivate, activateInput] = useState<boolean>(false)
    const dispatch = useDispatch()
    const delCity = () => {
        dispatch(delOneCity(city.id))
    }

    const constChangeCityName = (): void => {
        if (!isOpen) {
            activateInput(true)
            setIsOpen(true)
        }
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
    } else return (<ChangeCity delCity={delCity}
                               city={city}
                               activateInput={activateInput}
                               setIsOpen={setIsOpen}
    />);
}
export default OneCity