import { Link, useNavigate } from "react-router-dom";
import { EditProfileSvg } from "../../assets/svgs/editProfileSvg";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { StarSvg } from "../../assets/svgs/starSvg";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import '../MyProfile/studentProfile.scss';

export const UserProfile = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const navigate = useNavigate();

    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        <section className='studentProfileMain__container'>
            <div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
                <h2 className="subjectsMainTitle"><button onClick={() => navigate(-1)} className={'leftArrowButton'}><LeftArrowSvg/></button>Профіль студента</h2>
                <div className='studentProfileLeft__container'>
                    <div className='studentProfileInfo__container'>
                        <img className='studentProfile_img' src={
                            // user.avatar || 
                            defaultAvatar
                        }/>
                        <div className='studentProfileTextInfo__container'>
                            <p className='studentProfile__name'>
                                {/* {user.full_name} */}
                                Призвіще Ім'я По батькові
                                {/* {user.security_level !== securityLevels.admin &&  */}
                                <StarSvg/>
                                {mySecurityLevel === securityLevels.admin && 
                                <Link to={routes.editUser.replace(':id','1')} className='editUserProfile_button'><EditProfileSvg/></Link>}
                            </p>
                            <p className='studentProfile__email'>{
                            // user.mailbox_address || 
                            `mail@gmail.com`}</p>
                            <p className='studentProfile__bio'>Інтереси можуть бути розписані у декілька строк. Нехай займаються чим хотять</p>
                            {
                            // !!user?.user_group?.group_full_name && 
                            mySecurityLevel !== securityLevels.admin 
                            ? <Link to={routes.pickJournalSubject} className='studentProfile__group'>
                                {/* {user?.user_group?.group_full_name} */}
                                Група-00
                                </Link> 
                            : <Link to={routes.pickJournalSubject 
                                // + 
                                // `?group_id=${user?.user_group?.group_id}
                                } className='studentProfile__group'>
                                {/* {user?.user_group?.group_full_name} */}
                                Група-00
                            </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {mySecurityLevel === securityLevels.admin && 
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
                <h1 className='profile_detailedInfo_dir_header'>Інформація про студента</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Пошта студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата народження</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Місце знаходження</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Отримання стипендії</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Форма навчання</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Бюджет/Контракт</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата вступу</h2>
                    <h2 className='profile_detailedInfo_item_text'>email@gmail.com</h2>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>
        }
    </div>
}