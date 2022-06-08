import React, {useEffect, useState} from 'react';
import Circle from "./Circle";
import $api from "../../../../http";
import s from "../../../../style/CircleContainer.module.css";
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

const CircleContainer = ({link}) => {
    const [statisticData, setStatisticData] = useState<AxiosCircleResponse[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [isFetch, setIsFetch] = useState(true)
    const fetch = () => {
        const isoDateStart = dateStart?.toISOString()
        const isoDateFinish = dateFinish?.toISOString()
        $api.get<AxiosCircleResponse[]>(`/order/${link}?dateStart=${isoDateStart}&dateFinish=${isoDateFinish}`).then(response => {
            setStatisticData(response.data)
        }).then(() => {
            setIsFetch(false)
        })
    }

    useEffect(() => {
        fetch()
    }, [link])
    if (isFetch) return <div>Loading...</div>
    return (
        <div className={s.wrapper}>
            <div className={s.wrapperContent}>
            <div className={s.filter}>
                <div className={s.date}>
                    <DateStart date={dateStart} setDate={setDateStart} label='Date start sort'/>
                </div>
                <div className={s.date}>
                    <DateStart date={dateFinish} setDate={setDateFinish} label='Date finish sort'/>
                </div>
            </div>
            <div className={s.btn}>
                <Button variant="contained" color='primary' onClick={() => fetch()}>Set Filters</Button>
            </div>
            <div className={s.content}>
                <Circle data={statisticData}/>
            </div>
            </div>
        </div>
    );
};

export default CircleContainer;