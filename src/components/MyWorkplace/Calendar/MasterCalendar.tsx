import React, {useEffect, useState} from 'react';
import s from '../../../style/MasterCalemdar.module.css'
import $api from "../../../http";
import {useParams} from "react-router-dom";
import OneDay from "./OneDay";
import {Button, Typography} from "@material-ui/core";
import {MONTHS} from "../../../enums/months";
import {MyStatus} from "../../MyOffice/Statuses";
import {useFetching} from "../../../hooks/useFetching";
import {useDispatch} from "react-redux";
import {fetchCalendar} from "../../../actionCreators/calendarActionCreators";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export interface OrderInterface {
    clockSize: number,
    id: number,
    master_busyDate: { dateTime: string },
    payPalOrderId: null | string,
    status: string,
    user: { name: string }
}

interface ApiResponse {
    orders: OrderInterface[],
    date: Date,
    id: number
}

const today = new Date(Date.now())

const MasterCalendar = () => {
    const dispatch = useDispatch()
    const {calendar}=useTypedSelector(state => state.calendar)
    const {masterId} = useParams<{ masterId: string }>();
    const [isFetch, setFetch] = useState(true)
    const [month, setMonth] = useState<string>(new Date(today).toISOString())
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
        dispatch(fetchCalendar(+masterId, month))
        findStatuses().then(() => {
            setFetch(false)
        })

    }
    useEffect(() => {
        fetch()
        return () => {
            setFetch(false)
        };
    }, [month])

    const setMonthHandler = (add) => {
        setMonth(new Date(new Date(month).setMonth(new Date(month).getMonth() + add)).toISOString())
    }
    const dayOfWeek = [{id: 1, day: 'Mon'}, {id: 2, day: "Tue"}, {id: 3, day: "Wed"}, {id: 4, day: "Thu"},
        {id: 5, day: " Fri"}, {id: 6, day: "Sat"}, {id: 7, day: "Sun"}]
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
                <Button onClick={() => setMonthHandler(-1)}>Prev Month</Button>
                <Button onClick={() => setMonthHandler(1)}>Next Month</Button>
            </div>
        </div>
    );
};

export default MasterCalendar;