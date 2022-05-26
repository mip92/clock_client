import React from 'react';
import s from "../../../style/FourthStep.module.css";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const PayPalCompleted = () => {
    const {id} = useTypedSelector(state => state.auth)
    const history = useHistory();
    const goTo = (path) => {
        history.push(path)
    }
    return (
        <div>
            Completed
            <Button variant="contained"
                    color='primary'
                    className={s.buttons}
                    onClick={() => goTo(`/myOffice/${id}`)}>
                Перейти к моим заказам</Button>
        </div>
    );
};

export default PayPalCompleted;