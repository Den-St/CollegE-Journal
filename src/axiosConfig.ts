import axios from "axios";
import Cookies from "js-cookie";
import {getToken} from "./helpers/auth";

export const getConfig = () => {
    const token = getToken();
    return {
        headers: {Authorization: token}
    }
};

const instance = axios.create({
    //@ts-ignore
    baseURL:process.env.REACT_APP_BACKEND_URL,
    ...getConfig(),
});


export default instance;