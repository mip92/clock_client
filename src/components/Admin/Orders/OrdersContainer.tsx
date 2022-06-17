import React, {useEffect, useState} from 'react';
import {City} from "../../../types/mainInterfacesAndTypes";
import {useFetching} from "../../../hooks/useFetching";
import $api from "../../../http";
import MyOrders, {AxiosGetRange, DealPrice, TotalPrice} from "./MyOrders";
import {MyStatus} from "../../MyOffice/Statuses";


interface AxiosCityResponse {
    count: number,
    rows: City[]
}

const OrdersContainer = () => {
    const [cities, setCities] = useState<City[]>([])
    const [rangeDealPrice, setRangeDealPrice] = useState<DealPrice>({} as DealPrice)
    const [currentRangeDeal, setCurrentRangeDeal] = useState<number[]>([]);
    const [rangeTotalPrice, setRangeTotalPrice] = useState<TotalPrice>({} as TotalPrice)
    const [currentRangeTotal, setCurrentRangeTotal] = useState<number[]>([]);
    const [serverError, setServerError] = useState('')
    const [fetching, isFetch] = useFetching(async () => {
        const response = await $api.get<AxiosCityResponse>(`/cities?offset=0&limit=50`)
        setCities(response.data.rows)
    })
    const clockSizes: MyStatus[] = [
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
        let arr: MyStatus[] = []
        let k = 1
        const keys = Object.keys(res.data);
        keys.forEach(key => {
            arr.push({id: k, name: key})
            k++
        });
        setStatuses(arr)
    })
    useEffect(() => {
        if (currentRangeDeal.length === 0) {
            getRange()
        }
    }, [currentRangeDeal])
    const [getRange, isFetchRange] = useFetching(async () => {
        $api.get<AxiosGetRange>(`/order/minMax/all`).then((response) => {
            setRangeDealPrice({minDealPrice: response.data.minDealPrice, maxDealPrice: response.data.maxDealPrice})
            setRangeTotalPrice({minTotalPrice: response.data.minTotalPrice, maxTotalPrice: response.data.maxTotalPrice})
            setCurrentRangeDeal([response.data.minDealPrice, response.data.maxDealPrice])
            setCurrentRangeTotal([response.data.minTotalPrice, response.data.maxTotalPrice])
        }).catch((e) => {
            setServerError(e.response.data.message)
        })
    })
    if(serverError) return <div>{serverError}</div>
    if (cities.length === 0 || !statuses || !currentRangeDeal[0] || !currentRangeTotal[0]) return <div>Loading...</div>
    return (<MyOrders
        currentRangeDeal={currentRangeDeal}
        currentRangeTotal={currentRangeTotal}
        cities={cities}
        rangeDealPrice={rangeDealPrice}
        rangeTotalPrice={rangeTotalPrice}
        setCurrentRangeDeal={setCurrentRangeDeal}
        setCurrentRangeTotal={setCurrentRangeTotal}
        isFetch={isFetch || isFetchRange || isLoading}
        isFetchRange={isFetchRange}
        statuses={statuses}
        clockSizes={clockSizes}/>);
};

export default OrdersContainer;