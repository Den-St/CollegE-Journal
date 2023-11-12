import { Link } from "react-router-dom";
import { LinkSvg } from "../../assets/svgs/linkSvg";
import { RobotSvg } from "../../assets/svgs/robotSvg";
import { UploadSvg } from "../../assets/svgs/uploadSvg"
import "./scheduleSettings.scss";

export const ScheduleSettings = () => {
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
    const dayNumber = new Date().getDay();

    return <div className="adminPanelScheduleSettings__container">
        <NoSheduleComponent/>
        <div className="adminPanelScheduleSettingsInput__container">
            <input className="adminPanelScheduleSettingsInput" type={'file'}/>
            <div className="adminPanelScheduleSettingsInput__cover">
                <UploadSvg/>
                <div className="adminPanelScheduleSettingsInputCoverText_container">
                    <h1 className="adminPanelScheduleSettingsInputCoverTitle">
                        Імпортувати Файл
                    </h1>
                    <p className="adminPanelScheduleSettingsInputCoverText">
                        XML, XLSM, XLSX
                    </p>
                </div>
            </div>
        </div>
        <section className={`lessonsSchedule__container`}>
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
        </section>
    </div>
}

const NoSheduleComponent = () => {
    return <div className="noSchedule_container">
        <RobotSvg/>
        <h1 className="noSchedule_title">Нажаль, розклад ще не завантажен.</h1>
        <p className="noSchedule_text">Зазвичай розклад генерується у 10-тих числах місяця.</p>
    </div>
}
