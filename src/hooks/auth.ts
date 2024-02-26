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
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;
    const onUserLoading = useUserStore().startLoading;
    const onStopUserLoading = useUserStore().stopLoading;
    const navigate = useNavigate();

    const auth = async () => {
        if(!localToken && !cookieToken) return;
        setLoading(true);
        onUserLoading();
        try{
            const res = await axiosConfig.get<{data:UserT}>(endpoints.auth,{headers:{Authorization:localToken || cookieToken}});
            signIn({...res.data.data},);
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