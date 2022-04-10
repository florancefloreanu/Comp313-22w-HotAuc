import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import axios from "axios"
import { SERVER_URL } from "../../ConstantValue"

function Paypal(props) {
    const style = {
        size: 'responsive',
        color: 'white',
        shape: 'rect',
        label: 'checkout',
        tagline: 'true'
    }
    let env = 'sandbox'; 
    let currency = 'CAD';
    let total = props.subTotal;
	
    const onSuccess = async (payment) => {
        // console.log("The payment was succeeded!", payment);
        props.onPaymentDone(true, payment);

        const newItem = props.targetItem;
        newItem.isPaid = true;

        const body = newItem;
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };

        const res = await axios.put(
            `${SERVER_URL}item/${newItem._id}`,
            body,
            config
        );
    }
	
    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
        props.onPaymentDone(false, data)
    }
	
    const onError = (err) => {
        console.log("Error!", err);
        window.alert('Your transaction cannot be completed. Please try again and contact us if you keep getting this error ')
        props.onPaymentDone(false, err);
    }
	
    const client = {
        sandbox: 'AeJaCUkj8-6vbPvLhTvHyyeku_CnxXVMyClN_HOqvlWnI6PaS1QvasADdX2eM2vz_k_qL9EDbnc3S9GB',
        production: 'PUT_YOUR_LIVE_CLIENT_ID_HERE',
    }

    return (
        <PaypalExpressBtn 
            style={style} env={env} client={client} 
            total={total} currency={currency}
            onSuccess={onSuccess} onError={onError} onCancel={onCancel} 
        />
    );
}

export default Paypal;