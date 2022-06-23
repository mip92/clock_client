import React, {useContext} from 'react';
import ButtonWrapper from "./PayPal/ButtonWrapper";
import {PayPalContext} from "../../context/payPalContect";

const ThirdStep = ({orderId, dealPrice, next}) => {
    const {currency} = useContext(PayPalContext)
    return (
        <div>
            <ButtonWrapper next={next} currency={currency} amount={dealPrice} showSpinner={true} orderId={orderId}/>
        </div>
    );
};

export default ThirdStep;