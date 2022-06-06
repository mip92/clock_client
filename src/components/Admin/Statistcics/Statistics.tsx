import React, {useEffect, useState} from 'react';
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import {AxiosOrder} from "../Orders/MyOrders";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {MyStatus} from "../../MyOffice/Statuses";
import s from "../../../style/OrderFilters.module.css";
import CitiesMultySelect from "../Cities/CitiesMultySelect";
import DateStart from "../Orders/DateStart";
import MastersMultySelect from "./MastersMultySelect";

const Statistics = ({cities, masters}) => {
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [currentMasters, setArrayCurrentMasters] = useState<number[]>([])
    const [status, setStatus] = useState<MyStatus[]>([]);
    const {
        currentPage,
        fetching,
        currentLimit,
        sortBy,
        select,
        inputValue,
    } = usePaginatorWithReduxLimit(async () => {
        const currentStatusesName: string[] = []
        status.map((s) => {
            return currentStatusesName.push(s.name)
        })
        const url = `/order?sortBy=${sortBy}&masterId=${currentMasters}&select=${select}&filterMaster=${inputValue}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&status=${currentStatusesName}`
        return await $api.get<AxiosOrder>(url)
    }, setOrders, "master name")

    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select, currentArray, dateStart, dateFinish, currentMasters])
    return (
        <div>
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

export default Statistics;