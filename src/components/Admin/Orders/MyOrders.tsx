import React, {useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {usePaginatorWithReduxLimit} from "../../../hooks/usePaginatorWithReduxLimit";
import $api from "../../../http";
import {setCities} from "../../../actionCreators/adminCityActionCreators";
import {Order} from "../../../store/reducers/workplaceReducer";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import {Button, Input} from "@material-ui/core";
import s from "../../../style/Cities.module.css";
import ColumnButton from "../ColumnButton";
import OneCity from "../Cities/OneCity";
import MyModal from "../../utilits/MyModal";
import AddCity from "../Cities/AddCity";
import OneOrder from "./OneOrder";

export interface AxiosOrder {
    rows: Order[],
    count: number
}

const MyOrders = () => {
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
        return await $api.get<AxiosOrder>(`/order?offset=${offset}&limit=${currentLimit}&sortBy=${sortBy}&select=${select}&filter=${inputValue}`)
    }, setOrders, "masterName")
    useEffect(() => {
        fetching()
    }, [currentLimit, currentPage, sortBy, select])




    return (
        <div>
            <h3>Список заказов</h3>
            <div>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button onClick={() => fetching()}>Выбрать фильтры</Button>
                <table>
                    <tr>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'dateTime'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'masterEmail'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'masterName'} select={select}/>
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
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'totalPrice'} select={select}/>
                        </th>
                        <th>
                            <ColumnButton sortHandler={sortHandler} sortBy={sortBy} name={'status'} select={select}/>
                        </th>
                    </tr>
                    {!orders || isLoading ?
                        <div>
                            <div className={s.timelineItem}>
                                <div className={s.animatedBackground}>
                                </div>
                            </div>
                        </div>
                        :
                        // @ts-ignore
                        orders && orders.map((order, key) => <OneOrder key={key} order={order}/>)
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