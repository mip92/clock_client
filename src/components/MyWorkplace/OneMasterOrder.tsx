import React, {useState} from 'react';
import Statuses from "../MyOffice/Statuses";
import {StateOpenInterface} from "./WorkplaceTable";
import Pictures from "./Pictures";


const OneMsterOrder = ({order, statuses}) => {
    const [isOpen, setOpen] = useState<StateOpenInterface>({status: false, id: null})
    const openPictures = (id) => {
        setOpen({status: true, id})
    }
    const getString = (date) => {
        const d = new Date(date)
        return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${d.getHours()}:00`
    }
    return (
        <tr>
            <td onClick={() => openPictures(order.id)}>{getString(order.master_busyDate.dateTime)}</td>
            <td onClick={() => openPictures(order.id)}>{order.user.email}</td>
            <td onClick={() => openPictures(order.id)}>{order.user.name}</td>
            <td onClick={() => openPictures(order.id)}>{order.originalCityName}</td>
            <td onClick={() => openPictures(order.id)}>{order.clockSize}</td>
            <td onClick={() => openPictures(order.id)}>{order.dealPrice}</td>
            <td onClick={() => openPictures(order.id)}>{(order.dealPrice && order?.clockSize) && order.dealPrice * order?.clockSize}</td>
            <td><Statuses key={`${order.id}` + `${order.status}`}
                                                                 orderId={order.id} status={order.status}
                                                                 statuses={statuses}/></td>
            {isOpen.status && <td><Pictures open={isOpen} setOpen={setOpen}/></td>}
        </tr>
    );
};

export default OneMsterOrder;