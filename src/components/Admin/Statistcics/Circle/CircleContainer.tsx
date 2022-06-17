import React, {useEffect, useState} from 'react';
import Circle from "./Circle";
import $api from "../../../../http";
import s from "../../../../style/CircleContainer.module.css";

import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {Button} from "@material-ui/core";
import DateStart from "../../Orders/DateStart";
import {COLORS} from "../../../../enums/Colors";


interface DataSetsInterface {
    backgroundColor: string[]
    data: number[]
    label: string
}

interface AxiosDataSetsInterface {
    backgroundColor
    data: number[]
    label: string
}

export interface CircleResponse {
    datasets: DataSetsInterface[]
    labels: string[]
}

export interface AxiosCircleResponse {
    datasets: AxiosDataSetsInterface[]
    labels: string[]
}

let newestDate = new Date(Date.now())
newestDate.setHours(0)
newestDate.setMinutes(0)
newestDate.setSeconds(0)
newestDate.setMilliseconds(0)

let oldestDate = new Date(newestDate)
oldestDate.setDate(oldestDate.getDate() - 30)

const CircleContainer = ({link}) => {
    const [statisticData, setStatisticData] = useState<CircleResponse>({} as CircleResponse)
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(oldestDate);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(newestDate);
    const [isFetch, setIsFetch] = useState(true)
    const fetch = () => {
        const isoDateStart = dateStart?.toISOString()
        const isoDateFinish = dateFinish?.toISOString()
        $api.get<AxiosCircleResponse>(`/order/${link}?dateStart=${isoDateStart}&dateFinish=${isoDateFinish}`).then(response => {
            let dataSets: AxiosDataSetsInterface[] | undefined | DataSetsInterface[] = response.data.datasets
            const colors = Array.from({length: response.data.datasets[0].data.length}, (v, k) => {
                return COLORS[k]
            });
            dataSets[0].backgroundColor = colors
            const labels = response.data.labels
            setStatisticData({datasets: dataSets, labels})
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