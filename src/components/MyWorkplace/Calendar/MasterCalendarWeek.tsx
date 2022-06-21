import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import {MyStatus} from "../../MyOffice/Statuses";
import {fetchWeek, setCorrectMonday} from "../../../actionCreators/calendarActionCreators";
import s from "../../../style/MasterCalemdar.module.css";
import {Button, Typography} from "@material-ui/core";
import OneDay from "./OneDay";

interface MasterCalendarWeekProps{
    statuses: MyStatus[] | null
}

const monday = new Date(Date.now());

const MasterCalendarWeek: React.FC<MasterCalendarWeekProps> = ({statuses}) => {
    const dispatch = useDispatch()
    const {calendar, dayOfWeek, numberOfWeek, isFetch} = useTypedSelector(state => state.calendar)
    const {masterId} = useParams<{ masterId: string }>();
    const [week, setWeek] = useState<string>(new Date(monday).toISOString())

    const fetch = () => {
        dispatch(fetchWeek(+masterId, week))
        dispatch(setCorrectMonday(week))
    }
    useEffect(() => {
        fetch()
    }, [week])
    const setWeekHandler = (add) => {
        const firstDayOfWeek = new Date(week)
        setWeek(new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + add)).toISOString())
    }
    if (isFetch || !statuses) return <div>Loading...</div>
    return (
        <div>
            <Typography variant="h5" component="h4" className={s.month}>
                {numberOfWeek} week of year {new Date(monday).getFullYear()}
            </Typography>
            <div className={s.wrapper}>
                {dayOfWeek.map((day) => <div className={s.title} key={day.id}>{day.day}</div>)}

                {calendar.map((day) => <div key={day.id} className={day.date === null ? s.zero : s.content}>
                        <OneDay orders={day.orders} date={day.date} statuses={statuses} masterId={masterId} month={week}/>
                    </div>
                )}

            </div>
            <div className={s.btns}>
                <Button variant='outlined' color='default' onClick={() => setWeekHandler(-7)}>Prev Week</Button>
                <Button variant='outlined' color='default' onClick={() => setWeekHandler(7)}>Next Week</Button>
            </div>
        </div>
    );
};

export default MasterCalendarWeek;