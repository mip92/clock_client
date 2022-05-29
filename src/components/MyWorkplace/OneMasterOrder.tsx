import React, {useState} from 'react';
import Statuses from "../MyOffice/Statuses";

import Pictures from "./Pictures";
import PicturesPreloader from "./PicturesPreloader";
export interface StateOpenInterface{
    status: boolean
    id: number | null
}

const OneMsterOrder = ({order, statuses}) => {
    const [isOpen, setOpen] = useState<StateOpenInterface>({status: false, id: null})
    const openPictures = (id) => {
        setOpen({status: true, id})
    }
    const getString = (date: Date) => {
        return new Date(date).toLocaleString()
    }
    return (
        <tr>
            <td>{getString(order.master_busyDate.dateTime)}</td>
            {/*<td>{order.master_busyDate.dateTime}</td>*/}
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
            {isOpen.status && <td><Pictures open={isOpen} setOpen={setOpen} pictures={order.orderPictures}/></td>}
        </tr>
    );
};

export default OneMsterOrder;