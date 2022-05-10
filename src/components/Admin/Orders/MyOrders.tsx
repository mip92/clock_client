import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import {Order} from "../../../store/reducers/workplaceReducer";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import {Button, Input} from "@material-ui/core";
import s from "../../../style/Cities.module.css";
import ColumnButton from "../ColumnButton";
import OneOrder from "./OneOrder";
import RangeSlider from "./RangeSlider";
import {useFetching} from "../../../hooks/useFetching";
import CitiesMultySelect from "../Cities/CitiesMultySelect";
import DateStart from "./DateStart";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import MultipleSelect from "./MultySelect";
import MultipleSelectObject from "./MultySelectObject";
import {City} from "../../../types/mainInterfacesAndTypes";
import {MyStatus} from "../../MyOffice/Statuses";

export interface AxiosOrder {
    rows: Order[],
    count: number
}
interface MyOrdersProps {
    cities: City[],
    isFetch: boolean,
    statuses: MyStatus[] | null
}
const MyOrders:React.FC<MyOrdersProps> = ({cities, isFetch, statuses}) => {
    const {orders} = useTypedSelector(state => state.workplase)
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
        dateFinish && dateStart && console.log(new Date(dateFinish), new Date(dateStart))
        const st:string[] = []
        status.map((s) =>{return st.push(s.name)})
        const url = `/order?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&filterMaster=${inputValue}&filterUser=${userValue}&minDealPrice=${currentRangeDeal[0]}&maxDealPrice=${currentRangeDeal[1]}&minTotalPrice=${currentRangeTotal[0]}&maxTotalPrice=${currentRangeTotal[1]}&cities=${currentArray}&dateStart=${dateStart}&dateFinish=${dateFinish}&clockSize=${clockSize}&status=${st}`
        console.log(url)
        return await $api.get<AxiosOrder>(url)
    }, setOrders, "masterName")

    interface DealPrice {
        minDealPrice: number,
        maxDealPrice: number
    }

    interface TotalPrice {
        minTotalPrice: number,
        maxTotalPrice: number
    }

    const [rangeDealPrice, setRangeDealPrice] = useState<DealPrice>({} as DealPrice)
    const [currentRangeDeal, setCurrentRangeDeal] = React.useState<number[]>([]);
    const [rangeTotalPrice, setRangeTotalPrice] = useState<TotalPrice>({} as TotalPrice)
    const [currentRangeTotal, setCurrentRangeTotal] = React.useState<number[]>([]);
    const [currentArray, setArrayCurrentCities] = useState<number[]>([])
    const [dateStart, setDateStart] = useState<MaterialUiPickersDate>(null);
    const [dateFinish, setDateFinish] = useState<MaterialUiPickersDate>(null);

    interface AxiosGetRange {
        minDealPrice: number,
        maxDealPrice: number,
        minTotalPrice: number,
        maxTotalPrice: number,
    }

    const [getRange, isFetchRange, errorRange] = useFetching(async () => {
        $api.get<AxiosGetRange>(`/order/minMax`).then((response) => {
            setRangeDealPrice({minDealPrice: response.data.minDealPrice, maxDealPrice: response.data.maxDealPrice})
            setRangeTotalPrice({minTotalPrice: response.data.minTotalPrice, maxTotalPrice: response.data.maxTotalPrice})
            setCurrentRangeDeal([response.data.minDealPrice, response.data.maxDealPrice])
            setCurrentRangeTotal([response.data.minTotalPrice, response.data.maxTotalPrice])
        })
    })


    useEffect(() => {
        /*.then(() => {
                console.log(2)
                console.log(offset,currentLimit, sortBy, select, inputValue, userValue, currentRange)
                fetching()
            })*/
        console.log(3)
        console.log(offset, currentLimit, sortBy, select, inputValue, userValue, currentRangeDeal)
        fetching()
    }, [currentLimit, currentPage, sortBy, select])

    useEffect(() => {
        if (currentRangeDeal.length === 0) {
            getRange()
        }
    }, [currentRangeDeal])
    const [userValue, setUserValue,] = useState<string>('')
    const [clockSize, setClockSize] = React.useState<string[]>([]);
    const [status, setStatus] = React.useState<MyStatus[]>([]);

    return (
        <div>
            <h3>Список заказов</h3>
            <div>
                <CitiesMultySelect cities={cities} setArrayCurrentCities={setArrayCurrentCities}/>
                <Input placeholder="Master name or email" value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}/>
                <Input placeholder="User name or email" value={userValue}
                       onChange={(e) => setUserValue(e.target.value)}/>
                <RangeSlider name="Deal Price"
                             min={rangeDealPrice.minDealPrice}
                             max={rangeDealPrice.maxDealPrice}
                             currentRange={currentRangeDeal}
                             setCurrentRange={setCurrentRangeDeal}/>
                <RangeSlider name="Total Price"
                             min={rangeTotalPrice.minTotalPrice}
                             max={rangeTotalPrice.maxTotalPrice}
                             currentRange={currentRangeTotal}
                             setCurrentRange={setCurrentRangeTotal}/>
                <DateStart date={dateStart} setDate={setDateStart} label='date start sort'/>
                <DateStart date={dateFinish} setDate={setDateFinish} label='date finish sort'/>
                <MultipleSelect name="Clock size" arr={['1', '2', '3']} correctName={clockSize}
                                setCorrectName={setClockSize}/>
                <MultipleSelectObject name="Status" arr={statuses} correctName={status} setCorrectName={setStatus}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <table>
                    <tr>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'dateTime'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'masterEmail'}
                                          select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'masterName'}
                                          select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'userEmail'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'userName'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'city'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'clockSize'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'dealPrice'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'totalPrice'}
                                          select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'status'} select={select}/>
                        </th>
                    </tr>
                    {!orders || isLoading || isFetchRange || isFetch ?

                        <tr className={s.timelineItem}>
                            <th className={s.animatedBackground}>
                            </th>
                        </tr>

                        :
                        // @ts-ignore
                        orders && orders.map((order, key) => <OneOrder key={key} order={order} statuses={statuses}/>)
                    }
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