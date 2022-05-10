import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useFetching} from "../../hooks/useFetching";
import $api from "../../http";
import AlertChangeStatus from "./AlertChangeStatus";
import {log} from "util";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


export interface MyStatus {
    createdAt: string
    id: number
    name: string
    updatedAt: string
}

interface ResponseStatuses {
    count: number | null
    rows: MyStatus[]
}

interface StatusesProps {
    status: string,
    orderId: number | null
    statuses:MyStatus[]
}

const Statuses: React.FC<StatusesProps> = ({status, orderId, statuses}) => {
    const classes = useStyles();
    const [currentStatus, setCurrentStatus] = React.useState({} as MyStatus);


    const [openAlert, setOpenAlert] = React.useState(false);
    const [changeStatus, setOrderStatus] = React.useState({} as MyStatus);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const orderStatus = statuses && statuses.find(s => s.name === event.target.value)
        orderStatus && setOrderStatus(orderStatus)
        setOpenAlert(true)
    };
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentStatus.name}
                    onChange={handleChange}
                >
                    {statuses && statuses.map((s) =>
                        <MenuItem key={s.id} value={s.name}>
                            {s.name}
                        </MenuItem>
                    )}

                </Select>
            </FormControl>
            <AlertChangeStatus changeStatus={changeStatus}
                               setCurrentStatus={setCurrentStatus}
                               openAlert={openAlert}
                               setOpenAlert={setOpenAlert}
                               orderId={orderId}
                               statuses={statuses}
            />
        </div>
    );
}

export default Statuses;