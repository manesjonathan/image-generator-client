import axios from "axios";
import {URL} from "./config.js";

export const loginFunction = (user, navigate) => {
    return axios.post(`${URL}/user/login`, user).then(res => {
        console.log(res.data)
        Object.keys(res.data).forEach(function (key) {
            localStorage.setItem("jwt", key);
            console.log(key)

            localStorage.setItem("roles", JSON.stringify(res.data[key]));
            console.log(res.data[key]);

        });
        navigate("/generate");
    })
}
