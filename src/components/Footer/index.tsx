import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CollegeLogoSvg } from '../../assets/svgs/college_logo';
import { routes } from '../../consts/routes';
import { sectionIds } from '../../consts/sectionIds';
import { goToSection } from '../../helpers/goToSection';
import { useThemeStore } from '../../store/themeStore'
import './footerStyles.scss'

export const Footer = () => {
    const theme = useThemeStore().theme;
    const route = useLocation().pathname.replace('/','');
    
    return <><footer>
        <div className={`footer__content ${theme} ${route+'home'}`}>
            <div className="footer__logo">
                <CollegeLogoSvg/>
                <h1 className="footer__title">Електронний журнал - це журнал, який завжди поруч!</h1>
            </div>
            <div className="footer__circle"/>
            <div className="btn__lists">
                <ul className="footer__list">
                    <h1 className="fList__title">Більше Про Журнал</h1>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.start.distanceTop)}>Головна</button></li>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.news.distanceTop)}>Новини</button></li>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.about.distanceTop)}>Про нас</button></li>
                    <li><Link className="fList__btn" to={routes.faq}>FAQ</Link></li>
                </ul>
                <div>
                    <h1 className="fList__title">Ми У Соц. Мережах</h1>
                    <ul className="footer__list footer__list_socials">
                        <li><a className="fList__btn" href="#">Instagram</a></li>
                        <li><a className="fList__btn" href="#">Telegram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    <div className="bottom__title"><h1 className="bottom__text">© Електронний щоденник, ФКЗІ ДУІТЗ. Всі права захищені, 2023.</h1></div>
    </>
}