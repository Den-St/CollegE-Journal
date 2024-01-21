import { Link, useLocation } from "react-router-dom";
import { routes } from "../../consts/routes";
import { sectionIds } from "../../consts/sectionIds";
import { goToSection } from "../../helpers/goToSection";
import { useUserStore } from "../../store/userStore";

type Props = {
    linksClassName:string,
    onGoToSection?:(scrollTo:number) => void,
}
export const HeaderNavLinks:React.FC<Props> = ({linksClassName,onGoToSection,}) => {
    const route = useLocation().pathname.replace('/','');
    const isActiveLink = (link:string) => '/' + route === link || route.includes(link) ? ' active_link' : '';
    const securityLevelToLinks:Record<number,JSX.Element> = {
        0:<></>,
        1:<>
            <Link  to={routes.pickJournalSubjectStudent} className={linksClassName + isActiveLink(routes.groups) + isActiveLink(routes.pickJournalSubjectStudent) + isActiveLink(routes.journal)}>Журнал
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
        </>,
        5:<>
            {/* <Link to={routes.homePage} className={`menu__button`}>Головна
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link> */}
            <Link  to={routes.adminPanel + `?section=schedule`} className={linksClassName + isActiveLink(routes.adminPanel)+ isActiveLink(routes.editGroup)}>Адмін-панель
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            <Link  to={routes.groups} className={linksClassName + isActiveLink(routes.groups) + isActiveLink(routes.pickJournalSubjectTeacher) + isActiveLink(routes.journal)}>Журнал
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
        </>
    }
    const user = useUserStore().user;
    return <>
        {(!route || !user.full_name) && <>
            <Link to={'https://college.suitt.edu.ua/'} target={'_blank'} className={linksClassName}>
                Сайт коледжу
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            {!route ? <button onClick={() => (onGoToSection || goToSection)(sectionIds.news.scrollTo)} className={linksClassName}>Новини
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </button>
            : <Link  className={linksClassName} to={routes.homePage + '?section=news'}>
                    Новини
                    <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                        <path d="M1 1H51" strokeLinecap="round"/>
                    </svg>
                </Link>}
            <Link  to={routes.faq} className={linksClassName + isActiveLink(routes.faq)}>FAQ
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>
            </>}
            <>
            {securityLevelToLinks[user.security_level || 0]}
            {!!route && !!user.full_name && <Link  className={linksClassName} to={routes.homePage + '?section=news'}>
                Новини
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>}
            {/* {!!route && !!user.full_name && <Link className={linksClassName + isActiveLink(routes.faq)} to={routes.faq}>FAQ
                <svg className="underline_mButton headerSvg" xmlns="http://www.w3.org/2000/svg" width="52" height="2" viewBox="0 0 52 2" fill="none">
                    <path d="M1 1H51" strokeLinecap="round"/>
                </svg>
            </Link>} */}
            </>
        </>
    // return <>
    //         {securityLevelToLinks[user.security_level || 0]}
    //         {!!route && <Link className={linksClassName} to={routes.homePage + '?section=news'}>Новини</Link>}
    //     </>
}