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
    objects?: Time[] | City[] | undefined
    register: any,
    error: string,
}

const MultilineTextFields: React.FC<MultilineTextFieldsListProps> = ({
                                                                         label,
                                                                         objects,
                                                                         register,
                                                                         error
                                                                     }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
                <TextField
                    helperText={error}
                    id={label}
                    select
                    label={label}
                    error={!!error}
                    {...register}
                    defaultValue={0}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {objects && objects.map((option, key) => (
                        <option key={option.id} value={option.id}>
                            {option.time || option.cityName}
                        </option>
                    ))}
                </TextField>
            </div>
        </div>
    );
}
export default MultilineTextFields