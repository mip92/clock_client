import React, {useEffect, useState} from 'react';
import WorkplaceTable from './WorkplaceTable';
import {useParams} from "react-router-dom";
import {usePaginatorWithRedux} from "../../hooks/usePaginatorWithRedux";
import $api from "../../http";
import s from "../../style/MyWorkplace.module.css";
import {setOrders} from "../../actionCreators/workplaseActionCreators";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Button, Input} from "@material-ui/core";
import ColumnButton from "../Admin/ColumnButton";
import {usePaginatorWithReduxLimit} from "../../hooks/usePaginatorWithReduxLimit";
import {AxiosGetRange, AxiosOrder, DealPrice, TotalPrice} from "../Admin/Orders/MyOrders";
import {MyStatus} from "../MyOffice/Statuses";
import {useFetching} from "../../hooks/useFetching";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {initStateWorkPlace} from "../../store/reducers/workplaceReducer";
import OneOrder from "../Admin/Orders/OneOrder";
import OrderFilters from "../Admin/Orders/OrderFilters";
import OneMsterOrder from "./OneMasterOrder";

const MyWorkplace = ({cities, isFetch, statuses}) => {
    const {masterId} = useParams<{ masterId: string }>();

    const THButtons = ['dateTime', 'userEmail', 'userName', 'city', 'clockSize', 'dealPrice', 'totalPrice', 'status']

    const {orders} = useTypedSelector(state => state.workPlase)
    const [status, setStatus] = useState<MyStatus[]>([]);
    const [rangeDealPrice, setRangeDealPrice] = useState<DealPrice>({} as DealPrice)
    const [currentRangeDeal, setCurrentRangeDeal] = useState<number[]>([]);
    const [rangeTotalPrice, setRangeTotalPrice] = useState<TotalPrice>({} as TotalPrice)
    const [currentRangeTotal, setCurrentRangeTotal] = useState<number[]>([]);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [clockSize, setClockSize] = useState<string[]>([]);

    const {
        offset,
        changePage,
        currentPage,
        isLoading,
        error,
        pagesArray,
        fetching,
        limitArray,
        currentLimit,
        changeLimit,
        sortBy,
        select,
        inputValue,
        setInputValue,
        sortHandler
    } = usePaginatorWithReduxLimit(async () => {
        const st: string[] = []
        status.map((s) => {
            return st.push(s.name)
        })
        const url = `/order?offset=${offset}&limit=${currentLimit}&masterId=${masterId}&sortBy=${sortBy}&select=${select}&filterUser=${inputValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${clockSize}&status=${st}`
        return await $api.get<AxiosOrder>(url)
    }, setOrders, "userName")

    const [getRange, isFetchRange, errorRange] = useFetching(async () => {
        $api.get<AxiosGetRange>(`/order/minMax/${masterId}`).then((response) => {
            setRangeDealPrice({minDealPrice: response.data.minDealPrice, maxDealPrice: response.data.maxDealPrice})
            setRangeTotalPrice({minTotalPrice: response.data.minTotalPrice, maxTotalPrice: response.data.maxTotalPrice})
            setCurrentRangeDeal([response.data.minDealPrice, response.data.maxDealPrice])
            setCurrentRangeTotal([response.data.minTotalPrice, response.data.maxTotalPrice])
        })
    })

    useEffect(() => {
        console.log(1111111)
        console.log(rangeDealPrice, rangeTotalPrice)
        if (rangeDealPrice && rangeTotalPrice) fetching()
    }, [currentLimit, currentPage, sortBy, select])

    useEffect(() => {
        if (currentRangeDeal.length === 0) {
            getRange()
        }
    }, [currentRangeDeal])
    const getExcel = () =>{
        const st: string[] = []
        status.map((s) => {
            return st.push(s.name)
        })
        const url = `/order/getExcel?masterId=${masterId}&sortBy=${sortBy}&select=${select}&filterUser=${inputValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${clockSize}&status=${st}`
        $api.get<AxiosOrder>(url)
    }


    if (isLoading) return <div>Загрузка</div>
    return (
        <div>
            <div>
                <OrderFilters cities={cities} clockSize={clockSize} currentRangeDeal={currentRangeDeal}
                              currentRangeTotal={currentRangeTotal}
                              dateFinish={dateFinish} dateStart={dateStart} inputValue={inputValue}
                              rangeDealPrice={rangeDealPrice} rangeTotalPrice={rangeTotalPrice}
                              setArrayCurrentCities={setArrayCurrentCities} setClockSize={setClockSize}
                              setCurrentRangeDeal={setCurrentRangeDeal} setCurrentRangeTotal={setCurrentRangeTotal}
                              setDateFinish={setDateFinish} setDateStart={setDateStart} setInputValue={setInputValue}
                              setStatus={setStatus}  statuses={statuses}
                               status={status}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <Button onClick={() => getExcel()}>Получить Excel</Button>
                <table>
                    <tbody>
                    <tr>
                        {THButtons.map((name, key) =>
                            <th key={key}>
                                <ColumnButton sortHandler={sortHandler} sortBy={sortBy}
                                              name={name} select={select}/>
                            </th>
                        )}
                    </tr>
                    {!orders || isLoading || isFetchRange || isFetch ?
                        <tr className={s.timelineItem}>
                            <th className={s.animatedBackground}>
                            </th>
                        </tr>
                        :
                        orders !== initStateWorkPlace.orders && orders.map((order, key) => <OneMsterOrder key={key}
                                                                                                     order={order}
                                                                                                     statuses={statuses}/>)
                    }
                    </tbody>
                </table>
            </div>
            {
                pagesArray.map((p: number, key: React.Key) => <span
                    className={currentPage === p ? s.page_current : s.page}
                    key={key}
                    onClick={() => changePage(p)}
                >{p}</span>)
            }
            <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
            {limitArray.map((l, key: React.Key) => <span
                className={currentLimit === l ? s.page_limit : s.limit}
                key={key}
                onClick={() => changeLimit(l)}
            >{l}</span>)
            }
        </div>
    );
};

export default MyWorkplace;