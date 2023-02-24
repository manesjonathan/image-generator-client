import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {URL} from "../config/config.js";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            email: email,
            password: password
        }

        try {
            axios.post(`${URL}/user/login`, user).then(res => {
                localStorage.setItem("jwt", res.data);
                navigate("/dashboard");
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
                <div
                    className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 backdrop-filter backdrop-blur-md bg-transparent border-2 border-fuchsia-200">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Sign in to your account
                        </h1>
                        <form className="" method="post" onSubmit={handleSubmit}>
                            <label htmlFor="email"
                                   className="mb-2 block text-sm font-medium text-white">YOUR EMAIL</label>
                            <input type="email" name="email" id="email"
                                   onChange={e => setEmail(e.target.value)}
                                   className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-indigo-900 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="name@company.com" required/>
                            <label htmlFor="password"
                                   className="mt-8 mb-2 block text-sm font-medium text-gray-900 dark:text-white">PASSWORD</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   onChange={e => setPassword(e.target.value)}
                                   className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-indigo-900 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>

                            <button type="submit"
                                    className="mt-8  w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-indigo-900 hover:bg-orange-500">LOGIN
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
