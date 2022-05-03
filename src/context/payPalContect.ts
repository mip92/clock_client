import {createContext} from 'react';

export const PayPalContext = createContext({
    "client-id": process.env.REACT_APP_CLIENT_PAYPAL_ID,
    components: "buttons",
    currency: "USD"
},)