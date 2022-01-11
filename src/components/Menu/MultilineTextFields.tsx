import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {ICities, IDay, ITime} from "../../types/mainInterfaces";


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
    cities?: Array<ICities> | undefined
    time?: Array<ITime> | undefined
    days?: Array<IDay> | undefined
    currency: number,
    setCurrency: (arg0: number) => void
}

const MultilineTextFields: React.FC<MultilineTextFieldsListProps> = ({
                                                                         label,
                                                                         cities,
                                                                         time,
                                                                         days,
                                                                         currency,
                                                                         setCurrency
                                                                     }) => {
    const classes = useStyles();
    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(Number(event.target.value));
    };
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id={'standard-select-currency-native'+label}
                    select
                    label={label}
                    value={currency}
                    onChange={change}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {cities && cities.map((option, key) => (
                        <option key={'cities'+key} value={option.id}>
                            {option.city_name}
                        </option>
                    ))}
                    {time && time.map((option, key) => (
                        <option key={'time'+key} value={option.id}>
                            {option.time}
                        </option>
                    ))}
                    {days && days.map((option, key) => (
                        <option key={'days'+key} value={option.id}>
                            {option.day_name}
                        </option>
                    ))}
                </TextField>
            </div>
        </form>
    );
}
export default MultilineTextFields