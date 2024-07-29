import { endpoints } from './../consts/endpoints';
import axiosConfig from '../axiosConfig';

export const useGoogleAuth = () => {
    const onOpenAuthWindow = async () => {
        try{
            const res = await axiosConfig.get(endpoints.googleAuthGetUrl);
            console.log(res);
            const popup = window.open(res.data.redirect_url,'googleAuthPopup','width=600,height=400,left=200,top=200',);
            
            window.addEventListener('message', function(event) {
                // Check the origin of the message for security reasons
                if (event.origin !== res.data.redirect_url) {
                    return;
                }

                // Handle the received data
                console.log('Data received from popup:', event.data);

                // You can now use the data in your main app
            }, false);
        }catch(err){
            console.error(err);
        }
    }

    return {onOpenAuthWindow};
}