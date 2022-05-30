import React from 'react';
import Statuses from "../../MyOffice/Statuses";

const OneOrder = ({order, statuses}) => {
    const getString = (date) => {
        return new Date(date).toLocaleString()
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
            <td><Statuses key={`${order.id}`+ `${order.status}`} orderId={order.id} status={order.status} statuses={statuses}/></td>
        </tr>
    );
};

export default OneOrder;