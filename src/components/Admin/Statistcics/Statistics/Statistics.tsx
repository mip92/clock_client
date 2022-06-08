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

export interface DataType {
    labels: string[],
    datasets: DataSet[] | undefined
}

export const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Dataset 1",
            data: [0, 10, 15, 120, 500, 470, 500],
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
            label: "Dataset 2",
            data: [400, 500, 500, 600, 500, 400, 600],
            backgroundColor: "rgba(53, 162, 235, 0.5)"
        }
    ]
};

const Statistics = ({cities, masters}) => {
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
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
        $api.get<DataType>(url).then((response) => {
            const date: string[] = []
            response.data.labels.map((label) => {
                date.push(new Date(label).toDateString())
            })
            setData({...response.data, labels: date})
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
                            <Button variant="contained" color='primary' onClick={() => getDataSet()}>Set Filters</Button>
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