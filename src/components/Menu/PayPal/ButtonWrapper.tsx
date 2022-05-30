import React, {useEffect} from "react";
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import $api from "../../../http";
import {useHistory} from "react-router-dom";

const ButtonWrapper = ({currency, showSpinner, amount, orderId}) => {
    const history = useHistory();
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
                            })
                            return payPalOrderId;
                        });
                }}
                // @ts-ignore
                onApprove={(data, actions) => {
                    if (actions.order) return actions.order.capture().then((order) => {
                    }).then(()=>history.push('/completed'));
                }}
                onError={(err) => {
                }}
            />
        </>
    );
}
export default ButtonWrapper