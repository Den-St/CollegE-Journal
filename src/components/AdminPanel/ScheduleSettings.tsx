import { Carousel, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { LinkSvg } from "../../assets/svgs/linkSvg";
import { RobotSvg } from "../../assets/svgs/robotSvg";
import { UploadSvg } from "../../assets/svgs/uploadSvg"
import { dayNamesToNumbers } from "../../consts/dayNamesToNumbers";
import { useGetGroup } from "../../hooks/getGroup";
import { useGetAdminGroups } from "../../hooks/getGroups";
import { DaysNumbersT } from "../../types/daysNames";
import { GroupT } from "../../types/group";
import { Loader } from "../Loader/Loader";
import "./scheduleSettings.scss";
const {Option} = Select;


export const ScheduleSettings = () => {
    useEffect(() => {
        document.title = 'Налаштування розкладу';
    },[])
    const dayNumber = new Date().getDay();
    const [pickedGroupId,setPickedGroupId] = useState<string>();
    const {group,groupLoading,fetchGroup} = useGetGroup(pickedGroupId);
    const {groups,groupsLoading} = useGetAdminGroups();
    const lessonNumbers = Array(1,2,3,4,5);
    useEffect(() => {
        fetchGroup(pickedGroupId);
    },[pickedGroupId]);

    return <div className="adminPanelScheduleSettings__container">
        <div className="fillter_container">
            <Select 
                placeholder={<div className="fillterPlaceholder_container">
                    <p className="fillter_placeholder">Група</p> <FilterIconSvg/>
                </div>}
                onChange={setPickedGroupId}
                value={pickedGroupId}
                className="fillter_select"
                allowClear
                onClear={() => setPickedGroupId(undefined)}
            >
                {groups.map(group => <Option value={group.group_id} label={group.group_full_name}>{group.group_full_name}</Option>)}
            </Select>
        </div>
        <div className="adminPanelScheduleSettingsInput__container">
            <input  autoComplete="off" accept=".xml,.xlsm,.xlsx" className="adminPanelScheduleSettingsInput" type={'file'}/>
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
        {!groupLoading ? Object.keys(group?.timetable || {}).length ? <><section className={`lessonsSchedule__container`}>
            {Object.keys(group?.timetable || {}).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {lessonNumbers.map(lessonNumber =>
                            <div key={dayKey + group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_name + i} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber}</p>
                                <p className="lessonsScheduleLessonName">{group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_name || '-'}</p>
                                <p className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link ? <Link to={group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<p>
                                        <LinkSvg/>
                                    </p>}
                                </p>
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
                            <div key={dayKey + group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_name + i} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{lessonNumber}</p>
                                <p className="lessonsScheduleLessonName">{group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.subject_name || '-'}</p>
                                <p className="lessonsScheduleLessonGroup">
                                    {group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link ? <Link to={group?.timetable?.[dayKey as DaysNumbersT]?.find(lesson => lesson.lesson_number === lessonNumber)?.link || '#'} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                    :<p>
                                        <LinkSvg/>
                                    </p>}
                                </p>
                            </div>
                        )}
                    </div>
                </div>)}
        </Carousel>
        </>
        : <NoSheduleComponent/>
        : <Loader/>}
    </div>
}

const NoSheduleComponent = () => {
    return <div className="noSchedule_container">
        <RobotSvg/>
        <h1 className="noSchedule_title">Нажаль, розклад ще не завантажен.</h1>
        <p className="noSchedule_text">Зазвичай розклад генерується у 10-тих числах місяця.</p>
    </div>
}
