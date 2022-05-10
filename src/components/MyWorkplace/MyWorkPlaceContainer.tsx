import React, {useEffect, useState} from 'react';
import MyWorkplace from "./MyWorkplace";
import {MyStatus} from "../MyOffice/Statuses";
import {City} from "../../types/mainInterfacesAndTypes";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";

interface AxiosCityResponse{
    count: number,
    rows: City[]
}

const MyWorkPlaceContainer = () => {
    const [cities, setCities] = useState<City[]>([] as City[])
    const [fetching, isFetch, error] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    useEffect(() => {
        fetching()
        findStatuses()
        return () => {
            setCities([])
            setStatuses(null)
        };
    }, [])

    const [statuses, setStatuses] = useState<MyStatus[] | null>([]as MyStatus[])
    const [findStatuses, isLoading, errorfindStatuses, setFindStatusesError] = useFetching(async () => {
        const res = await $api.get(`/status`)
        let arr = [] as MyStatus[]
        let k = 1
        for (var key in res.data) {
            arr.push({createdAt: "", updatedAt: "", id: k, name: key})
            k++
        }
        setStatuses(arr)
    })
    return (<MyWorkplace cities={cities} isFetch={isFetch} statuses={statuses}/>);
};

export default MyWorkPlaceContainer;