import { setToken } from './../helpers/auth';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import axiosConfig from '../axiosConfig';

export const useGoogleAuth = () => {
    const [searchParams,_] = useSearchParams();
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    const scope = searchParams.get('scope');
    const authuser = searchParams.get('authuser');
    const prompt = searchParams.get('prompt');
    
    const onOpenAuthWindow = async () => {
        try{
            const res = await axiosConfig.get(endpoints.googleAuthGetUrl);
            console.log(res);
            const popup = window.open(res.data.redirect_url,'googleAuthPopup','width=600,height=400,left=200,top=200',);
         
        }catch(err){
            console.error(err);
        }
    }
    const onGoogleLogin =  async () => {
        try{
            const res = await axiosConfig.get(endpoints.googleLogin+`?state=${state}&code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`);
            if(!res.data.token) return;
            setToken(res.data.token);
            window.close();
        }catch(err){
            console.log(err);
        }
    }
    // console.log(state , code , scope , authuser , prompt)
    useEffect(() => {
        if(!state || !code || !scope || authuser === null || !prompt) return;
        onGoogleLogin();
    },[state,code,scope,authuser,prompt])

    return {onOpenAuthWindow};
}