import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Checkbox, FormGroup} from "@material-ui/core";
import {City} from "../../types/mainInterfacesAndTypes";
import OneCheckBox from "./OneCheckBox";

interface CitiesCheckBoxProps {
    cities: City[],
    arrayCurrentCities:number[]
    setArrayCurrentCities: Dispatch<SetStateAction<number[]>>
}
const CitiesCheckBox:FC<CitiesCheckBoxProps> = ({cities,arrayCurrentCities, setArrayCurrentCities}) => {

    return (
        <FormGroup>
            {cities.map((c,key)=><OneCheckBox key={c.id} city={c} array={arrayCurrentCities} setArray={setArrayCurrentCities}/>)}
        </FormGroup>
    );
};

export default CitiesCheckBox;