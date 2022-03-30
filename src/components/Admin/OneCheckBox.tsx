import React, {useEffect} from 'react';
import {Checkbox, FormControlLabel} from "@material-ui/core";

const OneCheckBox = ({city, array, setArray}) => {
    const [checked, setChecked] = React.useState(array.includes(city.id));
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    useEffect(()=>{
        //Wif (array.length===0) setArray([])
        if (checked===true) setArray([...array, city.id])
        else setArray(array.filter(a=>{if (a==city.id) return
        else return a}))
    },[checked])

    useEffect(()=>{
        if (array.length==0) setChecked(false)
    },[array])


    return (
        <div>
            <FormControlLabel control={<Checkbox checked={checked}
                                                 onChange={handleChange}/>} label={city.cityName} />
        </div>
    );
};

export default OneCheckBox;