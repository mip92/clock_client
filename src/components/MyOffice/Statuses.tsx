import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AlertChangeStatus from "./AlertChangeStatus";


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

interface StatusesProps {
    status: string,
    orderId: number | null
    statuses: MyStatus[]
}

const Statuses: React.FC<StatusesProps> = ({status, orderId, statuses}) => {
    const classes = useStyles();
    const [currentStatus, setCurrentStatus] = React.useState({} as MyStatus);
    useEffect(() => {
        const orderStatus = statuses.find(s => s.name === status)
        orderStatus && setCurrentStatus(orderStatus)
    }, [statuses])

    const [openAlert, setOpenAlert] = useState(false);
    const [changeStatus, setOrderStatus] = useState({} as MyStatus);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const orderStatus = statuses && statuses.find(s => s.name === event.target.value)
        orderStatus && setOrderStatus(orderStatus)
        setOpenAlert(true)
    };
    if (!currentStatus.name) return <div>Loading...</div>
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