import axios from "axios";
import {URL} from "./config.js";

export const loginFunction = (user, navigate) => {
    return axios.post(`${URL}/user/login`, user).then(res => {
        localStorage.setItem("jwt", res.data);
        navigate("/generate");
    })
}