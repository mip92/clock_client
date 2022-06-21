import React from 'react';
import {OrderInterface} from "./MasterCalendarMonth";
import {CLOCK_SIZE} from "../../../enums/ClockSize";
import s from "../../../style/OneDay.module.css"
import MyModalWithoutBtn from "../../utilits/ModalWithotBtn";
import {MyStatus} from "../../MyOffice/Statuses";
import {Button} from "@material-ui/core";

interface OneDayProps {
    date: Date
    orders: OrderInterface[]
    statuses: MyStatus[]
    masterId: string,
    month: string
}

const OneDay: React.FC<OneDayProps> = ({date, orders, statuses, masterId, month}) => {
    return (
        <MyModalWithoutBtn  orders={orders} statuses={statuses} masterId={masterId} month={month}>
            <div className={s.day}>
                {date && new Date(date).getDate()}
            </div>
            {orders && orders.length < 3 && orders.map((order) =>
                <div key={order.id} className={order.status === "Completed" ? s.complete : s.notComplete}>
                    <div>name: {order.user.name}</div>
                    <div>clock size: {CLOCK_SIZE[order.clockSize]}</div>
                </div>)}
            {orders && orders.length >= 3 &&
            <div>
                <div key={orders[0].id} className={orders[0].status === "Completed" ? s.complete : s.notComplete}>
                    <div>name: {orders[0].user.name}</div>
                    <div>clock size: {CLOCK_SIZE[orders[0].clockSize]}</div>
                </div>
                <div key={orders[1].id} className={orders[0].status === "Completed" ? s.complete : s.notComplete}>
                    <div>name: {orders[1].user.name}</div>
                    <div>clock size: {CLOCK_SIZE[orders[1].clockSize]}</div>
                </div>
                <Button variant='outlined'>Watch more...</Button>
            </div>
            }
        </MyModalWithoutBtn>
    );
};

export default OneDay;