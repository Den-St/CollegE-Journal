import { Header } from "../Header"
import "./layoutStyles.scss";
type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    return <div className="layout__container">
        <Header/>
        {children}
    </div>
}