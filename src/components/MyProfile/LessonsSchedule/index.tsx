import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { LinkSvg } from '../../../assets/svgs/linkSvg';
import { dayNamesToNumbers } from '../../../consts/dayNamesToNumbers';
import { lessonNumbers } from '../../../consts/lessonNumbers';
import { useThemeStore } from '../../../store/themeStore';
import { useUserStore } from '../../../store/userStore';
import { DaysNumbersT } from '../../../types/daysNames';
import { SplitedLessonT } from '../../../types/user';
import { NoMatch } from '../../NoMatch';
import './lessonsSchedule.scss';

export const TeacherSchedule = () => {
    const theme = useThemeStore().theme;
    const now = new Date();
    const dayNumber = now.getDay();
    const {user} = useUserStore();
    if(Object.keys(user.timetable || {}).length && !user.timetable?.[5] && !!user.timetable){
        user.timetable[5] = [
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false
                // subject_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false
                // subject_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false
                // subject_id:''
            },
            {
                audience:"0",
                link:'',
                subject_name:'',
                split:false
                // subject_id:''
            },
        ];
    }
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

    return <section className={`lessonsSchedule__container ${theme}`}>
        <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}><h1 className='studentProfileTab__title'>Розклад заняття</h1><button className='teacherShedule_addLink_button'>Посилання</button></div>
        {Object.keys(user?.timetable || {}).length ? 
        <>
        <section className={`lessonsSchedule__container`}>
            {Object.keys(user?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.split ? 
                            <>
                            <div key={dayKey + (user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">*{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["*"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as SplitedLessonT)["*"] || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                            <div key={dayKey + (user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber"></p>
                                <p className="lessonsScheduleLessonName">**{(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as SplitedLessonT)["**"] || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={(user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as SplitedLessonT)["**"] || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                            </>
                            : <div key={dayKey + user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber + 1}</p>
                                <p className="lessonsScheduleLessonName">{user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name as string || '-'}</p>
                                <div className="lessonsScheduleLessonGroup">
                                    {user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as string ? <Link to={user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link as string || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                )}
        </section>
        <Carousel className='lessonsScheduleDayCarousel' dots slidesToShow={1} initialSlide={Object.keys(user?.timetable || {}).findIndex((day,i) => i + 1 === dayNumber)}>
            {Object.keys(user?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            <div key={dayKey + user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name + lessonNumber} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber}</p>
                                {/* <p className="lessonsScheduleLessonName">{user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.subject_name || '-'}</p> */}
                                <div className="lessonsScheduleLessonGroup">
                                    {/* {user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link ? <Link to={user?.timetable?.[dayKey as DaysNumbersT][lessonNumber]?.link || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<div>
                                        <LinkSvg/>
                                    </div>} */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}
        </Carousel>
        </>
        : <NoMatch isChildren title="Нажаль, розклад ще не завантажен" description="Зазвичай розклад генерується у 10-тих числах місяця"/>}
    </section>
}