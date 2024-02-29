import { Link } from "react-router-dom"
import { LeftArrowSvg } from "../../svgs/leftArrowSvg"
import './styles.scss';

type Props = {
    route:string,
    title:string
}

export const LinkBack:React.FC<Props> = ({route,title}) => {
    return <Link className="linkBackContainer" to={route}><LeftArrowSvg/><h2 className="linkBackTitle">{title}</h2></Link>
}