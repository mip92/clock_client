import React from 'react';
import s from "../../../../style/SortByStatistics.module.css";
import CitiesMultySelect from "../../Cities/CitiesMultySelect";
import MastersMultySelect from "./MastersMultySelect";
import DateStart from "../../Orders/DateStart";

const SortByStatistics = ({cities, setArrayCurrentCities, masters, setArrayCurrentMasters, dateStart, setDateStart, dateFinish, setDateFinish}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.item}>
                <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
            </div>
            <div className={s.item}>
                <MastersMultySelect masters={masters} setArrayCurrentMasters={setArrayCurrentMasters}/>
            </div>
            <div className={s.date}>
                <DateStart date={dateStart} setDate={setDateStart} label='Date start sort'/>
            </div>
            <div className={s.date}>
                <DateStart date={dateFinish} setDate={setDateFinish} label='Date finish sort'/>
            </div>
        </div>
    );
};

export default SortByStatistics;