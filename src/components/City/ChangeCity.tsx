import React, {useState} from 'react';
import s from "../../style/City.module.css";
import {Input} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {changeCityName} from "../../actionCreators/adminCityActionCreators";
import {useDispatch} from "react-redux";
import {useInput} from "../../hooks/useInput";

const ChangeCity = ({activateInput, cityId, delCity, newNameOfCity}) => {
    const dispatch = useDispatch()

    const [newPriceOfCity, setNewPriceOfCity] = useState<number>(0)
    const cnangeCityNameEventListener = (): void => {
        ////////////////////dispatch(changeCityName(cityId, newNameOfCity.value, newPriceOfCity))
        activateInput(false)
    }
    const changeCityPrice =(e)=>{
        if (e.target.value < 1) setNewPriceOfCity(1)
        else setNewPriceOfCity(e.target.value)
    }
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
};

export default ChangeCity;