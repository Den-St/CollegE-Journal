import { endpoints } from './../consts/endpoints';
import { setToken } from './../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { UserT } from '../types/user';

export const useSignIn = () => {
    const [status,setStatus] = useState<number>();
    const [loading,setLoading] = useState(false);
    const [remember,setRemember] = useState(false);
    const signIn = useUserStore().signIn;

    const auth = async (token:string) => {
        try{
            const res = await axiosConfig.get<{data:UserT}>(endpoints.auth,{headers:{Authorization:token}});
            signIn(res.data.data);
        }catch(err){
            console.error(err);
        }
    }
    const onLogin = async (data:{mailbox_address:string,user_password:string}) => {
        setLoading(true);
        try{
            const res = (await axiosConfig.post('users/login',
                data
            ));
            if(res?.data.status === 1){
                if(remember) setToken(res.data.token);
                signIn({
                    token:res.data.token,
                    ...res.data.data
                });
                await auth(res.data.token);
            }
            setStatus(res?.data.status);
        }catch(err){
            setStatus(0);
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    return {onLogin,status,loading,setRemember};
}