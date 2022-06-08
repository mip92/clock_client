import React from 'react';
import s from '../../../style/MasterCalemdar.module.css'

const date = new Date(Date.now())
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
        arr.push({start: i, dayOfMonth: currentDayOfWeek-dayOfWeek})
    } else arr.push({start: i, dayOfMonth: 0})
}

console.log(arr)
const MasterCalendar = () => {
    return (
        <div className={s.wrapper}>
            {arr.map(day =>
                    <div key={day.dayOfMonth} className={day.dayOfMonth===0? s.zero :s.content}>
                        {day.dayOfMonth}
                        {day.start}
                    </div>

            )}
        </div>
    );
};

export default MasterCalendar;