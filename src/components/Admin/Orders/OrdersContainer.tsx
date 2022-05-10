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
        /*const orderStatus = arr.find(s => s.name === status)
        orderStatus && setCurrentStatus(orderStatus)*/
        setStatuses(arr)
    })
/*    useEffect(() => {
        findStatuses()
        return () => setStatuses(null)
    }, [])*/
    return (<MyOrders statuses={statuses} cities={cities} isFetch={isFetch || isLoading}/>);
};

export default OrdersContainer;