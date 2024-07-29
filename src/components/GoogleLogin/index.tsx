import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { setToken } from "../../helpers/auth";

export const GoogleLogin = () => {
    //https://collegejournal.ovh/api/google/login?state=I2MgIGjqlIEJmd2F201PMefRc2hz5w&code=4%2F0AcvDMrBlekEYvKitfhoACK-TCTtr7OriGEsRNWKvSdTjU8UK-EynnVxTXQXs36GJQKVpyw&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=none
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    useEffect(() => {
        //message to parent
        setToken(token || '')
        window.parent.postMessage(JSON.stringify({params: {token: searchParams.get('token')}}), "*");
        window.close();  
        //close iframe
    }, []);

    return <></>
}