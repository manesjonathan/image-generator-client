import axios from "axios";
import {useState} from "react";
import {URL} from "../config/config.js";
import {CircleLoader} from "react-spinners";

function ImagePrompt() {
    const [prompt, setPrompt] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    function handleSubmit(e) {
        e.preventDefault()

        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("jwt");
        axios.post(`${URL}/image/generate`, prompt).then(res => {
            setUrl(res.data);
            setIsLoading(false)
        })
    }

    return (
        <section className={'w-full min-h-screen bg-gray-800'}>
            <article className={' items-center w-full'}>
                <form className="p-8 m-auto items-center w-full" method="post" onSubmit={handleSubmit}>
                    <div className={'flex'}>
                        <label htmlFor="text"
                               className="block w-full text-sm font-medium text-gray-900 dark:text-white">
                            <input type="text" name="text" id="text"
                                   onChange={e => setPrompt(e.target.value)}
                                   className="m-auto w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Enter something cool" required=""/></label>
                        <button type="submit"
                                className="block ml-4 m-auto text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-orange-500">
                            SEND
                        </button>
                    </div>
                </form>
            </article>


            {(url &&
                <article className={'w-full bg-gray-800'}>
                    {(isLoading && <CircleLoader/>)}

                    <img className={"m-auto shadow-xl "} width={512} height={512} src={url} alt=""/>
                </article>
            )}
        </section>
    );
}

export default ImagePrompt;
