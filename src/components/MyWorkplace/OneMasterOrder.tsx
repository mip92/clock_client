import React, {useState} from 'react';
import Statuses, {MyStatus} from "../MyOffice/Statuses";
import Pictures from "./Pictures";
import PicturesPreloader from "./PicturesPreloader";
import {Order} from "../../store/reducers/workplaceReducer";

export interface StateOpenInterface{
    status: boolean
    id: number | null
}

interface OneMasterOrderProps{
    order: Order;
    statuses: MyStatus[]
}

const OneMsterOrder: React.FC<OneMasterOrderProps> = ({order, statuses}) => {
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
            {isOpen.status && <td><Pictures open={isOpen} setOpen={setOpen} pictures={order.orderPictures}/></td>}
        </tr>
    );
};

export default OneMsterOrder;