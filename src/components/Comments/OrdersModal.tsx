import React from 'react';
import {OrderInterface} from "../MyWorkplace/Calendar/MasterCalendarMonth";
import {CLOCK_SIZE} from "../../enums/ClockSize";
import s from "../../style/OrderModal.module.css"
import {Card} from "@material-ui/core";
import Statuses, {MyStatus} from "../MyOffice/Statuses";

interface OrdersModalProps {
    orders: OrderInterface[]
    statuses: MyStatus[]
}

const OrdersModal: React.FC<OrdersModalProps> = ({orders, statuses}) => {
    return (
        <div>
            {orders.map((order) =>
                <Card key={order.id} variant="outlined" className={order.status === "Completed" ? s.complete : s.notComplete}>
                    <div>id: {order.id}</div>
                    <div>user name: {order.user.name}</div>
                    <div>date: {new Date(order.master_busyDate.dateTime).toLocaleString()}</div>
                    <div>clock size: {CLOCK_SIZE[order.clockSize]}</div>
                    <Statuses key={`${order.id}` + `${order.status}`}
                              orderId={order.id} status={order.status}
                              statuses={statuses}/>
                </Card>
            )}
        </div>
    );
};

export default OrdersModal;