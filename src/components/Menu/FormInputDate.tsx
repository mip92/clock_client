import React, {useEffect, useState} from "react";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {Controller, useForm} from "react-hook-form";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
const DATE_FORMAT = "dd-MMM-yy";

export const FormInputDate = ({date, setDate, register, getValues, setValue, error}) => {

    const value = getValues('fieldName') as Date;;
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
            label='Дата'
            value={date}
            onChange={(date) => {
                setDate(date);
                setValue('fieldName', date, { shouldValidate: true, shouldDirty: true });
            }}

        />
    );
};