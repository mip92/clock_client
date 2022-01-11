import React, {useContext} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import s from "../../style/ClockSize.module.css"
import {FormContext} from "../../context/formContext";
import {Card, Typography} from "@material-ui/core";

const ClockSize: React.FC = () => {
    const {clockSize, setClockSize} = useContext(FormContext)

    const handleChangeOne = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClockSize({small: event.target.checked, middle: false, big: false});
    };
    const handleChangeTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClockSize({small: false, middle: event.target.checked, big: false});
    };
    const handleChangeThree = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClockSize({small: false, middle: false, big: event.target.checked});
    };
    const {small, middle, big} = clockSize;

    return (
        <div className={s.size}>
            <Card className={s.card} variant="elevation">
                <Typography variant="h6" color={'secondary'}>
                    Размер часов
                </Typography>
                <FormControlLabel
                    labelPlacement="top"
                    control={<Checkbox checked={small} onChange={handleChangeOne} name="small"/>}
                    label={<QueryBuilderIcon fontSize="small"/>}
                />
                <FormControlLabel
                    labelPlacement="top"
                    control={<Checkbox checked={middle} onChange={handleChangeTwo} name="middle"/>}
                    label={<QueryBuilderIcon fontSize="medium"/>}
                />
                <FormControlLabel
                    labelPlacement="top"
                    control={<Checkbox checked={big} onChange={handleChangeThree} name="big"/>}
                    label={<QueryBuilderIcon fontSize="large"/>}
                />
            </Card>
        </div>
    );
}
export default ClockSize