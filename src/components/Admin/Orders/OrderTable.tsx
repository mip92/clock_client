import React, {useState} from "react";
import {Button, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import {Order} from "../../../store/reducers/workplaceReducer";
import {useSortableData} from "../../../hooks/useSortableData";
import OneOrder from "./OneOrder";


interface ProductTableProps {
    orders: Order[]
}

interface active {
    name: string
    down: boolean
}

const OrderTable: React.FC<ProductTableProps> = ({orders}) => {
    const [activeSort, setActiveSort] = useState<active>({name: '', down: false})
    const {items, requestSort, sortConfig} = useSortableData(orders, 'ascending');
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
                                {btn} {activeSort.name == btn && (!activeSort.down ? '▲' : "▼")}
                            </Button>
                        </th>)}
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {items.map((order, key) => (<OneOrder key={key} order={order}/>))}
                </tbody>
            </Table>
        </TableContainer>
    );
};
export default OrderTable