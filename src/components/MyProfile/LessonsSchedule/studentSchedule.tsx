import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { FileSvg } from '../../../assets/svgs/fileSvg';
import { LinkSvg } from '../../../assets/svgs/linkSvg';
import { MagnifierSvg } from '../../../assets/svgs/MagnifierSvg';
import { dayNamesToNumbers } from '../../../consts/dayNamesToNumbers';
import { routes } from '../../../consts/routes';
import { scheduleTimings } from '../../../consts/scheduleTimings';
import { useGetGroup } from '../../../hooks/getGroup';
import { useThemeStore } from '../../../store/themeStore';
import { useUserStore } from '../../../store/userStore';
import { DaysNumbersT } from '../../../types/daysNames';
import { NoSheduleComponent } from '../../AdminPanel/ScheduleSettings';
import { Loader } from '../../Loader/Loader';
import './lessonsSchedule.scss';

export const LessonsScheduleStudents = () => {
    const theme = useThemeStore().theme;
    const now = new Date();
    const dayNumber = now.getDay();
    const groupId = useUserStore().user.user_group?.group_id;
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
    const lessonNumbers = Array(1,2,3,4,5);
    // const {groupLoading,group} = useGetGroup(groupId);

    return <section className={`lessonsSchedule__container ${theme}`}>
        <h1 className='studentProfileTab__title'>Розклад</h1>
        {/* {!groupLoading ? Object.keys(group?.timetable || {}).length ? <><section className={`lessonsSchedule__container`}>
            {Object.keys(group?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            <div key={dayKey + group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_id + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber}</p>
                                <p className="lessonsScheduleLessonName">{group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_name || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link ? <Link to={group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}
        </section>
        <Carousel className='lessonsScheduleDayCarousel' dots slidesToShow={1} initialSlide={Object.keys(group?.timetable || {}).findIndex((day,i) => i + 1 === dayNumber)}>
            {Object.keys(group?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            <div key={dayKey + group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_id + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber}</p>
                                <p className="lessonsScheduleLessonName">{group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_name || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link ? <Link to={group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}
        </Carousel>
        </>
        : <NoSheduleComponent/>
        : <Loader/>} */}
        <NoSheduleComponent/>
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
        <Link  to={'#'} className='studentProfielScheduleGoToTasks_container'>
            <MagnifierSvg/>
            <h1 className='studentProfielScheduleGoToTasks_title'>Перейти до Завдань</h1>
            <p className='studentProfielScheduleGoToTasks_text'>Посилання до сторінки ваших завдань</p>
        </Link>
        <Link  to={'#'} className='studentProfielScheduleGoToTasks_container'>
            <FileSvg/>
            <h1 className='studentProfielScheduleGoToTasks_title'>Перейти до Матеріалів</h1>
            <p className='studentProfielScheduleGoToTasks_text'>Посилання до сторінки освітніх матеріалів</p>
        </Link>
    </section>
}