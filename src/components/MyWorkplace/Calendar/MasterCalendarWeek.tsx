import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import {MyStatus} from "../../MyOffice/Statuses";
import {useFetching} from "../../../hooks/useFetching";
import $api from "../../../http";
import {fetchWeek, setCorrectMonday} from "../../../actionCreators/calendarActionCreators";
import s from "../../../style/MasterCalemdar.module.css";
import {Button, Typography} from "@material-ui/core";
import {MONTHS} from "../../../enums/months";
import OneDay from "./OneDay";

const monday = new Date(Date.now());

const MasterCalendarWeek = () => {
    const dispatch = useDispatch()
    const {calendar, dayOfWeek, numberOfWeek} = useTypedSelector(state => state.calendar)
    const {masterId} = useParams<{ masterId: string }>();
    const [isFetch, setFetch] = useState(true)
    const [week, setWeek] = useState<string>(new Date(monday).toISOString())
    const [statuses, setStatuses] = useState<MyStatus[] | null>([] as MyStatus[])
    const [findStatuses, isLoading] = useFetching(async () => {
        const res = await $api.get(`/status`)
        let arr: MyStatus[] = []
        let k = 1
        const keys = Object.keys(res.data);
        keys.forEach(key => {
            arr.push({id: k, name: key})
            k++
        });
        setStatuses(arr)
    })
    const fetch = () => {
        dispatch(fetchWeek(+masterId, week))
        dispatch(setCorrectMonday(week))
        findStatuses().then(() => {
            setFetch(false)
        })

    }
    useEffect(() => {
        fetch()
        return () => {
            setFetch(false)
        };
    }, [week])
    const setWeekHandler = (add) => {
        const firstDayOfWeek = new Date(week)
        setWeek(new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() + add)).toISOString())
    }
    if (isFetch || !statuses) return <div>Loading...</div>
    return (
        <div>
            <Typography variant="h5" component="h4" className={s.month}>
                {numberOfWeek} week of year
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