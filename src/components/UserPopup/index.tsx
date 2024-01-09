import { useNavigate } from 'react-router-dom';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { routes } from '../../consts/routes';
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
        {/* <div className='userInfoPopup_container'>
            <img className='header_avatar' src={user.avatar || defaultAvatar}/>
            <p className='userFullName'>{user.full_name}</p>
            <p className='userEmail'>{user.full_name}</p>
        </div>
        <div className='userInfoPopupLinks_container'>
            <h6 className='userInfoPopupLinks_header'>посилання</h6>
            <p className='userInfoPopupLinks_item'>Оцінки</p>
            <p className='userInfoPopupLinks_item'>Завдання</p>
            <p className='userInfoPopupLinks_item'>Розклад</p>
            <p className='userInfoPopupLinks_item'>Новини</p>
        </div> */}
        <button className='userPopupSignOut_button' onClick={onSignOut}>Вийти з акаунту</button>
    </div>
}