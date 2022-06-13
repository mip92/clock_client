import React, {useEffect, useState} from 'react';
import MasterCalendarMonth from "./MasterCalendarMonth";
import {Button} from "@material-ui/core";
import MasterCalendarWeek from "./MasterCalendarWeek";
import {FORMAT, formats} from "../../../types/calendarTypes";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {setFormat} from "../../../actionCreators/calendarActionCreators";
import s from "../../../style/MasterCalemdarContainer.module.css"
import {MyStatus} from "../../MyOffice/Statuses";
import {useFetching} from "../../../hooks/useFetching";
import $api from "../../../http";

const MasterCalendarContainer = () => {
    const dispatch = useDispatch()
    const {format} = useTypedSelector(state => state.calendar)
    const handlerChangeFormat = (format: FORMAT) => {
        dispatch(setFormat(format))
    }
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
        findStatuses()
    }

    useEffect(()=>{
        fetch()
    },[])

    if (isLoading) return <div>Loading...</div>
    return (
        <div className={s.wrapper}>
            <div className={s.formats}>
                {formats.map((oneFormat) => <Button
                    onClick={() => handlerChangeFormat(oneFormat.format)}
                    variant={format==oneFormat.format ? `contained` : 'outlined'}
                    color={format==oneFormat.format ? `primary` : 'default'}
                    key={oneFormat.id}>
                    {FORMAT[oneFormat.format]}
                </Button>)}
            </div>

            {format === FORMAT.Month && <MasterCalendarMonth statuses={statuses}/>}
            {format === FORMAT.Week && <MasterCalendarWeek statuses={statuses}/>}
        </div>
    );
};

export default MasterCalendarContainer;