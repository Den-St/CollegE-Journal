import { Link, useLocation } from 'react-router-dom';
import './headerStyles.scss';
import {collegeLogoSvg} from '../../assets/svgs/college_logo';
import { Switch } from 'antd';
import { themes } from '../../consts/themes';
import { useThemeController } from '../hooks/themeController';
import { sectionIds } from '../../consts/sectionIds';

export const Header = () => {
    const {theme,onToggleThemeSwitch} = useThemeController();
    const route = useLocation().pathname.replace('/','');
    const goToSection = (sectionId:string) => {
        window.location.href = sectionId;
    }
    return <header className={`header ${theme} ${route+'home'}`}>
            <div className="container">
                <div className="header__wrapper">
                    <div className="logo__block">
                        <Link to="/" className="header__logo">
                            {collegeLogoSvg()}
                        </Link>
                    </div>
                    <nav className="nav">
                        <button onClick={() => goToSection(sectionIds.start)} className="menu__button">
                            Головна
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <button onClick={() => goToSection(sectionIds.news)} className="menu__button">Новини
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <button onClick={() => goToSection(sectionIds.about)} className="menu__button">Про нас
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </nav>
                    <div className='headerRightButtons__container'>
                        <Switch defaultChecked={true} onChange={onToggleThemeSwitch} checked={theme === themes.dark}/>
                        <div className="signIn">
                            <Link to="/sign-in" className="signBtn">Вхід</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
}