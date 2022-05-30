import React, {useEffect} from 'react';
import {Checkbox, FormControlLabel} from "@material-ui/core";

const OneCheckBox = ({city, currentCities, setCurrentCities}) => {
    const [checked, setChecked] = React.useState(currentCities.includes(city.id));
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    useEffect(() => {
        if (checked) setCurrentCities([...currentCities, city.id])
        else setCurrentCities(currentCities.filter(a => a !== city.id))
    }, [checked])

    useEffect(() => {
        if (currentCities === []) setChecked(false)
    }, [currentCities])


    return (
        <div>
            <FormControlLabel control={<Checkbox checked={checked}
                                                 onChange={handleChange}/>} label={city.cityName}/>
        </div>
    );
};

export default OneCheckBox;