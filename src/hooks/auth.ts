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

    const auth = async () => {
        if(!localToken && !cookieToken) return;
        setLoading(true);
        onUserLoading();
        try{
            const res = await axiosConfig.get<{data:UserT}>(endpoints.auth,{headers:{Authorization:localToken || cookieToken}});
            signIn(res.data.data,);
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