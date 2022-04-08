import React, {useState} from 'react';
import s from "../../style/Cities.module.css";
import {Button, Input} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckIcon from "@material-ui/icons/Check";

interface AddCityProps {
    newCity:any,
    price: number,
    addCity: ()=>void,
    setPrice : any
}

const AddCity:React.FC<AddCityProps> = ({newCity, price, addCity, setPrice}) => {
    const handlerChangePrice = (e) => {
        if (e.target.value < 1) setPrice(1)
        else setPrice(e.target.value)
    }

    return (
        <div className={s.wrapper}>
            <div>
                <Input value={newCity.value}
                       onChange={newCity.onChange}
                       placeholder="Название города"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
                <Input value={price}
                       onChange={(e) => handlerChangePrice(e)}
                       type='number'
                       placeholder="Цена за час"
                       color="primary"
                       inputProps={{'aria-label': 'description'}}
                       className={s.name}
                />
            </div>
            <Button type="submit" color='secondary' className={s.btn}><CheckIcon/></Button>
            <AddCircleOutlineIcon style={{cursor: "pointer"}} onClick={addCity}/>
        </div>
    );
};

export default AddCity;