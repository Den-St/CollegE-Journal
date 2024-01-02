import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { LinkSvg } from "../../assets/svgs/linkSvg";
import { RobotSvg } from "../../assets/svgs/robotSvg";
import { UploadSvg } from "../../assets/svgs/uploadSvg"
import { dayNamesToNumbers } from "../../consts/dayNamesToNumbers";
import { useGetGroup } from "../../hooks/getGroup";
import { useGetGroups } from "../../hooks/getGroups";
import { DaysNumbersT } from "../../types/daysNames";
import { GroupT } from "../../types/group";
import "./scheduleSettings.scss";
const {Option} = Select;



export const ScheduleSettings = () => {
    const dayNumber = new Date().getDay();
    const [pickedGroupId,setPickedGroupId] = useState<string>();
    const {group,groupLoading,fetchGroup} = useGetGroup(pickedGroupId);
    const {groups,groupsLoading} = useGetGroups();
    useEffect(() => {
        fetchGroup(pickedGroupId);
    },[pickedGroupId]);

    return <div className="adminPanelScheduleSettings__container">
        <div className="fillter_container" style={{width:'100%',marginLeft:'12%'}}>
            <Select 
                placeholder={<div className="fillterPlaceholder_container">
                    <p className="fillter_placeholder">Група</p> <FilterIconSvg/>
                </div>}
                onChange={setPickedGroupId}
                value={pickedGroupId}
                className="fillter_select"
                allowClear
            >
                {groups.map(group => <Option value={group.group_id} label={group.group_full_name}>{group.group_full_name}</Option>)}
            </Select>
        </div>
        <div className="adminPanelScheduleSettingsInput__container">
            <input autoComplete="off"  className="adminPanelScheduleSettingsInput" type={'file'}/>
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
        {!groupLoading ? group?.timetable ? <section className={`lessonsSchedule__container`}>
            {Object.keys(group?.timetable).map((dayKey,i) => 
                <div key={dayKey} className="lessonsScheduleDay__container">
                    <h2 className={`lessonsScheduleDay__header ${i + 1 === dayNumber && 'currentDay'}`}>{dayNamesToNumbers[dayKey as DaysNumbersT]}</h2>    
                    <div className='lessonsScheduleDayLessons__container'>
                        {group?.timetable?.[dayKey as DaysNumbersT].map((lesson,i) =>
                            <div key={dayKey + lesson.subject_name + i} className="lessonsScheduleDayLessonItem__container">
                                <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                                <p className="lessonsScheduleLessonName">{lesson.subject_name || '-'}</p>
                                <p className="lessonsScheduleLessonGroup">
                                    <Link to={lesson.link} target={"_blank"} className='lessonsScheduleLink__button'>
                                        <LinkSvg/>
                                    </Link>
                                </p>
                            </div>
                        )}
                    </div>
                </div>)}
        </section>
        : <NoSheduleComponent/>
        : <Spin/>}
    </div>
}

const NoSheduleComponent = () => {
    return <div className="noSchedule_container">
        <RobotSvg/>
        <h1 className="noSchedule_title">Нажаль, розклад ще не завантажен.</h1>
        <p className="noSchedule_text">Зазвичай розклад генерується у 10-тих числах місяця.</p>
    </div>
}
