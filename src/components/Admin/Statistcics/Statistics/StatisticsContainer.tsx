import React, {useEffect, useState} from 'react';
import {City} from "../../../../types/mainInterfacesAndTypes";
import $api from "../../../../http";
import Statistics from "./Statistics";

interface AxiosCityResponse {
    count: number,
    rows: City[]
}


const StatisticsContainer = () => {
    const [cities, setCities] = useState<City[]>([])
    const [masters, setMasters] = useState<City[]>([])
    const [isFetch, setIsFetch] = useState(true)

    const fetch = () => {
        $api.get<AxiosCityResponse>(`/masters`).then(response => {
            setMasters(response.data.rows)
            $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`).then(response => {
                setCities(response.data.rows)
            }).then(() => {
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
    if (isFetch) <div>Loading...</div>

    return (
        <Statistics cities={cities} masters={masters}/>
    );
};

export default StatisticsContainer;

