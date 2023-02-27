import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../config/config.js";


const Gallery = () => {
    const [imageList, setImageList] = useState([]);
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("jwt");
        axios.get(`${URL}/image/get-history`).then(res => {
            console.log(res.data);
            setImageList(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <section className={'flex flex-col'}>
            <article className={'mt-32 md:mx-14 flex flex-col sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4'}>
                {imageList.map((image, index) => {
                    return (
                        <a key={index} href={`https://dall-e-history.s3.eu-west-3.amazonaws.com/${image.key}`}
                           rel={'noreferrer'}
                           target={'_blank'}>
                            <img className={'lg:hover:scale-125'} key={index}
                                 src={`https://dall-e-history.s3.eu-west-3.amazonaws.com/${image.key}`}
                                 alt={image[0]}/>
                        </a>
                    )
                })}
            </article>
        </section>
    )
}

export default Gallery;