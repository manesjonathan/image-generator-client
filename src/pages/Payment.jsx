import axios from "axios";
import {useEffect, useState} from "react";
import {API_KEY, URL} from "../config/config.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Signup = () => {
    const stripePromise = loadStripe(API_KEY);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post(`${URL}/create-payment-intent`, null, {
            params: {amount: 100},
        }).then(res => {
            console.log(res.data)
            setClientSecret(res.data)
        });

    }, []);

    const appearance = {
        theme: 'night',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <main className={'h-screen flex h-screen w-full items-center justify-center p-12'}>
            {clientSecret && (
                <section className={'m-auto p-12 rounded-lg backdrop-filter backdrop-blur-md bg-transparent drop-shadow-2xl '}>
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </section>
            )}
        </main>
    );
}

export default Signup;
