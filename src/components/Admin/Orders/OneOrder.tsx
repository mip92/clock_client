import React from 'react';
import Statuses from "../../MyOffice/Statuses";

const OneOrder = ({order}) => {
    const getString = (date) => {
        const d = new Date(date)
        return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${d.getHours()}:00`
    }
    return (
        <tr>
            <td>{getString(order.master_busyDate.dateTime)}</td>
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
    );
};

export default OneOrder;