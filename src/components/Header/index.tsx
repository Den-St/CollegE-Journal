import { Link } from 'react-router-dom';
import './styles.scss';
import {collegeLogoSvg} from '../../assets/svgs/college_logo';

export const Header = () => {
    return <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="logo__block">
                        <Link to="index.html" className="header__logo">
                            {collegeLogoSvg()}
                        </Link>
                    </div>
                    <nav className="nav">
                        <Link to="#" className="menu__button">
                            Головна
                            <svg className="underline_mButton" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to="#" className="menu__button">Новини
                            <svg className="underline_mButton" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to="#" className="menu__button">Про нас
                            <svg className="underline_mButton" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                    </nav>
                    <div className="signIn">
                        <Link to="#" className="signBtn">Вхід</Link>
                    </div>
                </div>
            </div>
        </header>
}