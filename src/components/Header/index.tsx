import { Link, useLocation } from 'react-router-dom';
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
import { useSideMenuStore } from '../../store/sideMenuStore';
import { securityLevels } from '../../consts/securityLevels';

const useHeaderVisibility = () => {
    const [headerVisibilityClass,setHeaderVisibilityClass] = useState<'visible' | 'hidden' | 'visible_on_scroll' | 'visible_on_touch'>('visible');
    const onTouchShowHeader = () => {
        setHeaderVisibilityClass('visible_on_touch');
    }
    const onMouseOutBlur = () => {
        const distanceFromTop = window.scrollY;

        distanceFromTop > 30 && setHeaderVisibilityClass('hidden');
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

    return {headerVisibilityClass,onTouchShowHeader,onMouseOutBlur}
}

export const Header = () => {
    const route = useLocation().pathname.replace('/','');
    const user = useUserStore().user;

//${headerVisibilityClass}
    return <header className={`w-full bg-thirdDark flex pl-[30px] pr-[30px] fixed z-50`}>
            <div className='flex items-center flex-grow h-[70px]'>
                <h1>Qrwfdsa fasdfasd fsadfa sd</h1>
            </div>
            <div className='w-[300px]'>s</div>
        </header>
}