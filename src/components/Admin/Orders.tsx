import React, {useEffect} from 'react';
import s from "../../style/Orders.module.css";
import {Input} from "@material-ui/core";
import {usePaginator} from "../../hooks/usePaginator";
import axios from "axios";
import {OrderInterface} from "./Order";
import MyTable from "../utilits/MyTable";
import Navbar from "./Navbar";

interface AxiosOrder {
    rows: OrderInterface[],
    count: number
}

const Orders: React.FC = () => {
    const [offset, limit, handleChange, changePage, currentPage, orders, isLoading, error, pagesArray, getOrders] = usePaginator(async () => {
        return await axios.get<AxiosOrder>(`${process.env.REACT_APP_SERVER_URL}/api/order?offset=${offset}&limit=${limit}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    })
    useEffect(() => {
        getOrders()
    }, [limit, currentPage])

    return (
        <Navbar>
            <h3>Список заказов</h3>
            <MyTable rows={orders}/>
            <div>
                <div className={s.page_wrapper}>
                    {pagesArray.map((p, key) => <span
                        className={currentPage === p ? s.page_current : s.page}
                        key={key}
                        onClick={() => changePage(p)}
                    >{p}</span>)}
                    <span style={{marginLeft: 30, padding: 5}}>Лимит</span>
                    <Input
                        style={{width: 20}}
                        value={limit}
                        onChange={handleChange}
                        placeholder="Заказов в поле"
                        color="primary"
                        inputProps={{'aria-label': 'description'}}
                    />
                </div>
            </div>
        </Navbar>
    );
}
export default Orders