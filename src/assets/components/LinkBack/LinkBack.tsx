import { Link } from "react-router-dom"
import { LeftArrowSvg } from "../../svgs/leftArrowSvg"
import './styles.scss';

type Props = {
    route:string,
    title:string
}

export const LinkBack:React.FC<Props> = ({route,title}) => {
    return <div className="linkBackContainer">
        <Link to={route}><LeftArrowSvg/></Link>
        <h2 className="linkBackTitle">{title}</h2>
    </div>
}