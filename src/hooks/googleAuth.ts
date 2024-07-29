import { setToken } from './../helpers/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import axiosConfig from '../axiosConfig';
import { useUserStore } from '../store/userStore';
import { setChangeProfileCookie } from '../helpers/setChangeProfileCookie';
import { routes } from '../consts/routes';
import { UserT } from '../types/user';

export const useGoogleAuth = () => {
    const [searchParams,_] = useSearchParams();
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const scope = searchParams.get('scope');
    const authuser = searchParams.get('authuser');
    const prompt = searchParams.get('prompt');
    const signIn = useUserStore().signIn;
    const localToken = useUserStore().user.token;
    const onUserLoading = useUserStore().startLoading;
    const onStopUserLoading = useUserStore().stopLoading;
    const navigate = useNavigate();
    
    const auth = async () => {
        if(!localToken) return;
        onUserLoading();
        try{
            const res = await axiosConfig.get<{data:UserT}>(endpoints.auth,{headers:{Authorization:localToken}});
            signIn({...res.data.data,token:localToken || ''},);
            if(!res.data.data.is_active){
                setChangeProfileCookie();
                navigate(routes.editProfile);
            }
        }catch(err){
            console.error(err);
        }finally{
            onStopUserLoading();
        }
    }
    const onOpenAuthWindow = async () => {
        try{
            const res = await axiosConfig.get(endpoints.googleAuthGetUrl);
            console.log(res);
            const popup = window.open(res.data.redirect_url,'googleAuthPopup','width=600,height=400,left=200,top=200',);
            if(!popup) return;
            window.addEventListener('message', async function(event) {
                    console.log('asd',event.data);
                    console.log('asd2',event);
                    // if (event.data !== 'success_close') {
                    //     return;
                    // }
                    await auth();
                }, false);
        }catch(err){
            console.error(err);
        }
    }
    const onGoogleLogin =  async () => {
        try{
            const res = await axiosConfig.get(endpoints.googleLogin+`?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`);
            console.log(res);
            if(!res.data.data.token) return;
            setToken(res.data.data.token);
            window.opener.postMessage({a:'success_close'},'http://localhost:3000/sign-in');
            window.close();
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(!state || !code || !scope || authuser === null || !prompt) return;
        onGoogleLogin();
    },[state,code,scope,authuser,prompt])

    return {onOpenAuthWindow};
}