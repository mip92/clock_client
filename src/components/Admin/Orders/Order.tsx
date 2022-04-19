import React from 'react';
import s from "../../../style/Order.module.css";
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
    order:OrderInterface
    currentPage:number,
}

const Order: React.FC<OrderProps> = ({order, currentPage}) => {
    return (
        <div>
            <div className={s.wrapper}>
                <div>{order.orderId}</div>
                <div>{order.dateTime}</div>
                <div>{order.clockSize}</div>
                <div>{order.userId}</div>
                <div>{order.userEmail}</div>
                <div>{order.userName}</div>
                <div>{order.masterId}</div>
                <div>{order.masterEmail}</div>
                <div>{order.masterName}</div>
                <div>{order.cityId}</div>
                <div>{order.cityName}</div>
            </div>
        </div>
    )
};

export default Order;