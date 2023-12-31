import { useThemeStore } from "../../store/themeStore";
import { CookiesNotification } from "../CookiesNotification";
import { Footer } from "../Footer";
import { Header } from "../Header"
import "./layoutStyles.scss";
type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const theme = useThemeStore().theme;
    return <div className={`layout__container ${theme}`}>
            <Header/>
            <main>{children}</main>
            <Footer/>
            <CookiesNotification/>
        </div>
}