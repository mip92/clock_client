import React, {useEffect, useState} from 'react';
import {City} from "../../../types/mainInterfacesAndTypes";
import {useFetching} from "../../../hooks/useFetching";
import $api from "../../../http";
import MyOrders from "./MyOrders";
import {MyStatus} from "../../MyOffice/Statuses";

interface AxiosCityResponse{
    count: number,
    rows: City[]
}

const OrdersContainer = () => {
    const [cities, setCities] = useState<City[]>([])
    const [fetching, isFetch] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    const clockSizes:MyStatus[] = [
        {id: 1, name: 'small'},
        {id: 2, name: 'middle'},
        {id: 3, name: 'big'},]
    useEffect(() => {
        fetching()
        findStatuses()
        return () => {
            setCities([])
            setStatuses(null)
        };
    }, [])

    const [statuses, setStatuses] = useState<MyStatus[] | null>([])
    const [findStatuses, isLoading] = useFetching(async () => {
        const res = await $api.get(`/status`)
        let arr:MyStatus[] = []
        let k = 1
        const keys = Object.keys(res.data);
        keys.forEach(key => {
            arr.push({id: k, name: key})
            k++
        });
        setStatuses(arr)
    })

    return (<MyOrders statuses={statuses} cities={cities} isFetch={isFetch || isLoading} clockSizes={clockSizes}/>);
};

export default OrdersContainer;