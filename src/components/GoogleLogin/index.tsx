import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { setToken } from "../../helpers/auth";

export const GoogleLogin = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    useEffect(() => {
        //message to parent
        setToken(token || '')
        window.parent.postMessage(JSON.stringify({params: {token: searchParams.get('token')}}), "*");
        window.close();  
        //close iframe
    }, [])
    return <></>
}