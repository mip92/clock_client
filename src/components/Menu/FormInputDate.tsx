import React, {useEffect} from "react";
import { KeyboardDatePicker} from "@material-ui/pickers";

//const DATE_FORMAT = "dd-MMM-yy";

export const FormInputDate = ({date, setDate, register, getValues, setValue, error}) => {

    const value = getValues('fieldName') as Date;
    useEffect(() => {
        register('fieldName');
    }, [register]);
    useEffect(() => {
        setDate(value || null);
    }, [setDate, value]);

    return (
        <KeyboardDatePicker
            helperText={error}
            error={!!error}
            label='Date'
            value={date}
            onChange={(date) => {
                setDate(date);
                setValue('fieldName', date, { shouldValidate: true, shouldDirty: true });
            }}

        />
    );
};