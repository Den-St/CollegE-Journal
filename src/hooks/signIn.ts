import { setToken } from './../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import Cookies from 'js-cookie';

export const useSignIn = () => {
    const [status,setStatus] = useState<number>();
    const [loading,setLoading] = useState(false);
    const [remember,setRemember] = useState(false);
    const signIn = useUserStore().signIn;

    const onLogin = async (data:{mailbox_address:string,user_password:string}) => {
        setLoading(true);
        try{
            const res = (await axiosConfig.post('users/login',
                data
            ));

            if(res?.data.status === 1){
                if(remember) setToken(res.data.token);
                signIn({
                    mailbox_adress:data.mailbox_address,
                    name:'user_name',
                    token:res.data.token
                });
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