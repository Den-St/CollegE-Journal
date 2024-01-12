import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { routes } from '../../consts/routes';
import { securityLevelsToNames } from '../../consts/securityLevels';
import { deleteTokenCookie } from '../../helpers/auth';
import { useThemeController } from '../../hooks/themeController';
import { useUserStore } from '../../store/userStore';
import './userPopupStyles.scss';

export const UserPopup = () => {
    const theme = useThemeController().theme;
    const user = useUserStore().user;
    const signOut = useUserStore().signOut;
    const navigate = useNavigate();
    
    const onSignOut = () => {
        signOut();
        deleteTokenCookie();
        navigate(routes.signIn);
    }

    return <div className={`userPopup_container ${theme}`}>
        <div className='userInfoPopup_container'>
            <img className='header_avatar' src={user.avatar || defaultAvatar} style={{marginBottom:'10px'}}/>
            <p className='userFullName'>{user.full_name}</p>
            <p className='userEmail'>{user.full_name}</p>
            <p className='userEmail'>{user.mailbox_adress}</p>
            <p className='userRole'>{securityLevelsToNames[user.security_level || 0]}</p>
        </div>
        <div className='userInfoPopupLinks_container'>
            <h6 className='userInfoPopupLinks_header'>кабінет</h6>
            <Link to={routes.myProfile} className='userPopupSignOut_button'>Особистий кабінет</Link>
            <button className='userPopupSignOut_button' onClick={onSignOut}>Вийти з акаунту</button>
        </div>
    </div>
}