import React from 'react';
import {Button, Card} from "@material-ui/core";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useHistory} from "react-router-dom";
import s from "../../style/FourthStep.module.css";

const FourthStep = ({setActiveStep}) => {
    /*""react-datepicker": "2.14.0",,*/
    const history = useHistory();
    const goTo = (path) => {
        history.push(path)
    }
    const {token, id} = useTypedSelector(state => state.auth)
    if (token) {
        return (
            <div className={s.wrapper}>
                <Card style={{textAlign: "center"}}>
                    Вам на почту отправлено письмо, подтвердите заказ мастера
                </Card>
                <Button variant="contained"
                        color='primary'
                        className={s.buttons}
                        onClick={() => goTo(`/myOffice/${id}`)}>
                    Перейти к моим заказам</Button>
            </div>
        )
    } else return (
        <div className={s.wrapper}>
            <Card style={{textAlign: "center"}}>
                Вам на почту отправленно письмо с дальнейшими указаниями
            </Card>
            <Button variant="contained"
                    color='primary'
                    onClick={() => goTo(`/blog`)}
                    className={s.buttons}
            >
                На главную</Button>
        </div>

    )

};

export default FourthStep;