import { Carousel } from 'antd';
import { securityLevels } from '../../../consts/securityLevels';
import { useThemeStore } from '../../../store/themeStore';
import { useUserStore } from '../../../store/userStore';
import './lessonsSchedule.scss';

export const TeacherSchedule = () => {
    const theme = useThemeStore().theme;
    const now = new Date();
    const dayNumber = now.getDay();
    const days = [
        {
            name:'Понеділок',
            lessons:[
                {
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },]
        },{
            name:'Вівторок',
            lessons:[
                {
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },]
        },{
            name:'Середа',
            lessons:[
                {
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },]
        },{
            name:'Четвер',
            lessons:[
                {
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },]
        },{
            name:'П\`ятниця',
            lessons:[
                {
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },]
        },{
            name:'Суббота',
            lessons:[
                {
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },{
                    name:'Математика',group:'3-41'
                },]
        }];
    const scheduleTimings = [
        {
            id:1,
            start:'8:00',
            end:'9:20'
        },
        {
            id:2,
            start:'8:00',
            end:'9:20'
        },
        {
            id:3,
            start:'8:00',
            end:'9:20'
        },
        {
            id:4,
            start:'8:00',
            end:'9:20'
        },
        {
            id:5,
            start:'8:00',
            end:'9:20'
        },
        {
            id:6,
            start:'8:00',
            end:'9:20'
        },
    ]

    return <section className={`lessonsSchedule__container ${theme}`}>
        <h1 className='studentProfileTab__title'>Розклад вчитель</h1>
            {days.map((day,i) => 
            <div key={day.name} className="lessonsScheduleDay__container">
                <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{day.name}</h2>    
                <div className='lessonsScheduleDayLessons__container'>
                    {day.lessons.map((lesson,i) => 
                        <div key={day.name + lesson.name + i} className="lessonsScheduleDayLessonItem__container">
                            <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                            <p className="lessonsScheduleLessonName">{lesson.name}</p>
                            <p className="lessonsScheduleLessonGroup">{lesson.group}</p>
                        </div>
                    )}
                </div>
            </div>)}
            <Carousel className='lessonsScheduleDayCarousel' dots slidesToShow={1} initialSlide={days.findIndex((day,i) => i + 1 === dayNumber)}>
                {days.map((day,i) => 
                <div key={day.name} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{day.name}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {day.lessons.map((lesson,i) => 
                            <div key={day.name + lesson.name + i} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                                <p className="lessonsScheduleLessonName">{lesson.name}</p>
                                <p className="lessonsScheduleLessonGroup">{lesson.group}</p>
                            </div>
                        )}
                    </div>
                </div>)}
            </Carousel>
    </section>
}