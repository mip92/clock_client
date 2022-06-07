import React, {useEffect, useState} from 'react';
import Circle from "./Circle";
import $api from "../../../../http";
import {City} from "../../../../types/mainInterfacesAndTypes";
import s from "../../../../style/OrderFilters.module.css";
import DateStart from "../../Orders/DateStart";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {Button} from "@material-ui/core";

interface DataSetsInterface {
    backgroundColor: string[]
    data:  number[]
    label: string
}

export interface AxiosCircleResponse {
    datasets:DataSetsInterface[]
    labels: string[]
}

const CircleContainer = () => {
    const [statisticData, setStatisticData] = useState<AxiosCircleResponse[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [isFetch, setIsFetch] = useState(true)
    const fetch = () => {

        const isoDateStart = dateStart?.toISOString()
        const isoDateFinish = dateFinish?.toISOString()
        $api.get<AxiosCircleResponse[]>(`/order/getOrdersByCities?dateStart=${isoDateStart}&dateFinish=${isoDateFinish}`).then(response => {
            setStatisticData(response.data)
        }).then(() => {
            setIsFetch(false)
        })
    }

    useEffect(() => {
        fetch()
    }, [])
    if (isFetch) return <div>Loading...</div>
    return (
        <div>
            <div className={s.date}>
                <DateStart date={dateStart} setDate={setDateStart} label='Date start sort'/>
            </div>
            <div className={s.date}>
                <DateStart date={dateFinish} setDate={setDateFinish} label='Date finish sort'/>
            </div>
            <Button onClick={() => fetch()}>ИСКАТЬ</Button>
            <Circle data={statisticData}/>
        </div>
    );
};

export default CircleContainer;