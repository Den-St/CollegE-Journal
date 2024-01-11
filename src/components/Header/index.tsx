import { Link, useLocation } from 'react-router-dom';
import './headerStyles.scss';
import {CollegeLogoSvg} from '../../assets/svgs/college_logo';
import { Modal, Popover, Switch } from 'antd';
import { themes } from '../../consts/themes';
import { useThemeController } from '../../hooks/themeController';
import { sectionIds } from '../../consts/sectionIds';
import { headerRoutes, routes } from '../../consts/routes';
import { goToSection } from '../../helpers/goToSection';
import { useCallback, useEffect, useRef, useState } from 'react';
import _debounce from 'lodash/debounce';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { useSideMenu } from '../../hooks/sideMenu';
import { SideMenu } from '../SideMenu';
import { useUserStore } from '../../store/userStore';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { UserPopup } from '../UserPopup';
import { HeaderNavLinks } from './HeaderNavLinks';

const useHeaderVisibility = () => {
    const [headerVisibilityClass,setHeaderVisibilityClass] = useState<'visible' | 'hidden' | 'visible_on_scroll' | 'visible_on_touch'>('visible');
    const onTouchShowHeader = () => {
        setHeaderVisibilityClass('visible_on_touch');
    }
    const lastScrollPos = useRef(window.scrollY);
    const handleScroll = () => {
        const distanceFromTop = window.scrollY;

        setHeaderVisibilityClass(distanceFromTop > lastScrollPos.current ? 'hidden' : 'visible_on_scroll');
        distanceFromTop < 30 && setHeaderVisibilityClass('visible');
        lastScrollPos.current = window.scrollY;
    }
    const debounceHandleScroll = useCallback(_debounce(handleScroll, 100),[lastScrollPos.current]);

    useEffect(() => {
        window.addEventListener('scroll',debounceHandleScroll);
    },[]);

    return {headerVisibilityClass,onTouchShowHeader}
}


export const Header = () => {
    const {theme,onToggleThemeSwitch} = useThemeController();
    const route = useLocation().pathname.replace('/','');
    const user = useUserStore().user;
    const {headerVisibilityClass,onTouchShowHeader} = useHeaderVisibility();
    const {sideMenuOpened,onToggleSideMenu} = useSideMenu();

    return <header onMouseOver={onTouchShowHeader} className={`header ${theme} ${route+'home'} ${headerVisibilityClass} ${'sideMenu' + sideMenuOpened}`}>
            <SideMenu openedClass={sideMenuOpened} goToSection={goToSection} onToggleSideMenu={onToggleSideMenu}/>
            <div className={`header_container ${headerVisibilityClass}`}>
                <div className="header__wrapper">
                    <div className='headerLeft_mobile'>
                        <button onClick={onToggleSideMenu} className={`header_toggleMenu ${sideMenuOpened}`}>
                            <FilterIconSvg/>
                        </button>
                        <div className="logo__block">
                            <Link to={routes.homePage} className="header__logo">
                                <CollegeLogoSvg/>
                            </Link>
                        </div>
                    </div>
                    <nav className="nav">
                        <HeaderNavLinks linksClassName='menu__button'/>
                        {/* <Link to={routes.journal.replace(':id','1')} className="menu__button">Journal
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
                        <Link to={routes.createStudyMaterials} className="menu__button">CreateStudyMaterial
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.adminPanel} className="menu__button">AdminPanel
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.students} className="menu__button">Students
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={routes.studyMaterials} className="menu__button">StudyMaterials
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={headerRoutes.studyMaterialsCheckTeacher} className="menu__button">StudyMaterialsCheckTeacher
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={headerRoutes.scheduleCreate} className="menu__button">ScheduleCreate
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link>
                        <Link to={headerRoutes.faq} className="menu__button">FAQ
                            <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                                <path d="M1 1H51" strokeLinecap="round"/>
                            </svg>
                        </Link> */}
                    </nav>
                    <div className='headerRightButtons__container'>
                        <Switch defaultChecked={true} onChange={onToggleThemeSwitch} checked={theme === themes.dark}/>
                        {!user.full_name 
                        ? <div className="signIn">
                            <Link to="/sign-in" className="signBtn">Вхід</Link>
                        </div> 
                        : <Popover arrow={false} content={<UserPopup/>} placement={'bottomRight'}>
                            <Link to={routes.myProfile}>
                                <img className='header_avatar' src={defaultAvatar}/>
                            </Link>
                        </Popover>}
                    </div>
                </div>
            </div>
        </header>
}