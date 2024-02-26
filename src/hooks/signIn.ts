import { securityLevels } from './../consts/securityLevels';
import { routes } from './../consts/routes';
import { useNavigate } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { setToken } from './../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { UserT } from '../types/user';
import Cookies from 'js-cookie';
import { setChangeProfileCookie } from '../helpers/setChangeProfileCookie';

export const useSignIn = () => {
    const [status,setStatus] = useState<number>();
    const [loading,setLoading] = useState(false);
    const [remember,setRemember] = useState(false);
    const signIn = useUserStore().signIn;
    const navigate = useNavigate();
    const auth = async (token:string,active:boolean) => {
        try{
            const res = await axiosConfig.get<{data:UserT}>(endpoints.auth,{headers:{Authorization:token}});
            signIn(res.data.data);
            if(res.data.data.security_level === securityLevels.admin) {
                navigate(routes.adminPanel + '?section=schedule');
                return;
            }
            console.log('active',active);
            if(res.data.data.is_active){
                navigate(routes.myProfile);
                return;
            }
            if(!res.data.data.is_active) {
                setChangeProfileCookie();
                navigate(routes.editProfile);
                setStatus(2);
            }
        }catch(err){
            console.error(err);
        }
    }
    const onLogin = async (data:{mailbox_address:string,user_password:string}) => {
        setLoading(true);
        try{
            const res = (await axiosConfig.post(endpoints.login,
                data
            ));
            if(res?.data.status === 1){
                if(remember) setToken(res.data.data.token);
                signIn({
                    token:res.data.data.token,
                    ...res.data.data
                });
                await auth(res.data.data.token,res.data.data.active);
            }
            console.log(res.data.data);
            
            // setStatus(res?.data.status);
        }catch(err){
            setStatus(0);
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    return {onLogin,status,loading,setRemember};
}