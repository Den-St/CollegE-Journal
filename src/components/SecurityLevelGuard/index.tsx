import { Spin } from "antd";
import { useUserStore } from "../../store/userStore"
import { NoMatch } from "../NoMatch";

type Props = {
    children:React.ReactNode,
    securityLevel:number
}

export const SecurityLevelGuard:React.FC<Props> = ({children,securityLevel}) => {
    const userSecurityLevel = useUserStore().user.security_level;
    if(userSecurityLevel === null) return <Spin/>;
    if(userSecurityLevel < securityLevel) return <NoMatch title="Не вдалося знайти сторінку" description="Спробуйте перезайти на сайт або повторіть спробу пізніше." is404/>;

    return <>{children}</>
}