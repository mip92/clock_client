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
}

const OneCity: React.FC<CityProps> = ({city, currentPage}) => {
    const [isInputActivate, activateInput] = useState<boolean>(false)
    const dispatch = useDispatch()
    const newNameOfCity = useInput('')
    const delCity = (): void => {
        dispatch(delOneCity(city.id))
    }

    const constChangeCityName = (): void => {
      //  if (!isOpen) {
            newNameOfCity.changeInput(city.cityName)
            activateInput(true)
     /*       setIsOpen(true)
        }*/
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
    } else return (<ChangeCity newNameOfCity={newNameOfCity}
                               delCity={delCity}
                               city={city}
                               activateInput={activateInput}

    />);
}
export default OneCity