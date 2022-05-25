import React, {useState} from 'react';
import Statuses from "../MyOffice/Statuses";
import {StateOpenInterface} from "./WorkplaceTable";
import Pictures from "./Pictures";
import PicturesPreloader from "./PicturesPreloader";


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
            <td>{getString(order.master_busyDate.dateTime)}</td>
            <td>{order.user.email}</td>
            <td>{order.user.name}</td>
            <td>{order.originalCityName}</td>
            <td>{order.clockSize}</td>
            <td>{order.dealPrice}</td>
            <td>{(order.dealPrice && order?.clockSize) && order.dealPrice * order?.clockSize}</td>
            <td><Statuses key={`${order.id}` + `${order.status}`}
                          orderId={order.id} status={order.status}
                          statuses={statuses}/></td>
            <td onClick={() => openPictures(order.id)}>{<PicturesPreloader pictures={order.orderPictures}/>}</td>
            {isOpen.status && <td><Pictures open={isOpen} setOpen={setOpen}/></td>}
        </tr>
    );
};

export default OneMsterOrder;