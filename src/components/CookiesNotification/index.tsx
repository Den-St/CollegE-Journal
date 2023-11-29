import "./cookiesNotificationStyles.scss";
import { CollegeLogoSvg } from "../../assets/svgs/college_logo";
import { useThemeStore } from "../../store/themeStore";
import { useState } from "react";

export const CookiesNotification = () => {
    const useCookies = () => {
        const [isCookiesAccepted,setIsCookiesAccepted] = useState(!!localStorage.getItem('cookiesAccepted'));

        const onAccept = () => {
            localStorage.setItem('cookiesAccepted','true');
            setIsCookiesAccepted(true);
        }
        return {onAccept,isCookiesAccepted}
    }
    const {isCookiesAccepted,onAccept} = useCookies();
    const theme = useThemeStore().theme;
    if(isCookiesAccepted) return <></>;

    return <div className={`cookies__container ${theme}`}>
        <CollegeLogoSvg/>
        <p className="cookiesInfo">Ми використовуємо Cookies, для покращення вашого опиту користування сайтом та повного функціонування сайту</p>
        <button className="cookiesAccept_button" onClick={onAccept}>Прийняти усе</button>
    </div>
}