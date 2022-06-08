import React, {useEffect, useState} from 'react';
import $api from "../../../../http";
import StatisticsTable from "./StatisticsTable";

interface MasterStatisticInterface {
    name: string,
    small: number,
    middle: number,
    big: number,
    rating: number| null,
    totalCompleted: number,
    totalNotCompleted : number,
    totalSum : number,
    id: Date
}

const StatisticsTableContainer = () => {
    const [isFetch, setIsFetch] = useState(true)
    const [data, setData] = useState<MasterStatisticInterface[]>()

    const fetch = () => {
        $api.get<MasterStatisticInterface[]>(`/order/getStatisticsByMaster`).then(response => {
            setData(response.data)
            console.log(response.data)
        }).then(() => {
            setIsFetch(false)
        })
    }

    useEffect(() => {
        fetch()
    }, [])
    console.log(data)
    if (isFetch) return <div>Loading...</div>
    return (<StatisticsTable data={data}/>);
};

export default StatisticsTableContainer;