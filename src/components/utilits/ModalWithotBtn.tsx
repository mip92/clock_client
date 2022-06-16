import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import OrdersModal from "../Comments/OrdersModal";
import {OrderInterface} from "../MyWorkplace/Calendar/MasterCalendarMonth";
import {Button} from "@material-ui/core";
import {MyStatus} from "../MyOffice/Statuses";
import {useDispatch} from "react-redux";
import {fetchCalendar, fetchWeek} from "../../actionCreators/calendarActionCreators";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {FORMAT} from "../../types/calendarTypes";

interface MyModalListProps {
    orders: OrderInterface[]
    statuses: MyStatus[]
    masterId: string
    month: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            marginLeft:'30%',
            position:'absolute',
            top:'10%',
            left:'10%',
            overflow:'scroll',
            height:'100%',
            display:'block'
        },
        paper: {
            marginTop:"15%",
            marginBottom:"15%",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: '40px',
            width:'50%',
            display:'block'
        },
    }),
);

const MyModalWithoutBtn: React.FC<MyModalListProps> = ({orders, statuses, masterId, month, children,}) => {
    const {format} = useTypedSelector(state => state.calendar)
    const classes = useStyles();
    const dispatch =useDispatch()
    const {correctMonday}=useTypedSelector(state => state.calendar)
    const [open, setOpen] = useState(false)

    const handleClose = (e) => {
        e.preventDefault();
        format === FORMAT.Month && dispatch(fetchCalendar(+masterId, month))
        format === FORMAT.Week && dispatch(fetchWeek(+masterId, correctMonday))
        setOpen(false)
    };
    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true)
    };

    return (
        <div>
            <div
                onClick={(e) => handleOpen(e)}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={(e) => handleClose(e)}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <OrdersModal orders={orders} statuses={statuses}/>
                        <Button onClick={(e) => handleClose(e)}>Close</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );

}
export default MyModalWithoutBtn