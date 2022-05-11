import React from 'react';

import {KeyboardDatePicker} from "@material-ui/pickers";


const DateStart = ({date, setDate, label}) => {

    return (
        <KeyboardDatePicker
            style={{width:'180px'}}
            label={label}
            value={date}
            onChange={(date) => {
                setDate(date);
            }}
        />
    );
};

export default DateStart;