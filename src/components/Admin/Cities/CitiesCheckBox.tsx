import React, {Dispatch, FC, SetStateAction} from 'react';
import {FormGroup} from "@material-ui/core";
import {City} from "../../../types/mainInterfacesAndTypes";
import OneCheckBox from "./OneCheckBox";

interface CitiesCheckBoxProps {
    cities: City[],
    arrayCurrentCities:number[]
    setArrayCurrentCities: Dispatch<SetStateAction<number[]>>
}
const CitiesCheckBox:FC<CitiesCheckBoxProps> = ({cities,arrayCurrentCities, setArrayCurrentCities}) => {

    return (
        <FormGroup>
            {cities.map((c,key)=><OneCheckBox key={c.id} city={c} currentCities={arrayCurrentCities} setCurrentCities={setArrayCurrentCities}/>)}
        </FormGroup>
    );
};

export default CitiesCheckBox;