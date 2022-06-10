import React from 'react';
import {OrderInterface} from "./MasterCalendarMonth";
import {CLOCK_SIZE} from "../../../enums/ClockSize";
import s from "../../../style/OneDay.module.css"
import MyModalWithoutBtn from "../../utilits/ModalWithotBtn";
import {MyStatus} from "../../MyOffice/Statuses";

interface OneDayProps {
    date: Date
    orders: OrderInterface[]
    statuses:MyStatus[]
    masterId: string,
    month: string
}

const OneDay: React.FC<OneDayProps> = ({date, orders, statuses, masterId, month}) => {
    return (
        <MyModalWithoutBtn orders={orders} statuses={statuses} masterId={masterId} month={month}>
            {date && new Date(date).toLocaleDateString()}
            {orders && orders.map((order) =>
                <div key={order.id} className={order.status === "Completed" ? s.complete : s.notComplete}>
                    <div>name: {order.user.name}</div>
                    <div>clock size: {CLOCK_SIZE[order.clockSize]}</div>
                </div>)}
        </MyModalWithoutBtn>
    );
};

export default OneDay;