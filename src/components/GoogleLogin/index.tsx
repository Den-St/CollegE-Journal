import { useGoogleAuthLogin } from "../../hooks/googleAuth";
import { Loader } from "../Loader/Loader";

export const GoogleLogin = () => {
    const {loading} = useGoogleAuthLogin();
    
    if(loading) return <Loader/>
    return <></>
}