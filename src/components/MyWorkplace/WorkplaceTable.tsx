import React, {useState} from 'react';
import {OrderInterface} from "../Admin/Order";
import {Button, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import Statuses from "../MyOffice/Statuses";
import {Order} from "../../store/reducers/workplaceReducer";
import {log} from "util";

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

const ProductTable: React.FC<ProductTableProps> = ({products}) => {
    const [activeSort, setActiveSort] = useState<active>({name: '', down: false})
    const {items, requestSort, sortConfig} = useSortableData(products, 'ascending');
    const btnConfig = ['dateTime', 'userEmail', 'userName', 'cityName', 'clockSize', 'dealPrice', 'totalPrice']
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
                    <tr key={item.id}>
                        <td>{getString(item.master_busyDate.dateTime)}</td>
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

interface OrdersProps {
    orders: Order[] | null
}

const WorkplaceTable: React.FC<OrdersProps> = ({orders}) => {
    return (
        <div>
            {orders && <ProductTable products={orders}/>}
        </div>
    );
}
export default WorkplaceTable