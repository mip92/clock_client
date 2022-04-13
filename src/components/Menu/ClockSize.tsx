import React from 'react';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import s from "../../style/ClockSize.module.css"

const ClockSize = ({register, error}) => {
    return (
        <div>
            <div className={s.size}>
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
            </div>
            <div className={s.error} >{error}</div>
        </div>
    );
}
export default ClockSize