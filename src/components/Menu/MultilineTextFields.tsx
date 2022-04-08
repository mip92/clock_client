import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {City, Time} from "../../types/mainInterfacesAndTypes";
import {useDispatch} from "react-redux";
import {setCurrentCity, setCurrentTime} from "../../actionCreators/orderActionCreators";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

interface MultilineTextFieldsListProps {
    label: string;
    cities?: City[] | undefined
    time?: Time[] | undefined
    current: number | null,
}

const MultilineTextFields: React.FC<MultilineTextFieldsListProps> = ({
                                                                         label,
                                                                         cities,
                                                                         time,
                                                                         current,
                                                                     }) => {
    const classes = useStyles();
    const dispatch =useDispatch()
    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        cities && dispatch(setCurrentCity(+event.target.value));
        time && dispatch(setCurrentTime(+event.target.value));
    };
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id={'standard-select-currency-native'+label}
                    select
                    label={label}
                    value={current}
                    onChange={change}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {cities && cities.map((option, key) => (
                        <option key={'cities'+key} value={option.id}>
                            {option.cityName}
                        </option>
                    ))}
                    {time && time.map((option, key) => (
                        <option key={'time'+key} value={option.id}>
                            {option.time}
                        </option>
                    ))}
                </TextField>
            </div>
        </form>
    );
}
export default MultilineTextFields