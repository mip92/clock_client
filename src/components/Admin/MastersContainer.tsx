import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import Masters from "./Masters";
import {MasterContext} from "../../context/masterContext";
import {City} from "../../types/mainInterfacesAndTypes";
import {useFetching} from "../../hooks/useFetching";
import axios from "axios";
import $api from "../../http";

const MastersContainer = () => {
    const [cities, setCities] = useState<City[]>([{
        cityName: '',
        createdAt: '',
        updatedAt: '',
        id: 0,
        price: 0
    }])
    const [fetching, isFetch, error] = useFetching(async () => {
        const response = await $api.get(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    useEffect(() => {
        fetching()
        return () => {
            setCities([])
        };
    }, [])
    return (
        <MasterContext.Provider value={{
            cities
        }}>
            <Masters cities={cities} isFetch={isFetch}/>
        </MasterContext.Provider>
    );
};

export default MastersContainer;