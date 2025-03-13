import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../consts/routes";
import { useThemeStore } from "../../store/themeStore";
import { CookiesNotification } from "../CookiesNotification";
import { Footer } from "../Footer";
import { Header } from "../Header"
import "./layoutStyles.scss";
import { Navigation } from "../Navigation";
type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const theme = useThemeStore().theme;
    const route = useLocation().pathname;

    return <div className={`flex h-screen w-screen max-h-screen max-w-[100vw] ${theme}`}>
            <Navigation/>
            <div className="flex flex-col flex-grow h-screen overflow-x-scroll">
                {route !== routes.googleLogin && <Header/>}
                <main className="bg-primaryDark pt-[115px] pl-[15px] pr-[45px] pb-[45px]">{children}</main>
                {/* {route !== routes.googleLogin && <Footer/>} */}
                {/* {route !== routes.googleLogin && <CookiesNotification/>} */}
            </div>
        </div>
}