import React, {useEffect, useState} from 'react';
import MasterCalendarMonth from "./MasterCalendarMonth";
import {Button} from "@material-ui/core";
import MasterCalendarWeek from "./MasterCalendarWeek";
import {FORMAT, formats} from "../../../types/calendarTypes";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {setFormat} from "../../../actionCreators/calendarActionCreators";
import s from "../../../style/MasterCalemdarContainer.module.css"
import {MyStatus} from "../../MyOffice/Statuses";

const statuses: MyStatus[] = [
    {id: 1, name: 'Approved'},
    {id: 2, name: 'Canceled'},
    {id: 3, name: 'Confirmed'},
    {id: 4, name: 'Completed'},
    {id: 5, name: 'Declined'},
    {id: 6, name: 'AwaitingPayment'}
]

const MasterCalendarContainer = () => {
    const dispatch = useDispatch()
    const {format} = useTypedSelector(state => state.calendar)
    const handlerChangeFormat = (format: FORMAT) => {
        dispatch(setFormat(format))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.formats}>
                {formats.map((oneFormat) => <Button
                    onClick={() => handlerChangeFormat(oneFormat.format)}
                    variant={format == oneFormat.format ? `contained` : 'outlined'}
                    color={format == oneFormat.format ? `primary` : 'default'}
                    key={oneFormat.id}>
                    {FORMAT[oneFormat.format]}
                </Button>)}
            </div>
            {format === FORMAT.Month && <MasterCalendarMonth statuses={statuses}/>}
            {format === FORMAT.Week && <MasterCalendarWeek statuses={statuses}/>}
        </div>
    );
};

export default MasterCalendarContainer;