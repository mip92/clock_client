import React, {useState} from 'react';
import {OrderInterface} from "../Admin/Orders/OneOrder";
import {Button, Paper, Table, TableContainer, Typography} from "@material-ui/core";
import Statuses from "../MyOffice/Statuses";
import {Order} from "../../store/reducers/workplaceReducer";
import {log} from "util";
import Pictures from "./Pictures";
import {useSortableData} from "../../hooks/useSortableData";

interface active {
    name: string
    down: boolean
}

export interface StateOpenInterface{
    status: boolean
    id: number | null
}


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


    const [isOpen, setOpen] = useState<StateOpenInterface>({status:false, id: null})
    const openPictures = (id) => {
        setOpen({status:true, id})
    }
    return (
        <div>
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
                        <tr key={item.id} >
                            <td onClick={() => openPictures(item.id)}>{getString(item.master_busyDate.dateTime) }</td>
                            <td onClick={() => openPictures(item.id)}>{item.user.email}</td>
                            <td onClick={() => openPictures(item.id)}>{item.user.name}</td>
                            <td onClick={() => openPictures(item.id)}>{item.originalCityName}</td>
                            <td onClick={() => openPictures(item.id)}>{item.clockSize}</td>
                            <td onClick={() => openPictures(item.id)}>{item.dealPrice}</td>
                            <td onClick={() => openPictures(item.id)}>{(item.dealPrice && item?.clockSize) && item.dealPrice * item?.clockSize}</td>
                            <td><Statuses orderId={item.id} status={item.status}/></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </TableContainer>
            {isOpen.status==true && <Pictures open={isOpen} setOpen={setOpen}/>}
        </div>
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