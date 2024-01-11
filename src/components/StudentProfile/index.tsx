import { useState } from 'react';
import { DiagonalArrowSvg } from '../../assets/svgs/diagonalArrowSvg';
import { EditProfileSvg } from '../../assets/svgs/editProfileSvg';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { useThemeStore } from '../../store/themeStore';
import { useUserStore } from '../../store/userStore';
import { EditProfile } from '../EditProfile';
import { TeacherSchedule } from './LessonsSchedule';
import { LessonsScheduleStudents } from './LessonsSchedule/studentSchedule';
import './studentProfile.scss';

enum tabsNames  {
    lessonsSchedule = 'lessonsSchedule',
    lessonsSchedule2 = 'lessonsSchedule2',
    lessonsSchedule3 = 'lessonsSchedule3',
};
type tabsNamesType = keyof typeof tabsNames;

export const StudentProfile = () => {
    const theme = useThemeStore().theme;
    const user = useUserStore().user;
    const [tabIndex,setTabIndex] = useState<tabsNamesType>(tabsNames.lessonsSchedule);
    const [onEditing,setOnEditing] = useState(true);
    const onEdit = () => {
        setOnEditing(true);
    }
    const onEditClose = () => {
        setOnEditing(false);
    }
    const tabs:Record<tabsNamesType,{component:React.ReactNode,title:string} > = {
        lessonsSchedule:{
            component:<TeacherSchedule/>,
            title:'Розклад вчитель'
        },
        lessonsSchedule2:{
            component:<LessonsScheduleStudents/>,
            title:'Розклад студент'
        },
        lessonsSchedule3:{
            component:<TeacherSchedule/>,
            title:'Розклад пар3'
        }
    };
 
    if(onEditing) return <EditProfile onEditClose={onEditClose}/>

    return <div className={`studentProfile__container ${theme}`}>
        <section className='studentProfileMain__container'>
            <div className='studentProfileLeft__container'>
                <div className='studentProfileInfo__container'>
                    <img className='studentProfile_img' src={user.avatar || defaultAvatar}/>
                    <div className='studentProfileTextInfo__container'>
                        <p className='studentProfile__name'>{user.full_name}<button className='editUserProfile_button' onClick={onEdit}><EditProfileSvg/></button></p>
                        <p className='studentProfile__email'>{user.mailbox_adress || `mail@gmail.com`}</p>
                        <p className='studentProfile__group'>{user.group_fullname || `Група-00`}</p>
                    </div>
                </div>
                <div className='studentProfileTabs__container'>
                    {Object.keys(tabs).map((key) =>
                     <button key={key} className={`studentProfileTab__button ${tabIndex === key ? 'picked' : ''}`}
                             onClick={() => setTabIndex(key as tabsNamesType)}>
                            {tabs[key as tabsNamesType].title} {DiagonalArrowSvg()}
                    </button>)}
                </div>
            </div>
            <div className='studentProfileStatistic__container'>
                    <h3 className='studentProfileStatistic__header'>
                        Середня Оцінка
                    </h3>
                    <p className='studentProfileStatistic__value na'>45 н/а</p>
                    <h3 className='studentProfileStatistic__header'>
                        Пропущено годин
                    </h3>
                    <p className='studentProfileStatistic__value good'>6</p>
                    <h3 className='studentProfileStatistic__header'>
                        Рейтинг
                    </h3>
                    <p className='studentProfileStatistic__value medium'>143/316</p>
                </div>
        </section>
        {tabs[tabIndex].component}
    </div>
}