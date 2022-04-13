import React, {Dispatch, SetStateAction} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {MyStatus} from "./Statuses";
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";

interface AlertChangeStatusProps{
    openAlert:boolean
    setOpenAlert: Dispatch<SetStateAction<boolean>>
    changeStatus: MyStatus
    setCurrentStatus: Dispatch<SetStateAction<MyStatus>>
    orderId: number | null,
    statuses: MyStatus[] | null
}

const AlertChangeStatus:React.FC<AlertChangeStatusProps> = ({openAlert, statuses, setOpenAlert, changeStatus, setCurrentStatus, orderId}) => {
    const [fetchChangeStatus, isLoading, errorChangeStatus, setError] = useFetching(async () => {
        const res = await $api.put(`/status/${orderId}`,{status:changeStatus.name})
        const orderStatus = res.data
        const newStatus =statuses?.find(s => s?.name == orderStatus)
        // @ts-ignore
        orderStatus && setCurrentStatus(newStatus)
        setOpenAlert(false)
    })
    const handleConfirm = () => {
        fetchChangeStatus()
    };
    return (
        <div>
            <Dialog
                open={openAlert}
                onClose={()=>setOpenAlert(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"User with this email is already registered"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to change order status?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpenAlert(false)} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertChangeStatus;