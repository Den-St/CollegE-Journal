import { sectionIds } from "../../consts/sectionIds";
import { Footer } from "../Footer";
import "./sideMenuStyles.scss";

type Props = {
    openedClass:"shown" | "hidden",
    goToSection:(sectionLocation:number) => void,
    onToggleSideMenu:() => void
}

export const SideMenu:React.FC<Props> = ({openedClass,goToSection,onToggleSideMenu}) => {
    const onGoToSection = (sectionLocation:number) => {
        onToggleSideMenu();
        goToSection(sectionLocation)
    }
    return <div className={`sideMenu_container ${openedClass}`}>
        <nav className="sideMenu_nav">
            <button onClick={() => onGoToSection(sectionIds.start.scrollTo)} className="sideMenu_nav__link">Головна</button>
            <button onClick={() => onGoToSection(sectionIds.news.scrollTo)} className="sideMenu_nav__link">Новини</button>
            <button onClick={() => onGoToSection(sectionIds.info.scrollTo)} className="sideMenu_nav__link">Журнал</button>
            <button onClick={() => onGoToSection(sectionIds.about.scrollTo)} className="sideMenu_nav__link">Про нас</button>
        </nav>
        <Footer/>
    </div>
}