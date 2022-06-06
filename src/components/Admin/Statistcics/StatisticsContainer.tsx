import React, {useEffect, useState} from 'react';
import {City} from "../../../types/mainInterfacesAndTypes";
import {useFetching} from "../../../hooks/useFetching";
import $api from "../../../http";
import {MyStatus} from "../../MyOffice/Statuses";
import Statistics from "./Statistics";

interface AxiosCityResponse {
    count: number,
    rows: City[]
}

const StatisticsContainer = () => {
    const [cities, setCities] = useState<City[]>([])
    const [masters, setMasters] = useState<City[]>([])
    const [fetching, isFetch] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    const [fetching2, isFetch2] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/masters`)
        console.log(2222222)
        setMasters(response.data.rows)
    })

    useEffect(() => {
        fetching()
        fetching2()
        return () => {
            setCities([])
        };
    }, [])
    if (isFetch2 || isFetch) return <div>Loading...</div>
        return (<Statistics cities={cities} masters={masters}/>);
};

export default StatisticsContainer;

