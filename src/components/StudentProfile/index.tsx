import { useState } from 'react';
import { diagonalArrowSvg } from '../../assets/svgs/diagonalArrowSvg';
import { useThemeStore } from '../../store/themeStore';
import { LessonsSchedule } from './LessonsSchedule';
import './studentProfile.scss';

export const StudentProfile = () => {
    const theme = useThemeStore().theme;
    const [tabIndex,setTabIndex] = useState(0);
    const tabs = [
        {
            component:<LessonsSchedule/>,
            title:'Розклад пар'
        },
        {
            component:<LessonsSchedule/>,
            title:'Розклад пар'
        },
        {
            component:<LessonsSchedule/>,
            title:'Розклад пар'
        }
    ];

    return <div className={`studentProfile__container ${theme}`}>
        <section className='studentProfileMain__container'>
            <div className='studentProfileLeft__container'>
                <div className='studentProfileInfo__container'>
                    <img className='studentProfile_img'/>
                    <div className='studentProfileTextInfo__container'>
                        <p className='studentProfile__name'>Прізвище Ім`я Побатькові</p>
                        <p className='studentProfile__email'>sdalformuli@gmail.com</p>
                        <p className='studentProfile__group'>Група-00</p>
                    </div>
                </div>
                <div className='studentProfileTabs__container'>
                    <button className={`studentProfileTab__button ${tabIndex === 0 ? 'picked' : ''}`} onClick={() => setTabIndex(0)}>Розклад пар {diagonalArrowSvg()}</button>
                    <button className={`studentProfileTab__button ${tabIndex === 1 ? 'picked' : ''}`} onClick={() => setTabIndex(1)}>Перегляд оцінок {diagonalArrowSvg()}</button>
                    <button className={`studentProfileTab__button ${tabIndex === 2 ? 'picked' : ''}`} onClick={() => setTabIndex(2)}>Домашнє завдання {diagonalArrowSvg()}</button>
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
        <h1 className='studentProfileTab__title'>{tabs[tabIndex].title}</h1>
        {tabs[tabIndex].component}
    </div>
}