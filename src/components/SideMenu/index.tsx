import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { routes } from "../../consts/routes";
import { sectionIds } from "../../consts/sectionIds";
import { useUserStore } from "../../store/userStore";
import { Footer } from "../Footer";
import { HeaderNavLinks } from "../Header/HeaderNavLinks";
import "./sideMenuStyles.scss";

type Props = {
    openedClass:"shown" | "hidden",
    goToSection:(sectionLocation:number) => void,
    onToggleSideMenu:() => void
}

export const SideMenu:React.FC<Props> = ({openedClass,goToSection,onToggleSideMenu}) => {
    const route = useLocation().pathname.replace('/','');
    const user = useUserStore().user;
    const onGoToSection = (sectionLocation:number) => {
        onToggleSideMenu();
        goToSection(sectionLocation);
    }

    return <div className={`sideMenu_container ${openedClass}`}>
        <nav className="sideMenu_nav">
            {/* <button onClick={() => onGoToSection(sectionIds.start.scrollTo)} className="sideMenu_nav__link">Головна</button>
            <button onClick={() => onGoToSection(sectionIds.news.scrollTo)} className="sideMenu_nav__link">Новини</button>
            <button onClick={() => onGoToSection(sectionIds.info.scrollTo)} className="sideMenu_nav__link">Журнал</button>
            <button onClick={() => onGoToSection(sectionIds.about.scrollTo)} className="sideMenu_nav__link">Про нас</button> */}
            <HeaderNavLinks onGoToSection={onGoToSection} linksClassName={'sideMenu_nav__link'}/>
        </nav>
        <Footer/>
    </div>
}