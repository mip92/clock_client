import React from 'react';
import {Button} from "@material-ui/core";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useHistory} from "react-router-dom";

const ThirdStep = () => {
    const history = useHistory();
    const {token, id} = useTypedSelector(state => state.auth)
    if (token) {
        return (
            <div style={{textAlign: "center"}}>
                Вам на почту отправлено письмо, подтвердите заказ мастера
                <Button variant="contained"
                        color='primary'
                        onClick={() => history.push(`/myOffice/${id}`)}>
                    Перейти к моим заказам</Button>
            </div>
        )
    }else return (
        <div style={{textAlign: "center"}}>
            Вам на почту отправленно письмо с дальнейшими указаниями
            <Button variant="contained"
                    color='primary'
                    onClick={() => history.push(`/`)}>
                На главную</Button>
        </div>

    )

};

export default ThirdStep;