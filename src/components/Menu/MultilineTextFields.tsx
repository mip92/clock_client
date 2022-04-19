import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {City, Time} from "../../types/mainInterfacesAndTypes";

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
    register: any,
    error: string,
}

const MultilineTextFields: React.FC<MultilineTextFieldsListProps> = ({
                                                                         label,
                                                                         cities,
                                                                         time,
                                                                         register,
                                                                         error
                                                                     }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
                <TextField
                    helperText={error}
                    id={'standard-select-currency-native' + label}
                    select
                    label={label}
                    error={!!error}
                    {...register}
                    defaultValue={0}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {cities && cities.map((option, key) => (
                        <option key={'cities' + key} value={option.id}>
                            {option.cityName}
                        </option>
                    ))}
                    {time && time.map((option, key) => (
                        <option key={'time' + key} value={option.id}>
                            {option.time}
                        </option>
                    ))}
                </TextField>
            </div>
        </div>
    );
}
export default MultilineTextFields