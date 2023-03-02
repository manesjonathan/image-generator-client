import axios from "axios";
import {URL} from "./config.js";

export const loginFunction = (user, navigate) => {
    return axios.post(`${URL}/user/login`, user).then(res => {
        Object.keys(res.data).forEach(function (key) {
            localStorage.setItem("jwt", key);
            localStorage.setItem("roles", JSON.stringify(res.data[key]));
        });

        navigate("/generate");
    })
}
