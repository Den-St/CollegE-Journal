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
const {Option} = Select;

const lessonNumbers = Array(1,2,3,4,5);
const courseNumbers = [1,2,3,4];
const currYear = new Date().getFullYear();
const stepsItems = [
    {
        title:'1 Курс',
    },
    {
        title:'2 Курс',
    },
    {
        title:'3 Курс',
    },
    {
        title:'4 Курс',
    },

]
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
    const [courseNumber,setCourseNumber] = useState<number | null>(null);
    const [onCheckSettingsModal,setOnCheckSettingsModal] = useState(false);

    return <div className={`adminPanelScheduleSettings__container`}>
        <form className="scheduleSettingsForm">
            <div style={{width:'100%'}}><h1 className="header">Налаштування розкладу</h1></div>
            <div className="createUserSelect__container" style={{width:courseNumber ? '30%' : ''}}>
                <label className="select_label">Курс навчання</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть курс навчання'}
                        optionLabelProp="label"
                        onChange={setCourseNumber}
                        value={courseNumber}
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        {courseNumbers.map(course => <Option value={course} label={course}>{course}</Option>)} 
                    </Select>
                </div>
            </div>
            {!!courseNumber && <>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">Рік навчання</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть рік навчання'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={(currYear-1)+'-'+(currYear)} label={(currYear-1)+'-'+(currYear)}>{(currYear-1)+'-'+(currYear)}</Option>
                        <Option value={(currYear)+'-'+(currYear+1)} label={(currYear)+'-'+(currYear+1)}>{(currYear)+'-'+(currYear+1)}</Option>
                    </Select>
                </div>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">Семестр</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть семестр навчання'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={1} label={1}>{1}</Option>
                        <Option value={2} label={2}>{2}</Option>
                    </Select>
                </div>
            </div>
            <Steps
                current={courseNumber - 1}
                items={stepsItems}
            />
            <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>З; Кн; Кб;</span></h2>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата початку розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Оберіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Оберіть дату початку  семестру'/>
            </div>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата закінчення розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Оберіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Оберіть дату закінчення семестру'/>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">К-сть тижнів для відпрацювання</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть кількість тижнів'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={1} label={1}>{1}</Option>
                        <Option value={2} label={2}>{2}</Option>
                        <Option value={3} label={3}>{3}</Option>
                    </Select>
                </div>
            </div>
            <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>Тр; То;</span></h2>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата початку розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Оберіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Оберіть дату початку  семестру'/>
            </div>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата закінчення розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Оберіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Оберіть дату закінчення семестру'/>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">К-сть тижнів для відпрацювання</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть кількість тижнів'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={1} label={1}>{1}</Option>
                        <Option value={2} label={2}>{2}</Option>
                        <Option value={3} label={3}>{3}</Option>
                    </Select>
                </div>
            </div>
            <div style={{width:'100%'}}>
                <input type={'submit'} value={'Зберегти'} className={"primary_button"}/>
            </div>
            <div style={{'display':'flex',gap:'30px'}}>
                {/* <div className="adminPanelScheduleSettingsInput__container">
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
                </div> */}
                <button onClick={() => setOnCheckSettingsModal(true)} style={{width:'unset',padding:'0 20px'}} className={"primary_button"}>Завантажити розклад</button>
            </div>
            </>}
        </form>
        {onCheckSettingsModal && <CheckScheduleSettingsModal setCourseNumber={setCourseNumber} courseNumber={1} courseNumbers={courseNumbers}/>}
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