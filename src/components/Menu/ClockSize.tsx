import React, {useContext} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import s from "../../style/ClockSize.module.css"
import {FormContext} from "../../context/formContext";
import {Card, Typography} from "@material-ui/core";
import {Clock} from "../../types/mainInterfacesAndTypes";

const ClockSize: React.FC = () => {
    const {clockSize, setClockSize} = useContext(FormContext)
    const arr: Clock[] = [
        {small: true, middle: false, big: false},
        {small: false, middle: true, big: false},
        {small: false, middle: false, big: true}
    ]
    const handleChange = (obj: Clock) => {
        setClockSize(obj);
    }
    const {small, middle, big} = clockSize;

    return (
        <div className={s.size}>
            <Card className={s.card} variant="elevation">
                <Typography variant="h6" color={'secondary'}>
                    Размер часов
                </Typography>
                <FormControlLabel
                    labelPlacement="top"
                    control={<Checkbox checked={small}
                                       onChange={() => handleChange(arr[0])}
                                       name="small"/>}
                    label={<QueryBuilderIcon fontSize="small"/>}
                />
                <FormControlLabel
                    labelPlacement="top"
                    control={<Checkbox checked={middle}
                                       onChange={() => handleChange(arr[1])}
                                       name="middle"/>}
                    label={<QueryBuilderIcon fontSize="medium"/>}
                />
                <FormControlLabel
                    labelPlacement="top"
                    control={<Checkbox checked={big}
                                       onChange={() => handleChange(arr[2])}
                                       name="big"/>}
                    label={<QueryBuilderIcon fontSize="large"/>}
                />
            </Card>
        </div>
    );
}
export default ClockSize