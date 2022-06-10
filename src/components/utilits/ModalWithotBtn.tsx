import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import OrdersModal from "../Comments/OrdersModal";
import {OrderInterface} from "../MyWorkplace/Calendar/MasterCalendarMonth";
import {Button} from "@material-ui/core";
import {MyStatus} from "../MyOffice/Statuses";
import {useDispatch} from "react-redux";
import {fetchCalendar} from "../../actionCreators/calendarActionCreators";

interface MyModalListProps {
    orders: OrderInterface[]
    statuses: MyStatus[]
    masterId: string
    month: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

const MyModalWithoutBtn: React.FC<MyModalListProps> = ({orders, statuses, masterId, month, children,}) => {
    const classes = useStyles();
    const dispatch =useDispatch()
    const [open, setOpen] = useState(false)

    const handleClose = (e) => {
        e.preventDefault();
        dispatch(fetchCalendar(+masterId, month))
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