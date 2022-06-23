import React, {useContext} from 'react';
import ButtonWrapper from "./PayPal/ButtonWrapper";
import {PayPalContext} from "../../context/payPalContect";
import s from "../../style/SecondStep.module.css";
import {Button} from "@material-ui/core";

const ThirdStep = ({back, orderId, dealPrice, next}) => {
    const {currency} = useContext(PayPalContext)
    return (
        <div>
            <ButtonWrapper  next={next} currency={currency} amount={dealPrice} showSpinner={true} orderId={orderId}/>
            <div className={s.buttons}>
                <Button variant="contained"
                        color='primary'
                        onClick={() => back()}>
                    Back</Button>
                <div style={{color: 'red'}}></div>
                <Button variant="contained"
                        color='primary'
                        onClick={() => next()}
                        disabled={true}>
                    Next</Button>
            </div>
        </div>
    );
};

export default ThirdStep;