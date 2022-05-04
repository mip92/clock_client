import React, {useEffect, useState} from 'react';
import Masters from "./Masters";
import {MasterContext} from "../../../context/masterContext";
import {City} from "../../../types/mainInterfacesAndTypes";
import {useFetching} from "../../../hooks/useFetching";
import $api from "../../../http";

interface AxiosCityResponse{
    count: number,
    rows: City[]
}

const MastersContainer = () => {
    const [cities, setCities] = useState<City[]>([] as City[])
    const [fetching, isFetch, error] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    useEffect(() => {
        fetching()
        return () => {
            setCities([])
        };
    }, [])
    return (
        <MasterContext.Provider value={{cities}}>
            <Masters cities={cities} isFetch={isFetch}/>
        </MasterContext.Provider>
    );
};

export default MastersContainer;