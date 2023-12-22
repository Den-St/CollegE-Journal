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

    const auth = async () => {
        if(!getToken()) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.testcookies);
            console.log(res.data);
            // signIn(...res.data as UserT);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        auth();
    },[]);

    return {loading};
}