import React from 'react';
import s from "../../style/Order.module.css";
export interface orderInterface{
    orderId: number,
    dateTime: string,
    clockSize: number,
    userId: number,
    userEmail: string,
    userName: string,
    masterId: number,
    masterEmail: string,
    masterName: string,
    cityId: number,
    cityName: string,
}

interface orderProps {
    order:orderInterface
    currentPage:number,
}

const Order: React.FC<orderProps> = ({order, currentPage}) => {
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
                {/*<CachedIcon onClick={constChangeUserName} style={{cursor: "pointer"}}/>
                <HighlightOffIcon style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}/>*/}
            </div>
        </div>
    )
};

export default Order;