import React, {useContext} from 'react';
import {Button, Card} from "@material-ui/core";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useHistory} from "react-router-dom";
import s from "../../style/FourthStep.module.css";
import ButtonWrapper from "./PayPal/ButtonWrapper";
import {PayPalContext} from "../../context/payPalContect";

const FourthStep = ({setActiveStep, orderId, dealPrice}) => {
    const {currency} = useContext(PayPalContext)
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
                    An email has been sent to you, please confirm your order
                    <ButtonWrapper currency={currency} amount={dealPrice} showSpinner={true} orderId={orderId}/>
                </Card>
                <Button variant="contained"
                        color='primary'
                        className={s.buttons}
                        onClick={() => goTo(`/myOffice/${id}`)}>
                    Go to my orders</Button>
            </div>
        )
    } else return (
        <div className={s.wrapper}>
            <Card style={{textAlign: "center"}}>
                An email has been sent to you with further instructions
                <ButtonWrapper currency={currency} amount={dealPrice} showSpinner={true} orderId={orderId}/>
            </Card>
            <Button variant="contained"
                    color='primary'
                    onClick={() => goTo(`/blog`)}
                    className={s.buttons}
            >
                To home</Button>
        </div>

    )

};

export default FourthStep;