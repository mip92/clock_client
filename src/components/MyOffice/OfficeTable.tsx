import React, {useState} from 'react';
import {OrderInterface} from "../Admin/Order";
import {Button, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import Statuses from "./Statuses";


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
    const btnConfig = ['dateTime', 'masterEmail', 'masterName', 'cityName', 'clockSize', 'dealPrice', 'totalPrice']

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5">My orders</Typography>
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

interface OrdersProps {
    orders: OrderInterface[] | null
}

const OfficeTable: React.FC<OrdersProps> = ({orders}) => {
    return (
        <div>
            {orders && <ProductTable products={orders}/>}
        </div>
    );
}
export default OfficeTable