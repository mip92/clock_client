import React from 'react';
import {Order} from "../../../store/reducers/workplaceReducer";
import Statuses from "../../MyOffice/Statuses";
export interface OrderInterface {
    orderId: number | null,
    dateTime: string,
    clockSize: number| null,
    userId: number| null,
    userEmail: string,
    userName: string,
    masterId: number| null,
    masterEmail: string,
    masterName: string,
    cityId: number| null,
    cityName: string,
    dealPrice: number | null,
    statusId: number | null,
}

interface OrderProps {
    order:Order
}

const OneOrder: React.FC<OrderProps> = ({order}) => {
    return (
        <tr key={order.id}>
            <td>{order.master_busyDate.dateTime}</td>
            <td>{order.master.email}</td>
            <td>{order.master.name}</td>
            <td>{order.user.email}</td>
            <td>{order.user.name}</td>
            <td>{order.originalCityName}</td>
            <td>{order.clockSize}</td>
            <td>{order.dealPrice}</td>
            <td>{(order.dealPrice && order?.clockSize) && order.dealPrice * order?.clockSize}</td>
            <td><Statuses orderId={order.id} status={order.status}/></td>
        </tr>
    )
};

export default OneOrder;