import React, {useEffect, useState} from 'react';
import {Button, Input, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import Statuses from "../../MyOffice/Statuses";
import $api from "../../../http";
import {Order} from "../../../store/reducers/workplaceReducer";
import {usePaginatorWithRedux} from "../../../hooks/usePaginatorWithRedux";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import s from "../../../style/MyWorkplace.module.css";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import OrderTable from "./OrderTable";

export interface AxiosOrder {
    rows: Order[],
    count: number
}

const Orders: React.FC = () => {
    const {orders}=useTypedSelector(state => state.workplase)
    const {offset, limit, handleChange, changePage, currentPage, isLoading, error, pagesArray, fetching} = usePaginatorWithRedux(async () => {
        return await $api.get<AxiosOrder>(`/order?offset=${offset}&limit=${limit}`)
    }, setOrders)
    useEffect(() => {
        fetching()
    }, [limit, currentPage])

    if (isLoading) return <div>Загрузка</div>
    return (
        <div>
            <OrderTable orders={orders}/>
            {pagesArray.map((p: number, key: React.Key) => <span
                className={currentPage === p ? s.page_current : s.page}
                key={key}
                onClick={() => changePage(p)}
            >{p}</span>)}
            <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
            <Input
                style={{width: 40}}
                type='number'
                value={limit}
                onChange={handleChange}
                placeholder="Городов в поле"
                color="primary"
                inputProps={{'aria-label': 'description'}}
            />
        </div>
    )
}
export default Orders