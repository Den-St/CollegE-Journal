import { useThemeStore } from '../../../store/themeStore';
import './lessonsSchedule.scss';

export const LessonsSchedule = () => {
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

    console.log(dayNumber)
    return <section className={`lessonsSchedule__container ${theme}`}>
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
    </section>
}