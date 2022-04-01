import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {
    FormControl,
    FormGroup,
    InputLabel,
    Select,
    makeStyles,
    createStyles,
    Theme,
    useTheme,
    Input, Chip, MenuItem
} from "@material-ui/core";
import {City} from "../../types/mainInterfacesAndTypes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface CitiesCheckBoxProps {
    cities: City[],
    setArrayCurrentCities: any
}

const CitiesCheckBoxMultySelect: FC<CitiesCheckBoxProps> = ({cities, setArrayCurrentCities}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [cityName, setCityName] = useState<string[]>([]);

    useEffect(() => {
        let result=[]
        for (let i = 0; i <cities.length; i++) {
            if(cityName.includes(cities[i].cityName)) { // @ts-ignore
                result=[...result, cities[i].id]
            }
        }
        console.log(result)
        setArrayCurrentCities(result)
    }, [cityName])

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCityName(event.target.value as string[]);
    };
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">City</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={cityName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip"/>}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} className={classes.chip}/>
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {cities.map((city, key) => (
                    <MenuItem key={key} value={city.cityName} style={getStyles(city.cityName, cityName, theme)}>
                        {city.cityName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CitiesCheckBoxMultySelect;