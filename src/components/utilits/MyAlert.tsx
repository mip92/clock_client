import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface MyAlertListProps {
    handler: ()=>void,
    text: string
}

const MyAlert: React.FC<MyAlertListProps> =({handler, text})=>{
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleFetch = () => {
        handler()
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <HighlightOffIcon style={{cursor: "pointer"}} onClick={handleClickOpen}/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отменить</Button>
                    <Button onClick={handleFetch} autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default MyAlert