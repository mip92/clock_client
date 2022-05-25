import React, {useEffect, useState} from 'react';
import MyWorkplace from "./MyWorkplace";
import {MyStatus} from "../MyOffice/Statuses";
import {City} from "../../types/mainInterfacesAndTypes";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";
import {AxiosGetRange, DealPrice, TotalPrice} from "../Admin/Orders/MyOrders";
import {useParams} from "react-router-dom";

interface AxiosCityResponse {
    count: number,
    rows: City[]
}

const MyWorkPlaceContainer = () => {
    const {masterId} = useParams<{ masterId: string }>();
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

    const [statuses, setStatuses] = useState<MyStatus[] | null>([] as MyStatus[])
    const [findStatuses, isLoading, errorfindStatuses, setFindStatusesError] = useFetching(async () => {
        const res = await $api.get(`/status`)
        let arr:MyStatus[] = []
        let k = 1
        const keys = Object.keys(res.data);
        keys.forEach(key => {
            arr.push({createdAt: "", updatedAt: "", id: k, name: key})
            k++
        });
        setStatuses(arr)
    })
    const [rangeDealPrice, setRangeDealPrice] = useState<DealPrice>({} as DealPrice)
    const [currentRangeDeal, setCurrentRangeDeal] = useState<number[]>([]);
    const [rangeTotalPrice, setRangeTotalPrice] = useState<TotalPrice>({} as TotalPrice)
    const [currentRangeTotal, setCurrentRangeTotal] = useState<number[]>([]);
    const [getRange, isFetchRange, errorRange] = useFetching(async () => {
        $api.get<AxiosGetRange>(`/order/minMax/${masterId}`).then((response) => {
            setRangeDealPrice({minDealPrice: response.data.minDealPrice, maxDealPrice: response.data.maxDealPrice})
            setRangeTotalPrice({minTotalPrice: response.data.minTotalPrice, maxTotalPrice: response.data.maxTotalPrice})
            setCurrentRangeDeal([response.data.minDealPrice, response.data.maxDealPrice])
            setCurrentRangeTotal([response.data.minTotalPrice, response.data.maxTotalPrice])
        })
    })

    useEffect(() => {
        if (currentRangeDeal.length === 0 || currentRangeDeal == []) {
            getRange()
        }
    }, [currentRangeDeal])

    return (<MyWorkplace currentRangeDeal={currentRangeDeal}
                         currentRangeTotal={currentRangeTotal}
                         cities={cities}
                         rangeDealPrice={rangeDealPrice}
                         rangeTotalPrice={rangeTotalPrice}
                         setCurrentRangeDeal={setCurrentRangeDeal}
                         setCurrentRangeTotal={setCurrentRangeTotal}
                         isFetch={isFetch || isFetchRange || isLoading}
                         statuses={statuses}/>);
};

export default MyWorkPlaceContainer;