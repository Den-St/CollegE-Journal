import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';

export const useSignIn = () => {
    const [status,setStatus] = useState<number>();
    const [loading,setLoading] = useState(false);
    const signIn = useUserStore().signIn;

    const onLogin = async (data:{mailbox_address:string,user_password:string}) => {
        setLoading(true);
        try{
            const res = (await axiosConfig.post('users/login',
                data
            ));
            if(res?.data.status === 1){
                console.log('1');
                signIn({
                    mailbox_adress:data.mailbox_address,
                    name:'user_name'
                });
            }
            setStatus(res?.data.status);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    return {onLogin,status,loading};
}