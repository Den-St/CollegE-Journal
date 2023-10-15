import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { collegeLogoSvg } from '../../assets/svgs/college_logo';
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
                {collegeLogoSvg()}
                <h1 className="footer__title">Електронний журнал - це журнал, який завжди поруч!</h1>
            </div>
            <div className="footer__circle"></div>
            <div className="btn__lists">
                <ul className="footer__list">
                    <h1 className="fList__title">Більше Про Журнал</h1>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.start.distance)}>Головна</button></li>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.news.distance)}>Новини</button></li>
                    <li><button className="fList__btn" onClick={() => goToSection(sectionIds.about.distance)}>Про нас</button></li>
                    <li><Link className="fList__btn" to="/sign-in">Вхід</Link></li>
                </ul>
                <ul className="footer__list">
                    <h1 className="fList__title">Ми У Соц. Мережах</h1>
                    <li><a className="fList__btn" href="#">Instagram</a></li>
                    <li><a className="fList__btn" href="#">Telegram</a></li>
                </ul>
            </div>
        </div>
    </footer>
    <div className="bottom__title"><h1 className="bottom__text">© Електронний щоденник, ФКЗІ ДУІТЗ. Всі права захищені, 2023.</h1></div>
    </>
}