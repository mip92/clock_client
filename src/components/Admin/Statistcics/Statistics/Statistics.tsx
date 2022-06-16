import React, {useEffect, useState} from 'react';
import $api from "../../../../http";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {MyStatus} from "../../../MyOffice/Statuses";
import s from "../../../../style/Statistics.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import MyBar from "./MyBar";
import SortByStatistics from "./SortByStatistics";
import {Button} from "@material-ui/core";
import {COLORS} from "../../../../enums/Colors";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {position: "top" as const},
        title: {display: true, text: "Count orders of masters"}
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
        },
    },
};


export interface DataSet {
    label: string,
    data: number[],
    backgroundColor: string
}

export interface AxiosDataSet {
    label: string,
    data: number[],
    backgroundColor
}

export interface DataType {
    labels: string[],
    datasets: DataSet[] | undefined
}

export interface AxiosDataType {
    labels: string[],
    datasets: AxiosDataSet[] | undefined
}

let newestDate = new Date(Date.now())
newestDate.setHours(0)
newestDate.setMinutes(0)
newestDate.setSeconds(0)
newestDate.setMilliseconds(0)

let oldestDate = new Date(newestDate)
oldestDate.setDate(oldestDate.getDate() - 30)

const Statistics = ({cities, masters}) => {
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(oldestDate);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(newestDate);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [currentMasters, setArrayCurrentMasters] = useState<number[]>([])
    const [status, setStatus] = useState<MyStatus[]>([]);
    const [isFetch, setIsFetch] = useState(false)
    const [myData, setData] = useState<DataType>({} as DataType)
    const [error, setError] = useState('')
    const getDataSet = () => {
        setError('')
        const currentStatusesName: string[] = []
        status.map((s) => {
            return currentStatusesName.push(s.name)
        })
        const isoDateStart = dateStart?.toISOString()
        const isoDateFinish = dateFinish?.toISOString()
        const url = `/order/getOrdersByDate?masterId=${currentMasters}&cities=${currentArray}&dateStart=${isoDateStart}&dateFinish=${isoDateFinish}&status=${currentStatusesName}`
        $api.get<AxiosDataType>(url).then((response) => {
            const date: string[] = []
            response.data.labels.map((label) => {
                date.push(new Date(label).toDateString())
            })

            let dataSets: DataSet[] |undefined | AxiosDataSet[] = response.data.datasets
            response && response.data && response.data.datasets && dataSets && dataSets.map((oneData,key) => oneData.backgroundColor = COLORS[key])
            setData({datasets: dataSets, labels: date})
            setIsFetch(false)
        }).catch((err) => setError(JSON.parse(err.request.responseText).message))
    }

    useEffect(() => {
        getDataSet()
    }, [])
    if (isFetch) return <div>Loading</div>
    return (
        <div className={s.wrapper}>
            <div className={s.sort}>
                <SortByStatistics cities={cities} dateFinish={dateFinish} dateStart={dateStart} masters={masters}
                                  setArrayCurrentCities={setArrayCurrentCities}
                                  setArrayCurrentMasters={setArrayCurrentMasters} setDateFinish={setDateFinish}
                                  setDateStart={setDateStart}/>
            </div>
            <div className={s.content}>
                <div className={s.contentBody}>
                    <div className={s.btn}>
                        <div className={s.content}>
                            <Button variant="contained" color='primary' onClick={() => getDataSet()}>Set
                                Filters</Button>
                        </div>
                    </div>
                    <div>
                        {!myData.labels ? <div>Loading</div>
                            : error ? <div>{error}</div>
                                :
                                <div>
                                    <MyBar myData={myData}/>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;