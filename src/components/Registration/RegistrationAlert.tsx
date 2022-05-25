import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";


const RegistrationAlert = ({open}) => {
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
                        Login to complete your order
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/*<Link
                        to={{
                            pathname: "/login",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { fromDashboard: true }
                        }}
                    />*/}
                    <Typography>
                        <Link
                            to={{
                                pathname: "/login",
                                state: { fromDashboard: true }
                            }}
                        >Login</Link>
                    </Typography>
                    {/*<Button color="primary" variant="contained" onClick ={()=>history.push('/login')}>
                        Login
                    </Button>*/}
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default RegistrationAlert