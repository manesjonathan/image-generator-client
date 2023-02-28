import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {URL} from "../config/config.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState("")
    const stripePromise = loadStripe("pk_test_51IjwEfC1js4lodAyBRNVJ83bNJtsel67h00mea3VzENDLODQNxDERGAa9hQ9h4yptXh7ZXAnju179KJLgy2HekGd0096Mtmzjr");
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (isRegistered) {
            // Create PaymentIntent as soon as the page loads
            axios.post(`${URL}/create-payment-intent`, null, {
                params: {amount: 1000},
            }).then(res => {
                console.log(res.data)
                setClientSecret(res.data)
            });
        }
    }, [isRegistered]);

    const appearance = {
        theme: 'night',
    };
    const options = {
        clientSecret,
        appearance,
    };
    const handleSubmit = (e) => {

        if (password === passwordCheck) {
            e.preventDefault()
            const user = {
                email: email,
                password: passwordCheck
            }
            console.log(user);

            try {
                axios.post(`${URL}/user/register`, user).then(res => {
                    setIsRegistered(res.data);
                }).catch(() => {
                    setError("This account already exists.");
                })
            } catch (e) {
                console.error(e);
                setError("An error occurred");
            }
        }
    }

    return (
        <main className={'h-screen w-full flex flex-col items-center justify-center m-auto p-14'}>
            <div
                className="flex rounded-lg backdrop-filter backdrop-blur-md bg-transparent drop-shadow-2xl items-center justify-center m-auto">
                {!isRegistered &&
                    <section className="flex flex-col items-center justify-center m-auto w-full p-14">
                        <article className="">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                                Create and account
                            </h1>
                            <form className="" method="post" onSubmit={handleSubmit}>
                                <label htmlFor="email"
                                       className="mb-2 block mb-2 text-sm font-medium text-gray-900 text-white">Your
                                    email</label>
                                <input type="email" name="email" id="email"
                                       onChange={e => setEmail(e.target.value)}
                                       className="mb-4 border sm:text-sm rounded-lg block w-full p-2.5 bg-indigo-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="name@company.com" required/>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       onChange={e => setPassword(e.target.value)}
                                       className="mb-4 border sm:text-sm rounded-lg block w-full p-2.5 bg-indigo-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       required/>
                                <label htmlFor="confirm-password"
                                       className="block mb-2 text-sm font-medium text-gray-900 text-white">Confirm
                                    password</label>
                                <input type="password" name="confirm-password" id="confirm-password"
                                       onChange={e => setPasswordCheck(e.target.value)}
                                       placeholder="••••••••"
                                       className="border sm:text-sm rounded-lg block w-full p-2.5 bg-indigo-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       required/>

                                <div className="mt-4 flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox"
                                               className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300 bg-indigo-900 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                                               required/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 text-gray-300">I
                                            accept the <a
                                                className="font-medium text-primary-600 hover:underline text-primary-500"
                                                href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>

                                <button type="submit"
                                        className="mt-8  w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-indigo-900 hover:bg-orange-500">Create
                                    an account
                                </button>
                                <p className="mt-8 text-sm font-light text-gray-50">
                                    Already have an account? <a href="/"
                                                                className="font-medium text-primary-600 hover:underline text-primary-500">Login
                                    here</a>
                                </p>
                                {error && (
                                    <p className="mt-4 text-sm text-bold text-black animate-bounce">{error}</p>
                                )}
                            </form>
                        </article>
                    </section>}
                {clientSecret && isRegistered && (
                    <section className={'flex flex-col items-center justify-center m-auto p-14 w-full'}>

                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm/>
                        </Elements>
                    </section>
                )}
            </div>
        </main>
    );
}

export default Signup;
