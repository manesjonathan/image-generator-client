import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../config/config.js";

const ImageGallery = () => {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("jwt");
        axios.get(`${URL}/image/get-history`).then(res => {
            console.log('je passe ici')
            setImageList(res.data);
        });
    }, [])

    return (
        <main className={'backdrop-filter backdrop-blur-md bg-transparent drop-shadow-2xl'}>
            <section className={'flex flex-col'}>
                <article
                    className={'sm:m-14 flex flex-col sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4 items-center justify-center'}>
                    {imageList.map((image, index) => {
                        let src = `https://dall-e-history.s3.eu-west-3.amazonaws.com/${image.key}`;
                        return (

                            <a key={index} href={`/view/${image.key}`}>
                                <img className={'lg:hover:scale-110'} key={index}
                                     src={src}
                                     alt={image[0]}/>
                            </a>
                        )
                    })}
                </article>
            </section>
        </main>
    )
}

export default ImageGallery;
