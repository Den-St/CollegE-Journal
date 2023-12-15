import axios from "axios";
import {getToken} from "./helpers/auth";

export const getConfig = () => {
    const token = getToken();
    return {
        headers: {Authorization: `Bearer ${token || ''}`}
    }
};

const instance = axios.create({
    baseURL:"https://54.37.74.248:5000/api/",
    ...getConfig()
});


export default instance;