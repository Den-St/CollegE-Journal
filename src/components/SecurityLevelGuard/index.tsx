import { Spin } from "antd";
import { useUserStore } from "../../store/userStore"
import { NoMatch } from "../NoMatch";

type Props = {
    children:React.ReactNode,
    securityLevel:number,
    isActiveRequired?:boolean,
    blockedForAdmin?:boolean
}

export const SecurityLevelGuard:React.FC<Props> = ({children,securityLevel,isActiveRequired,blockedForAdmin}) => {
    const user = useUserStore().user;
    console.log('qwe',user.security_level);
    if(user.security_level === undefined || user.security_level === null) return <div className="securityGuardLoader"><Spin/></div>;
    if(user.security_level < securityLevel) return <NoMatch title="Не вдалося знайти сторінку" description="Спробуйте перезайти на сайт або повторіть спробу пізніше." is404/>;
    if(isActiveRequired && !user.is_active) return <NoMatch title="Активуйте свій запис" description="Щоб отримати доступ до функціоналу електронного журналу необхідно змінити пароль." isChildren/>;
    // if(blockedForAdmin) return <NoMatch title="Не вдалося знайти сторінку" description="Спробуйте перезайти на сайт або повторіть спробу пізніше." is404/>;

    return <>{children}</>
}