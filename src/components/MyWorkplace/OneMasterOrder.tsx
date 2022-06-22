import React, {useState} from 'react';
import Statuses, {MyStatus} from "../MyOffice/Statuses";
import Pictures from "./Pictures";
import PicturesPreloader from "./PicturesPreloader";
import {Order} from "../../store/reducers/workplaceReducer";
import {CLOCK_SIZE} from "../../enums/ClockSize";
import s from "../../style/OneMaster.module.css"

export interface StateOpenInterface {
    status: boolean
    id: number | null
}

interface OneMasterOrderProps {
    order: Order;
    statuses: MyStatus[]
}

const OneMasterOrder: React.FC<OneMasterOrderProps> = ({order, statuses}) => {
    const [isOpen, setOpen] = useState<StateOpenInterface>({status: false, id: null})
    const openPictures = (id) => {
        setOpen({status: true, id})
    }
    const getString = (date: Date | null) => {
        if (!date) return ''
        return new Date(date).toLocaleString()
    }
    const download = () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/payPal/getPdf/3`
        window.location.href = url;
    }
    return (
        <tr>
            <td>{getString(order.master_busyDate.dateTime)}</td>
            {/*<td>{order.master_busyDate.dateTime}</td>*/}
            <td>{order.user.email}</td>
            <td>{order.user.name}</td>
            <td>{order.originalCityName}</td>
            <td>{order.clockSize && CLOCK_SIZE[order.clockSize]}</td>
            <td>{order.dealPrice}</td>
            <td>{(order.dealPrice && order?.clockSize) && order.dealPrice * order?.clockSize}</td>
            <td><Statuses key={`${order.id}` + `${order.status}`}
                          orderId={order.id} status={order.status}
                          statuses={statuses}/></td>
            <td onClick={() => openPictures(order.id)}>{<PicturesPreloader pictures={order.orderPictures}/>}</td>
            {isOpen.status && <td><Pictures open={isOpen} setOpen={setOpen} pictures={order.orderPictures}/></td>}
            {/*<Button onClick={()=>download()}>скачать PDF</Button>*/}
            <div className={s.link}>
                <a href={`${process.env.REACT_APP_SERVER_URL}/api/payPal/getPdf/${order.id}`} target="_blank">Pdf</a>
            </div>
        </tr>
    );
};

export default OneMasterOrder;