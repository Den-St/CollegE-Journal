import { Carousel, Select, Spin, Steps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { LinkSvg } from "../../assets/svgs/linkSvg";
import { RobotSvg } from "../../assets/svgs/robotSvg";
import { UploadSvg } from "../../assets/svgs/uploadSvg"
import { dayNamesToNumbers } from "../../consts/dayNamesToNumbers";
import { validGroupPrefixes } from "../../consts/validGroupPrefixes";
import { useGetGroup } from "../../hooks/getGroup";
import { useGetAdminGroups } from "../../hooks/getGroups";
import { DaysNumbersT } from "../../types/daysNames";
import { GroupT } from "../../types/group";
import { CheckScheduleSettingsModal } from "../CheckScheduleSettingsModal";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";
import "./scheduleSettings.scss";
import { SemesterSettings } from "./SemesterSettings";
const {Option} = Select;

const lessonNumbers = Array(1,2,3,4,5);

export const ScheduleSettings = () => {
    useEffect(() => {
        document.title = 'Налаштування розкладу';
    },[])
    const dayNumber = new Date().getDay();
    const [pickedGroupId,setPickedGroupId] = useState<string>();
    const {group,groupLoading,fetchGroup} = useGetGroup(pickedGroupId);
    const {groups,groupsLoading} = useGetAdminGroups();
    useEffect(() => {
        fetchGroup(pickedGroupId);
    },[pickedGroupId]);
  

    return <div className={`adminPanelScheduleSettings__container`}>
        <SemesterSettings/>
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
                {groups.map(group => <Option value={group.group_id} label={group.group_full_name} key={group.group_id}>{group.group_full_name}</Option>)}
            </Select>
        </div>
        {!groupLoading ? !!pickedGroupId ? Object.keys(group?.timetable || {}).length ? <><section className={`lessonsSchedule__container`}>
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
        : <NoMatch isChildren title="Нажаль, розклад ще не завантажен" description="Зазвичай розклад генерується у 10-тих числах місяця"/>
        : <NoMatch isChildren title="Розклад не обрано" description="Оберіть групу зі списку"/>
        : <Loader/>}
    </div>
}