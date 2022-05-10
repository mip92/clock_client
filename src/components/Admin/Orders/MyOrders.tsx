import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import {initStateWorkPlace, Order} from "../../../store/reducers/workplaceReducer";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import {Button} from "@material-ui/core";
import s from "../../../style/Cities.module.css";
import ColumnButton from "../ColumnButton";
import OneOrder from "./OneOrder";
import {useFetching} from "../../../hooks/useFetching";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {City} from "../../../types/mainInterfacesAndTypes";
import {MyStatus} from "../../MyOffice/Statuses";
import OrderFilters from "./OrderFilters";

export interface DealPrice {
    minDealPrice: number,
    maxDealPrice: number
}

export interface TotalPrice {
    minTotalPrice: number,
    maxTotalPrice: number
}

export interface AxiosOrder {
    rows: Order[],
    count: number
}

interface MyOrdersProps {
    cities: City[],
    isFetch: boolean,
    statuses: MyStatus[] | null
}

export interface AxiosGetRange {
    minDealPrice: number,
    maxDealPrice: number,
    minTotalPrice: number,
    maxTotalPrice: number,
}

const MyOrders: React.FC<MyOrdersProps> = ({cities, isFetch, statuses}) => {
    const {orders} = useTypedSelector(state => state.workPlase)
    const [rangeDealPrice, setRangeDealPrice] = useState<DealPrice>({} as DealPrice)
    const [currentRangeDeal, setCurrentRangeDeal] = useState<number[]>([]);
    const [rangeTotalPrice, setRangeTotalPrice] = useState<TotalPrice>({} as TotalPrice)
    const [currentRangeTotal, setCurrentRangeTotal] = useState<number[]>([]);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);
    const [userValue, setUserValue,] = useState<string>('')
    const [clockSize, setClockSize] = useState<string[]>([]);
    const [status, setStatus] = useState<MyStatus[]>([]);
    const THButtons = ['dateTime', 'masterEmail', 'masterName', 'userEmail', 'userName', 'city', 'clockSize', 'dealPrice', 'totalPrice', 'status']

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
        const url = `/order?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&filterMaster=${inputValue}&filterUser=${userValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${clockSize}&status=${st}`
        return await $api.get<AxiosOrder>(url)
    }, setOrders, "masterName")

    const [getRange, isFetchRange, errorRange] = useFetching(async () => {
        $api.get<AxiosGetRange>(`/order/minMax`).then((response) => {
            setRangeDealPrice({minDealPrice: response.data.minDealPrice, maxDealPrice: response.data.maxDealPrice})
            setRangeTotalPrice({minTotalPrice: response.data.minTotalPrice, maxTotalPrice: response.data.maxTotalPrice})
            setCurrentRangeDeal([response.data.minDealPrice, response.data.maxDealPrice])
            setCurrentRangeTotal([response.data.minTotalPrice, response.data.maxTotalPrice])
        })
    })


    useEffect(() => {
        if (!rangeDealPrice && !rangeTotalPrice) fetching()
    }, [currentLimit, currentPage, sortBy, select])

    useEffect(() => {
        if (currentRangeDeal.length === 0) {
            getRange()
        }
    }, [currentRangeDeal])

    return (
        <div>
            <h3>Список заказов</h3>
            <div>
                <OrderFilters cities={cities} clockSize={clockSize} currentRangeDeal={currentRangeDeal}
                              currentRangeTotal={currentRangeTotal}
                              dateFinish={dateFinish} dateStart={dateStart} inputValue={inputValue}
                              rangeDealPrice={rangeDealPrice} rangeTotalPrice={rangeTotalPrice}
                              setArrayCurrentCities={setArrayCurrentCities} setClockSize={setClockSize}
                              setCurrentRangeDeal={setCurrentRangeDeal} setCurrentRangeTotal={setCurrentRangeTotal}
                              setDateFinish={setDateFinish} setDateStart={setDateStart} setInputValue={setInputValue}
                              setStatus={setStatus} setUserValue={setUserValue} statuses={statuses}
                              userValue={userValue} status={status}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
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
                        orders !== initStateWorkPlace.orders && orders.map((order, key) => <OneOrder key={key}
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

export default MyOrders;