import { Link } from 'react-router-dom';
import './headerStyles.scss';
import {collegeLogoSvg} from '../../assets/svgs/college_logo';
import { Switch } from 'antd';
import { themes } from '../../consts/themes';
import { useThemeController } from '../hooks/themeController';

export const Header = () => {
    const {theme,onToggleThemeSwitch} = useThemeController();
    console.log(theme);
    
    return <header className={`header ${theme}`}>
            <div className="container">
                <div className="header__wrapper">
                    <div className="logo__block">
                        <Link to="/" className="header__logo">
                            {collegeLogoSvg()}
                        </Link>
                    </div>
                    <nav className="nav">
                        <Link to="/" className="menu__button">
                            Головна
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to="#" className="menu__button">Новини
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to="#" className="menu__button">Про нас
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
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