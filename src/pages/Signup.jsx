import axios from "axios";
import {useState} from "react";
import {URL} from "../config/config.js";
import {loginFunction} from "../config/UtilService.js";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === passwordCheck) {
            const user = {
                email: email,
                password: passwordCheck
            }
            console.log(user);

            try {
                axios.post(`${URL}/user/register`, user).then(res => {
                    if (res.data) {
                        loginFunction(user, navigate);
                    }
                }).catch(() => {
                    setError("This account already exists.");
                })
            } catch (e) {
                console.error(e);
                setError("An error occurred");
            }
        } else {
            setError("Passwords don't match.");
        }
    }

    return (
        <main className="">
            <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
                <article
                    className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 backdrop-filter backdrop-blur-md bg-transparent drop-shadow-2xl">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Create an account
                        </h1>
                        <form className="" method="post" onSubmit={handleSubmit}>
                            <label htmlFor="email"
                                   className="mb-2 block text-sm font-medium text-white">YOUR EMAIL</label>
                            <input type="email" name="email" id="email"
                                   onChange={e => setEmail(e.target.value)}
                                   className="border sm:text-sm rounded-lg block w-full p-2.5 bg-indigo-900 border-gray-600 placeholder-white text-white focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="name@company.com" required/>
                            <label htmlFor="password"
                                   className="mt-8 mb-2 block text-sm font-medium text-white">PASSWORD</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   onChange={e => setPassword(e.target.value)}
                                   className="border sm:text-sm rounded-lg block w-full p-2.5 bg-indigo-900 border-gray-600 placeholder-white text-white focus:ring-blue-500 focus:border-blue-500"
                                   required/>
                            <label htmlFor="confirm-password"
                                   className="block mt-8 mb-2 text-sm font-medium text-gray-900 text-white">CONFIRM
                                PASSWORD</label>
                            <input type="password" name="confirm-password" id="confirm-password"
                                   onChange={e => setPasswordCheck(e.target.value)}
                                   placeholder="••••••••"
                                   className="border sm:text-sm rounded-lg block w-full p-2.5 bg-indigo-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                   required/>
                            <button type="submit"
                                    className="mt-8  w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-indigo-900 hover:bg-orange-500">LOGIN
                            </button>

                            <p className="mt-8 text-sm font-light text-gray-50">
                                Already have an account? <a href="/"
                                                            className="font-medium text-primary-600 hover:underline text-primary-500">Login
                                here</a>
                            </p>
                            {error && (
                                <p className="mt-4 text-sm text-bold text-white animate-bounce">{error}</p>
                            )}
                        </form>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default Signup;
