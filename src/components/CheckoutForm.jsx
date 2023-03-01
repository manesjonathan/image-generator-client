import React, {useEffect, useState} from "react";
import {LinkAuthenticationElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setSucceeded(true);
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, succeeded]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/payment"
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }
    if (!succeeded) {
        return (
            <form id="payment-form" onSubmit={handleSubmit}>
                <LinkAuthenticationElement
                    className={'mb-4'}
                    id="link-authentication-element"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <PaymentElement id="payment-element" options={paymentElementOptions}/>
                <button
                    className={'mt-8 mx-auto w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-indigo-900 hover:bg-orange-500'}
                    disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">
                            {isLoading ? (
                                    <div className="spinner" id="spinner">
                                        <div
                                            className="text-center mx-auto w-6 h-6 border-2 border-t-4 border-gray-200 rounded-full animate-spin"></div>
                                    </div>)
                                : ("Pay now")}
                        </span>
                </button>
                {message && <div className={'text-white'} id="payment-message">{message}</div>}
            </form>
        );
    } else {
        return (
            <div className="bg-gray-100">
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                        <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                        <p> Have a great day! </p>
                        <div className="py-10 text-center">
                            <a href="/generate"
                               className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
