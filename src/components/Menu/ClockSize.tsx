import React from 'react';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import s from "../../style/ClockSize.module.css"
import Typography from "@material-ui/core/Typography";
import {Card} from "@material-ui/core";

const ClockSize = ({register, error}) => {
    return (
        <Card>
            <Typography variant="subtitle1"
                        color={'secondary'}
                        className={s.typography}
            >Clock size</Typography>
            <div className={s.size}>
                <label htmlFor="small">
                    <input
                        {...register('checkbox')}
                        type="radio"
                        name="checkbox"
                        value="small"
                        id="ted-lasso"
                    /> <br/>
                    <QueryBuilderIcon fontSize="small"/>
                </label>
                <label htmlFor="middle">
                    <input
                        {...register('checkbox')}
                        type="radio"
                        name="checkbox"
                        value="middle"
                        id="got"
                    /><br/>
                    <QueryBuilderIcon fontSize="medium"/>
                </label>
                <label htmlFor="big">
                    <input
                        {...register('checkbox')}
                        type="radio"
                        name="checkbox"
                        value="big"
                        id="breadking-bad"
                    /><br/>
                    <QueryBuilderIcon fontSize="large"/>
                </label>
            </div>
            <div className={s.error}>{error}</div>
        </Card>
    );
}
export default ClockSize