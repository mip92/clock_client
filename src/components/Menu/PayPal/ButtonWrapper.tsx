import React, {useEffect} from "react";
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import axios from "axios";
import $api from "../../../http";

const ButtonWrapper = ({currency, showSpinner, amount, orderId}) => {
    const style = {"layout": "vertical"};
    const [{options, isPending}, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (<>
            {(showSpinner && isPending) && <div>Загрузка</div>}
            <PayPalButtons
                //style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                    description: `watch repair id: ${orderId}`
                                },
                            ],
                        })
                        .then((payPalOrderId) => {
                            $api.post(`http://localhost:5000/api/payPal/created/${orderId}`, {
                                payPalOrderId
                            }).then((response) => {
                                console.log(response.data.message)
                            })
                            return payPalOrderId;
                        });
                }}
                // @ts-ignore
                onApprove={(data, actions) => {
                    if (actions.order) return actions.order.capture().then((order) => {
                        console.log(order);
                    });
                }}
                onError={(err) => {
                    console.log(err)
                }}
            />
        </>
    );
}
export default ButtonWrapper