import React, {useContext} from 'react';
import {DatePicker} from '@material-ui/pickers';
import {FormContext} from "../../context/formContext";

const MyDate = () => {
    const {date, setDate} = useContext(FormContext)
    return (
        <div>
            <DatePicker value={date} onChange={setDate}
                        label="Дата"
            />
            
        </div>
    );
}
export default MyDate