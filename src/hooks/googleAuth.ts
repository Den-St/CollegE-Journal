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
            console.log(res);
            if(!res.data.data.token) return;
            setToken(res.data.data.token);
            window.close();
        }catch(err){
            console.log(err);
        }
    }
    //https://collegejournal.ovh/sign-in?
    //state=RstIA1WMWhw7GJwThxrM2uh2S78HTv
    //&code=4%2F0AcvDMrAkeMk1tvJjI8CZn1orMvKznY8kS1nq9zkVTegE5ak7aj3domgbEgB9hRfNzH9q1Q
    //&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid
    //&authuser=0
    //&prompt=none
    // state: RstIA1WMWhw7GJwThxrM2uh2S78HTv
    // code: 4/0AcvDMrAkeMk1tvJjI8CZn1orMvKznY8kS1nq9zkVTegE5ak7aj3domgbEgB9hRfNzH9q1Q
    // scope: email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid
    // authuser: 0
    // prompt: none
    // console.log(state , code , scope , authuser , prompt)
    useEffect(() => {
        if(!state || !code || !scope || authuser === null || !prompt) return;
        onGoogleLogin();
    },[state,code,scope,authuser,prompt])

    return {onOpenAuthWindow};
}