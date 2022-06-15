import React, {useEffect, useState} from 'react';
import s from '../../../style/MasterCalemdar.module.css'
import {useParams} from "react-router-dom";
import OneDay from "./OneDay";
import {Button, Typography} from "@material-ui/core";
import {MONTHS} from "../../../enums/months";
import {MyStatus} from "../../MyOffice/Statuses";
import {useDispatch} from "react-redux";
import {fetchCalendar, setCorrectMonday} from "../../../actionCreators/calendarActionCreators";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export interface OrderInterface {
    clockSize: number,
    id: number,
    master_busyDate: { dateTime: string },
    payPalOrderId: null | string,
    status: string,
    user: { name: string }
}

interface MasterCalendarMonthProps{
    statuses: MyStatus[] | null
}

const today = new Date(Date.now())

const MasterCalendarMonth:React.FC<MasterCalendarMonthProps>  = ({statuses}) => {
    const dispatch = useDispatch()
    const {calendar, dayOfWeek, correctMonday, isFetch}=useTypedSelector(state => state.calendar)
    const {masterId} = useParams<{ masterId: string }>();

    const [month, setMonth] = useState<string>(new Date(today).toISOString())

    const fetch = () => {
        dispatch(fetchCalendar(+masterId, month))
        dispatch(setCorrectMonday(''))
    }
    useEffect(() => {
        fetch()
    }, [month])

    const setMonthHandler = (add) => {
        setMonth(new Date(new Date(month).setMonth(new Date(month).getMonth() + add)).toISOString())
    }

    if (isFetch || !statuses) return <div>Loading...</div>
    else return (
        <div>
            <Typography variant="h5" component="h4" className={s.month}>
                {MONTHS[new Date(month).getMonth()]}
            </Typography>
            <div className={s.wrapper}>
                {dayOfWeek.map((day) => <div className={s.title} key={day.id}>{day.day}</div>)}
                {calendar.map((day) => <div key={day.id} className={day.date === null ? s.zero : s.content}>
                        <OneDay orders={day.orders} date={day.date} statuses={statuses} masterId={masterId} month={month}/>
                    </div>
                )}

            </div>
            <div className={s.btns}>
                <Button variant='outlined' color='default' onClick={() => setMonthHandler(-1)}>Prev Month</Button>
                <Button variant='outlined' color='default' onClick={() => setMonthHandler(1)}>Next Month</Button>
            </div>
        </div>
    );
};

export default MasterCalendarMonth;