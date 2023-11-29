import { Link } from 'react-router-dom';
import { FileSvg } from '../../../assets/svgs/fileSvg';
import { LinkSvg } from '../../../assets/svgs/linkSvg';
import { MagnifierSvg } from '../../../assets/svgs/MagnifierSvg';
import { routes } from '../../../consts/routes';
import { useThemeStore } from '../../../store/themeStore';
import './lessonsSchedule.scss';

export const LessonsScheduleStudents = () => {
    const theme = useThemeStore().theme;
    const now = new Date();
    const dayNumber = now.getDay();
    const days = [
        {
            name:'Понеділок',
            lessons:[
                {
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },]
        },{
            name:'Вівторок',
            lessons:[
                {
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },]
        },{
            name:'Середа',
            lessons:[
                {
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },]
        },{
            name:'Четвер',
            lessons:[
                {
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },]
        },{
            name:'П\`ятниця',
            lessons:[
                {
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },]
        },{
            name:'Суббота',
            lessons:[
                {
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
                },{
                    name:'Математика',link:'#'
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
        <h1 className='studentProfileTab__title'>Розклад студент</h1>
        {days.map((day,i) => 
            <div key={day.name} className="lessonsScheduleDay__container">
                <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{day.name}</h2>    
                <div className='lessonsScheduleDayLessons__container'>
                    {day.lessons.map((lesson,i) => 
                        <div key={day.name + lesson.name + i} className="lessonsScheduleDayLessonItem__container">
                            <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                            <p className="lessonsScheduleLessonName">{lesson.name}</p>
                            <p className="lessonsScheduleLessonGroup">
                                <Link to={lesson.link} className='lessonsScheduleLink__button'>
                                    <LinkSvg/>
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>)}
            <div className="lessonsScheduleDay__container" style={{width:'unset'}}>
                <h2 className={`lessonsScheduleDay__header`}>Додатково</h2>   
                <h3 className='scheduleTimingsTitle'>Час проведення пар</h3>
                <div className='lessonsScheduleDayLessons__container'>
                    {scheduleTimings.map((timing,i) => 
                        <div key={timing.id} className="lessonsScheduleDayLessonItem__container">
                            <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                            <p className="lessonsScheduleLessonName" style={{width:'100px'}}>{timing.start}</p>
                            <p className="lessonsScheduleLessonGroup">{timing.end}</p>
                        </div>
                    )}
                </div>
            </div>
            <Link to={routes.homeTasks} className='studentProfielScheduleGoToTasks_container'>
                <MagnifierSvg/>
                <h1 className='studentProfielScheduleGoToTasks_title'>Перейти до Завдань</h1>
                <p className='studentProfielScheduleGoToTasks_text'>Посилання до сторінки ваших завдань</p>
            </Link>
            <Link to={routes.studyMaterials} className='studentProfielScheduleGoToTasks_container'>
                <FileSvg/>
                <h1 className='studentProfielScheduleGoToTasks_title'>Перейти до Матеріалів</h1>
                <p className='studentProfielScheduleGoToTasks_text'>Посилання до сторінки освітніх матеріалів</p>
            </Link>
    </section>
}