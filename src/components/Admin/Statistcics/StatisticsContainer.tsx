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
    const [isFetch, setIsFetch]=useState(true)
/*    const [fetching, isFetch] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    const [fetching2, isFetch2] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/masters`)
        setMasters(response.data.rows)
    })*/

    const fetch=()=>{
        $api.get<AxiosCityResponse>(`/masters`).then(response=>{
            setMasters(response.data.rows)
            $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`).then(response=> {
                setCities(response.data.rows)
            }).then(()=>{
                setIsFetch(false)
            })
        })


    }

    useEffect(() => {
        fetch()
        return () => {
            setCities([])
        };
    }, [])
    console.log(cities, masters)
    if (isFetch) return <div>Loading...</div>
        return (<Statistics cities={cities} masters={masters}/>);
};

export default StatisticsContainer;

