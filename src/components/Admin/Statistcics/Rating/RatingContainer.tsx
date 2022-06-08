import React, {useEffect, useState} from 'react';
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import $api from "../../../../http";
import s from "../../../../style/OrderFilters.module.css";
import DateStart from "../../Orders/DateStart";
import {Button} from "@material-ui/core";
import Circle from "../Circle/Circle";
import {AxiosCircleResponse} from "../Circle/CircleContainer";

const RatingContainer = () => {
    const [statisticData, setStatisticData] = useState<AxiosCircleResponse[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [isFetch, setIsFetch] = useState(true)
    const fetch = () => {

        const isoDateStart = dateStart?.toISOString()
        const isoDateFinish = dateFinish?.toISOString()
        $api.get<AxiosCircleResponse[]>(`/order/getRatingByMaster?dateStart=${isoDateStart}&dateFinish=${isoDateFinish}`).then(response => {
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

export default RatingContainer;