import React, {useEffect, useState} from 'react';
import s from '../../../style/MasterCalemdar.module.css'
import $api from "../../../http";
import {useParams} from "react-router-dom";

/*const date = new Date(Date.now())
const month = date.getMonth()
const firstDay = date.setDate(1)
const dayOfWeek = date.getDay()
const nextMontFistDay = new Date(firstDay).setMonth(month + 1)
const DaysOfMonth: number = Math.round((+new Date(nextMontFistDay) - +new Date(firstDay)) / 1000 / 3600 / 24);
let arr: { start: number, dayOfMonth: number }[] = []
console.log(dayOfWeek, DaysOfMonth)
let currentDayOfWeek = dayOfWeek
for (let i = 1; i < DaysOfMonth + 1; i++) {
    if (i > dayOfWeek) {
        currentDayOfWeek++
        arr.push({start: i, dayOfMonth: currentDayOfWeek - dayOfWeek})
    } else arr.push({start: i, dayOfMonth: 0})
}

console.log(arr)*/

interface ApiResponse {
    clockSize: number,
    id: number,
    master_busyDate: { dateTime: string },
    payPalOrderId: null | string,
    status: string,
    user: { name: string }

}

const MasterCalendar = () => {
    const {masterId} = useParams<{ masterId: string }>();
    const [isFetch, setFetch] = useState(true)
    const [data, setDate] = useState<ApiResponse[][]>([])
    const fetch = () => {
        $api.get<ApiResponse[][]>(`/calendar/month/${masterId}`).then((response) => {
            setDate(response.data)
            setFetch(false)
        })
    }
    useEffect(() => {
        fetch()
    }, [])


    /*<div key={day.id} className={day.id === null ? s.zero : s.content}>
        {day.master_busyDate}
    </div>*/
    if (isFetch) return <div>Loading...</div>
    else return (
        <div className={s.wrapper}>
            {data.map((day, key) =>  <div className={s.content}>
                {day === null  ? <div ></div> :  day.length === 0 ? <div >0</div>:<div>{day[0].id}</div>}
                        </div>

            )}
        </div>
    );
};

export default MasterCalendar;