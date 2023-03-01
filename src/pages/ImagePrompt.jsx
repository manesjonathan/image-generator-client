import axios from "axios";
import React, {useState} from "react";
import {URL} from "../config/config.js";
import {ClimbingBoxLoader} from "react-spinners";

const ImagePrompt = () => {
    const [prompt, setPrompt] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true);
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("jwt");
        axios.post(`${URL}/image/generate`, prompt).then(res => {
            if (res.status === 200) {
                setUrl(res.data)
            }
        }).finally(() => {
            setIsLoading(false);
        }).catch(err => {
            setErrorMessage('You have used all of your free tokens. Please refill to continue.')
        });
    }

    if (!errorMessage) {
        return (
            <main className={'w-ful flex flex-col justify-center items-center h-screen-custom'}>
                {errorMessage && <p className={'text-red-500'}>{errorMessage}</p>}
                <form className="p-8 m-auto items-center flex min-w-2/3 sm:w-2/3" method="post"
                      onSubmit={handleSubmit}>
                    <label htmlFor="text"
                           className="block w-full text-sm font-medium text-gray-900 dark:text-white">
                        <input type="text" name="text" id="text"
                               onChange={e => setPrompt(e.target.value)}
                               className="m-auto w-full border sm:text-sm rounded-lg block p-2.5 bg-indigo-900 border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder:text-white"
                               placeholder="Enter something cool..." required/></label>
                    <button type="submit"
                            className="block ml-4 m-auto text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-900 hover:bg-orange-500">SEND
                    </button>
                </form>

                <article className={'w-full flex flex-col items-center '}>
                    {isLoading && <ClimbingBoxLoader className={"m-28"} color='#fff' size={30}/>}
                    {url && <img className={"m-auto shadow-xl "} width={512} height={512} src={url} alt=""/>}
                </article>
            </main>
        );
    } else {
        return (<div className="flex items-center justify-center h-screen-custom">
                <div className="bg-indigo-900 text-white p-6 m-auto">
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base font-semibold text-center">Failed</h3>
                        <p className="my-2">{errorMessage}</p>
                        <div className="py-10 text-center">
                            <a href="/refill"
                               className="px-12 bg-indigo-600 hover:bg-orange-500 text-white font-semibold py-3">
                                REFILL
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImagePrompt;
