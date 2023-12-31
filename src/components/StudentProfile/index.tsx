import { useState } from 'react';
import { DiagonalArrowSvg } from '../../assets/svgs/diagonalArrowSvg';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { useThemeStore } from '../../store/themeStore';
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
    const [tabIndex,setTabIndex] = useState<tabsNamesType>(tabsNames.lessonsSchedule);
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
 

    return <div className={`studentProfile__container ${theme}`}>
        <section className='studentProfileMain__container'>
            <div className='studentProfileLeft__container'>
                <div className='studentProfileInfo__container'>
                    <img className='studentProfile_img' src={defaultAvatar}/>
                    <div className='studentProfileTextInfo__container'>
                        <p className='studentProfile__name'>Прізвище Ім`я Побатькові</p>
                        <p className='studentProfile__email'>sdalformuli@gmail.com</p>
                        <p className='studentProfile__group'>Група-00</p>
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