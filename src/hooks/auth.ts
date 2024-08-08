import { routes } from './../consts/routes';
import { useNavigate } from 'react-router-dom';
import { setChangeProfileCookie } from './../helpers/setChangeProfileCookie';
import { UserT } from './../types/user';
import { useUserStore } from './../store/userStore';
import { useEffect } from 'react';
import { getToken } from './../helpers/auth';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { endpoints } from '../consts/endpoints';

export const useAuth = () => {
    const [loading,setLoading] = useState(false);
    const signIn = useUserStore().signIn;
    const cookieToken = getToken();
    const localToken = useUserStore().user.token;
    const onUserLoading = useUserStore().startLoading;
    const onStopUserLoading = useUserStore().stopLoading;
    const navigate = useNavigate();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYWx0IjoiYidcXHg5ZlxceGY4XFx4ZTFcXHhjOEJcXHhhZFxceDlkXFxyXFx4MDRcXHgwMlxceGU4JFxceGRhXFx4OGZcXHgxY1JfXFx4MTFcXHg4MFxceDBjXFx4YWVUKnlcXHgxN1xceDg0cVxceDg1XCIzK1xceDk3JyIsInVzZXJfaWQiOiI2NWFhY2FkNTdiOTg5NDI3ZTA4ZDljNDUiLCJ1c2VyX3Bhc3N3b3JkIjoiYidcXHg4ZVxceDAwXFx4MTJcXHg4NSRKXFx4MWNcXHhiMVxceGE3XFx4Y2ZcXHhmYyhcXHhkZXRcXHgwMHFcXHhiMlxceDgyXFx4ZTlcXHhhNVxceGRjXFx4YWVcXHg4NlxceDEwXFx0XFx4YTFLX1xcckhcXHhiZlxceDFiWXpcXHhjOS5cXHg4NkZlXFx4OWZcXHhjZlxceGI0O1xceGE5bVxceDE0Pkw7XFx4ZWNoOFxceGNmXFx4ZGNeXFx4ZDZjXFx4ZjlcXHhhYVxceGU5SEhxKicifQ.dlg_m7BTW4YjSnda-D1pklCr7BIbKmui-b9V6nXtI8I";

    const auth = async () => {
        if(!token && !token) return;
        onUserLoading();
        setLoading(true);
        try{
            const res = await axiosConfig.get<{data:UserT}>(endpoints.auth,{headers:{Authorization:token}});
            signIn({...res.data.data,token:token || ''},);
            if(!res.data.data.is_active){
                setChangeProfileCookie();
                navigate(routes.editProfile);
            }
        }catch(err){
            console.error(err);
        }finally{
            onStopUserLoading();
            setLoading(false);
        }
    }

    useEffect(() => {
        auth();
    },[]);

    return {loading};
}