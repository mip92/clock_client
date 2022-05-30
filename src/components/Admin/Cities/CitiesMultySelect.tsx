import React, {FC, useEffect} from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    makeStyles,
    createStyles,
    Theme,
    Input, Chip, MenuItem
} from "@material-ui/core";
import {City} from "../../../types/mainInterfacesAndTypes";
import {Controller, useForm} from "react-hook-form";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 160,
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


interface CitiesCheckBoxProps {
    cities: City[],
    setArrayCurrentCities: any
}

const CitiesMultySelect: FC<CitiesCheckBoxProps> = ({cities, setArrayCurrentCities}) => {
    const {error} = useTypedSelector(state => state.auth)
    const classes = useStyles();
    const {control, handleSubmit, watch, setError} = useForm();

    const onSubmit = handleSubmit(async data => {
            let result: number[] = []
            cities.forEach((c) => {
                if (data.citiesId.includes(c.cityName)) {
                    result = [...result, c.id]
                }
            })
            setArrayCurrentCities(result)
        }
    );
    useEffect(() => {
        if (error?.param) {
            setError(error.param, {
                type: "server error",
                message: error.msg
            });
        }
    }, [error])
    return (
        <div onBlur={onSubmit}>
            <Controller
                name="citiesId"
                control={control}
                defaultValue={[]}
                render={({field}) => (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">City</InputLabel>
                        <Select
                            {...field}
                            labelId="LabelCities"
                            label="cities"
                            multiple
                            error={watch("citiesId")?.length === 0 && error?.value?.length === 0}
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
                                <MenuItem key={key} value={city.cityName}>
                                    {city.cityName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            {watch("citiesId")?.length === 0 && error?.value?.length === 0 &&
            <div style={{color: "red"}}>{error?.msg}</div>}
        </div>
    );
};

export default CitiesMultySelect;