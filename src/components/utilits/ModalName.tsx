import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";

const ModalName = ({open, setNameError, setValue}) => {
    const chaneDBNameNameHandler=()=>{
        setValue("name", open, {
            shouldValidate: true,
            shouldDirty: true
        })
        setNameError('')
    }
    const chaneNameHandler=()=>{
        setNameError('')
    }

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"User with this email is already registered"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This user has a different name, change it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Typography>
                        <Button onClick={()=>chaneDBNameNameHandler()}>Change name</Button>
                        <Button onClick={()=>chaneNameHandler()}>Name is correct</Button>
                    </Typography>
                </DialogActions>
            </Dialog>

        </div>
    );
}
export default ModalName