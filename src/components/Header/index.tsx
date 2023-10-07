import { Link, useLocation } from 'react-router-dom';
import './headerStyles.scss';
import {collegeLogoSvg} from '../../assets/svgs/college_logo';
import { Switch } from 'antd';
import { themes } from '../../consts/themes';
import { useThemeController } from '../../hooks/themeController';
import { sectionIds } from '../../consts/sectionIds';
import { routes } from '../../consts/routes';

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
                        <Link to={'/'} className="menu__button">
                            Головна
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <button onClick={() => goToSection(sectionIds.news.id)} className="menu__button">Новини
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <button onClick={() => goToSection(sectionIds.about.id)} className="menu__button">Про нас
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <Link to={routes.journal.replace(':id','1')} className="menu__button">Journal
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.groups} className="menu__button">Groups
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.homeTasks} className="menu__button">Home tasks
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.studentProfile.replace(':id','1')} className="menu__button">Student
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.createHomeTask} className="menu__button">CreateHomeTask
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.sendHomeTask} className="menu__button">SendHomeTask
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