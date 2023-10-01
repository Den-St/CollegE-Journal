import { useThemeStore } from '../../store/themeStore'
import './footerStyles.scss'

export const Footer = () => {
    const theme = useThemeStore().theme;
    return <><footer>
        <div className={`footer__content ${theme}`}>
            <div className="footer__logo">
                <img src="../../assets/images/laptop.png" alt=""/>
                <h1 className="footer__title">Електронний журнал - це журнал, який завжди поруч!</h1>
            </div>
            <div className="footer__circle"></div>
            <div className="btn__lists">
                <ul className="footer__list">
                    <h1 className="fList__title">Більше Про Журнал</h1>
                    <li><a className="fList__btn" href="#start">Головна</a></li>
                    <li><a className="fList__btn" href="#news">Новини</a></li>
                    <li><a className="fList__btn" href="#about">Про нас</a></li>
                    <li><a className="fList__btn" href="#">Вхід</a></li>
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