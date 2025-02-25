import axios from "axios";
import Cookies from "js-cookie";
import {getToken} from "./helpers/auth";

console.log("Backend API URL:", process.env.REACT_APP_BACKEND_URL);
export const getConfig = () => {
    const token = getToken();
    return {
        headers: {Authorization: token}
    }
};

const instance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL,
    ...getConfig(),
});


export default instance;