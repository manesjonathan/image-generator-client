import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FaTrash} from "react-icons/fa"
import axios from "axios";
import {URL} from "../config/config";

const ImageFullScreen = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("jwt");
        axios.delete(`${URL}/image/delete`, {
            params: {name: id}
        }).then(() => {
            navigate("/gallery");
        })
        console.log('delete done')
    };

    return (
        <section className={'flex flex-col items-center justify-center h-screen-custom w-full'}>
            <div className={'items-end flex flex-col'}>
                <img width={512} src={`https://dall-e-history.s3.eu-west-3.amazonaws.com/${id}`} alt="Full screen"/>
                <button className={'flex mt-2 justify-center items-center text-white'} onClick={handleDelete}><p>DELETE PICTURE</p><FaTrash className={'ml-2'}/></button>
            </div>
        </section>
    );
};

export default ImageFullScreen;
