import React, {useEffect, useState} from 'react';
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import {AxiosOrder} from "../Orders/MyOrders";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {MyStatus} from "../../MyOffice/Statuses";
import s from "../../../style/OrderFilters.module.css";
import CitiesMultySelect from "../Cities/CitiesMultySelect";
import DateStart from "../Orders/DateStart";
import MastersMultySelect from "./MastersMultySelect";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import {Bar} from "react-chartjs-2";


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
        title: {display: true, text: "Chart.js Bar Chart"}
    }
};

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
    const [myData, setData] = useState(data)
    const getDataSet = () => {
        const currentStatusesName: string[] = []
        status.map((s) => {
            return currentStatusesName.push(s.name)
        })
        const isoDateStart = dateStart?.toISOString()
        const isoDateFinish = dateFinish?.toISOString()
        console.log(currentMasters, currentArray, isoDateStart, isoDateFinish, currentStatusesName)
        const url = `/order/getOrdersByDate?masterId=${currentMasters}&cities=${currentArray}&dateStart=${isoDateStart}&dateFinish=${isoDateFinish}&status=${currentStatusesName}`
        $api.get(url).then((response) => {
            setIsFetch(false)
            setData(response.data)
        })
    }
    console.log(isFetch)

    /*    useEffect(() => {
            getDataSet()
        }, [currentArray, dateStart, dateFinish, currentMasters])*/
    if (isFetch) return <div>Loading</div>
    return (
        <div>
            <button onClick={() => getDataSet()}></button>
            <div className={s.item}>
                <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
            </div>
            <div className={s.item}>
                <MastersMultySelect masters={masters} setArrayCurrentMasters={setArrayCurrentMasters}/>
            </div>
            <div className={s.date}>
                <DateStart date={dateStart} setDate={setDateStart} label='Date start sort'/>
            </div>
            <div className={s.date}>
                <DateStart date={dateFinish} setDate={setDateFinish} label='Date finish sort'/>
            </div>

            <Bar options={options} data={myData}/>
        </div>
    );
};

export default Statistics;