import React, {useEffect, useState} from 'react';
import {Button, Input, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import Statuses from "../../MyOffice/Statuses";
import $api from "../../../http";
import {Order} from "../../../store/reducers/workplaceReducer";
import {usePaginatorWithRedux} from "../../../hooks/usePaginatorWithRedux";
import {setOrders} from "../../../actionCreators/workplaseActionCreators";
import s from "../../../style/MyWorkplace.module.css";
import {useTypedSelector} from "../../../hooks/useTypedSelector";


interface active {
    name: string
    down: boolean
}

const useSortableData = (items: Order[], config) => {
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
    products: Order[]
}

interface OrdersProps {
    orders: Order[] | null
}
const MyTable: React.FC<OrdersProps> = ({orders}) => {
    return (
        <div>
            {orders && <ProductTable products={orders}/>}
        </div>
    );
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
                    <tr key={item.id}>
                        <td>{item.master_busyDate.dateTime}</td>
                        <td>{item.master.email}</td>
                        <td>{item.master.name}</td>
                        <td>{item.user.email}</td>
                        <td>{item.user.name}</td>
                        <td>{item.originalCityName}</td>
                        <td>{item.clockSize}</td>
                        <td>{item.dealPrice}</td>
                        <td>{(item.dealPrice && item?.clockSize) && item.dealPrice * item?.clockSize}</td>
                        <td><Statuses orderId={item.id} status={item.status}/></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

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
            <MyTable orders={orders}/>
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