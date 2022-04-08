/*
import React, {useEffect} from 'react';
import s from "../../style/Orders.module.css";
import {Input} from "@material-ui/core";
import {usePaginator} from "../../hooks/usePaginator";
import {OrderInterface} from "./Order";
import MyTable from "../utilits/MyTable";
import $api from "../../http";

export interface AxiosOrder {
    rows: OrderInterface[],
    count: number
}

const Orders: React.FC = () => {
    const [offset, limit, handleChange, changePage, currentPage, orders, isLoading, error, pagesArray, getOrders] = usePaginator(async () => {
        return await $api.get<AxiosOrder>(`/order?offset=${offset}&limit=${limit}`)
    })
    useEffect(() => {
        getOrders()
    }, [limit, currentPage])

    return (
        <div>
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
        </div>
    );
}
export default Orders*/


import React, {useEffect, useState} from 'react';
import {OrderInterface} from "../Admin/Order";
import {Button, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import Statuses from "../MyOffice/Statuses";
import $api from "../../http";
import {usePaginator} from "../../hooks/usePaginator";


interface active {
    name: string
    down: boolean
}

const useSortableData = (items: OrderInterface[], config) => {
    const [sortConfig, setSortConfig] = useState(config);
    const sortedItems = React.useMemo(() => {

        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key, activeSort, setActiveSort) => {
        //setActiveSort (prevState => ({name:prevState.name, down:!prevState.down}))
        if (activeSort.name == key) setActiveSort(prevState => ({name: prevState.name, down: !prevState.down}))
        else if (activeSort.name !== key) setActiveSort({name: key, down: true})
        let direction = 'ascending';
        if (
            sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    };

    return {items: sortedItems, requestSort, sortConfig};
};

const getString = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${d.getHours()}:00`
}

interface ProductTableProps {
    products: OrderInterface[]
}

const ProductTable: React.FC<ProductTableProps> = ({products}) => {
    const [activeSort, setActiveSort] = useState<active>({name: '', down: false})
    const {items, requestSort, sortConfig} = useSortableData(products, 'ascending');
    const btnConfig = ['dateTime', 'masterEmail', 'masterName', 'userEmail', 'userName', 'cityName', 'clockSize', 'dealPrice', 'totalPrice']

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5">All orders</Typography>
            <Table size="small" aria-label="a dense table">

                <thead>
                <tr>
                    {btnConfig.map((btn, key) =>
                        <th key={key}>
                            <Button
                                type="button"
                                onClick={() => requestSort(btn, activeSort, setActiveSort)}
                            >
                                {btn} {activeSort.name == btn && (activeSort.down == false ? '▲' : "▼")}
                            </Button>
                        </th>)}
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>

                {items.map((item) => (
                    <tr key={item.orderId}>
                        <td>{getString(item.dateTime)}</td>
                        <td>{item.masterEmail}</td>
                        <td>{item.masterName}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.userName}</td>
                        <td>{item.cityName}</td>
                        <td>{item.clockSize}</td>
                        <td>{item.dealPrice}</td>
                        <td>{(item.dealPrice && item?.clockSize) && item.dealPrice * item?.clockSize}</td>
                        <td><Statuses orderId={item.orderId} currentStatusId={item.statusId}/></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export interface AxiosOrder {
    rows: OrderInterface[],
    count: number
}


const Orders: React.FC = () => {
    const [offset, limit, handleChange, changePage, currentPage, orders, isLoading, error, pagesArray, getOrders] = usePaginator(async () => {
        return await $api.get<AxiosOrder>(`/order?offset=${offset}&limit=${limit}`)
    })
    useEffect(() => {
        getOrders()
    }, [limit, currentPage])
    return (
        <div>
            {orders && <ProductTable products={orders}/>}
        </div>
    );
}
export default Orders