import { Select } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { JournalPortraitModeWarning } from '../../assets/svgs/journalPortraitModeWarningSvg';
import { LeftArrowSvg } from '../../assets/svgs/leftArrowSvg';
import axiosConfig from '../../axiosConfig';
import { endpoints } from '../../consts/endpoints';
import { routes } from '../../consts/routes';
import { studyMonths } from '../../consts/studyMonths';
import { setFromSubjects } from '../../helpers/setFromObjects';
import { useGetTeacherJournal } from '../../hooks/getJournal';
import { useGroupsByTeacher } from '../../hooks/groupsByTeacher';
import { useThemeStore } from '../../store/themeStore';
import { Loader } from '../Loader/Loader';
import { NoMatch } from '../NoMatch';
import { CellInput, getColorByValue } from './CellInput';
import _debounce from 'lodash/debounce';
import './journalStyles.scss';
const {Option} = Select;

export const TeacherJournal = () => {
    const {fillters,loading,journal,onChangeFillters,token,setJournal} = useGetTeacherJournal();
    const {groups} = useGroupsByTeacher();
    const groupJournal = groups.find(group => group.journal_group === fillters.group_id);
    const theme = useThemeStore().theme;
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();
    // const columnsDivRef = useRef<HTMLDivElement>(null);

    const isDisabledByDate = (dateString:string) => {
        if(+dateString.split('\n')[0].split('.')[1] > currentMonth) {
            return true;
        }
        if(+dateString.split('\n')[0].split('.')[1] === currentMonth && +dateString.split('\n')[0].split('.')[0] > currentDate){
            return true;
        }
        return false;
    }
    const onChangeLessonType = async (column_id:string,lesson_type:string) => {
        try{
            // setJournal(prev => ({...prev,columns:[...prev?.columns,prev?.columns.find(column => column.column_id === column_id)]}))
            await axiosConfig.post(endpoints.journalEditCellType,{column_id,lesson_type,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
            const lessonTypeP = document.getElementById(column_id);
            if(lessonTypeP?.innerText){
                lessonTypeP.innerText = lesson_type;
            }
        }catch(err){    
            console.error(err);
        }
    }
    const onBlurChangeLessonTopic = async (column_id:string,lesson_topic:string) => {
        try{
            await axiosConfig.post(endpoints.journalEditCellTopic,{column_id,lesson_topic,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        const subjectName = groupJournal?.can_edit.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name || groupJournal?.can_view.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
        if(!groupJournal?.journal_group_full_name || !subjectName){
            document.title = `Журнал`;
            return;
        }
        document.title = `${groupJournal?.journal_group_full_name} - ${subjectName} - ${studyMonths.find(month => month.number === fillters.month)?.name}`;
    },[fillters.subject_id,fillters.month,groupJournal]);

    // useEffect(() => {
    //     const distanceFromTop = window.scrollY;
    //     console.log(columnsDivRef.current?.getBoundingClientRect().top);  
    // },[columnsDivRef.current]); 

    // const [columnsDivPosition,setColumsDivPosition] = useState<'static' | 'fixed'>('static');
    // const handleScroll = () => {
    //     const distanceFromTop = window.scrollY;
    //     const distanceToElement = columnsDivRef.current?.getBoundingClientRect().top || 0;
    //     setColumsDivPosition(distanceFromTop > distanceToElement ? 'fixed' : 'static');
    // }
    // const debounceHandleScroll = useCallback(_debounce(handleScroll, 100),[]);

    // useEffect(() => {
    //     window.addEventListener('scroll',debounceHandleScroll);
    // },[]);
    // console.log(columnsDivPosition);

    if(loading) return <Loader/>
    if(!journal) return <NoMatch title={`Журналу не знайдено`}/>
    if(!journal.students.length || !journal.columns.length) return <NoMatch title="Журнал ще не створено"/>

    return <div className={`journalMain__container ${theme}`}>
        <section className='journalTop__container'>
            <h1 className='journal__title'><Link to={routes.pickJournalSubject + `?group_id=${groupJournal?.journal_group}`} className="editProfile_leaveButton"><LeftArrowSvg/></Link>Журнал</h1>
            <div className='journalFillters__container'>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Місяць</p>
                    </div>}
                    className="fillter_select"
                    defaultValue={fillters.month}
                    allowClear
                    value={fillters.month}
                    onChange={(value) => onChangeFillters('month',value)}
                    >
                        {studyMonths.map((month,i) => {
                            if(i > studyMonths.findIndex(_month => _month.number === currentMonth + 1)) return null;
                            return <Option key={month.number} value={month.number} label={month.name}>{month.name}</Option>
                        })}
                    </Select>
                </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                        placeholder={
                            <div className="fillterPlaceholder_container">
                                <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                            </div>
                        } 
                        className="fillter_select"
                        // allowClear
                        loading={loading}
                        value={fillters.subject_id}
                        onChange={(value) => onChangeFillters('subject_id',value)}
                    >
                        {!!groupJournal && 
                        setFromSubjects([...groupJournal?.can_edit,...groupJournal.can_view])
                        .map(subject => 
                            <Option key={subject.journal_id} value={subject.journal_id} label={subject.subject_full_name}>{subject.subject_full_name}</Option>
                        )}
                    </Select>
                </div>
            </div>
        </section>
        <section className='journal_portraitModeWarning'>
                <JournalPortraitModeWarning/>
                <p className='journal_portraitModeWarning_header'>Халепа, треба перевернути телефон</p>
                <p className='journal_portraitModeWarning_description'>Переверніть телефон у альбомний режим, тільки так можливо передивитися журнал</p>
        </section>
        <section className='journal__container'>
            <div className='journalLeft__container'>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>У жовтні кожного року проходить акція «відрахуй випускника»</p>
                </div>
                {journal?.students.map(student => 
                    <div key={student.student_id} className={`journalRowItemLeft__container ${student.index%2 === 0 ? 'even' : ''}`}>
                        <p className='journalRowItemLeft__number'>{student.index}.</p>
                        <p className='journalRowItemLeft__name'>{student.full_name}</p>
                    </div>
                )}
            </div>
            <div className='journalRight__container'>
                <div className={`journalRightColumns__container`}>
                    <div className='journalColumnsCenter__container'>
                    {journal?.columns.map(column => 
                        <div key={column.column_id} className='journalColumnsCenterItem__container'>
                                {
                                    (journal.can_edit === 1 &&
                                    !isDisabledByDate(column.date)) ?
                                    <Select 
                                        disabled={
                                            !journal.can_edit || 
                                            isDisabledByDate(column.date)
                                        }
                                        defaultValue={column.lesson_type || null} 
                                        className='journal_lessonTypeSelect' 
                                        rootClassName='journal_lessonTypeSelect'
                                        placeholder={'Тип'}
                                        // showArrow={!column.lesson_type}
                                        onChange={(value) => onChangeLessonType(column.column_id,value)}>
                                            <Option label={"Лекція"} value={"Лекція"}>Лекція</Option>
                                            <Option label={"Практика"} value={"Практика"}>Практика</Option>
                                            <Option label={"Залік"} value={"Залік"}>Залік</Option>
                                            <Option label={"Лаб"} value={"Лаб"}>Лаб</Option>
                                            <Option label={"Консульт"} value={"Консульт"}>Консульт</Option>
                                    </Select>
                                    : <div className='journalColumnsCenterItemType'>{column.lesson_type || ''}</div>
                                }
                            <div className='journalColumnsCenterItemDate__container'>
                                <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')[1]}</p>
                                <p className='journalColumnsCenterItemDate'>{column.date.split('\n')[0]}</p>
                            </div>
                        </div>
                    )}
                </div>
                {/* <div className='journalColumnsRight__container'>
                    <div className='journalColumnsRightItem__container'>
                        <div className='journalColumnsRightItemType'>Аттестація</div>
                        <div className='journalColumnsRightItemMonth'>
                            Травень
                        </div>
                    </div>
                    <div className='journalColumnsRightItem__container'>
                        <div className='journalColumnsRightItemType'>Коригуюча</div>
                        <div className='journalColumnsRightItemMonth'>
                            Травень
                        </div>
                    </div>
                </div> */}
                </div>
                {journal?.students.map((student,i) => 
                    <div key={student.student_id} className={`journalRowItem__container ${student.index%2 === 0 ? 'even' : ''}`}>
                        <div className='journalRowItemCenter__container'>
                            {journal.columns.map((column,j) => 
                                (journal.can_edit === 1 &&
                                !isDisabledByDate(column.date))
                                ? <CellInput rowIndex={i} columnIndex={j} key={column.column_id} token={token} onBlurData={{'column_id':column.column_id,'journal_id':journal.journal_id,subject_id:fillters.subject_id,'student_id':student.student_id}} defaultValue={column.cells.find(cell => cell.index === student.index)?.value}/>
                                : <p key={column.column_id} className='journalRowItemCenterValue__text' style={{cursor:'not-allowed',color:getColorByValue(column.cells.find(cell => cell.index === student.index)?.value || "",),caretColor:'white !important',}}>{column.cells.find(cell => cell.index === student.index)?.value}</p>
                            )}
                        </div>
                        {/* <div className='journalRowItemRight__container'>
                            <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                            <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        </div> */}
                    </div>
                )}
            </div>
        </section>
        <section className='journalLessonsThemes__section'>
            <h1 className='journalLessonsThemes__title'>Теми занять</h1>
            <div className='journalLessonsThemes__container'>
                {journal?.columns.map(column => 
                    <div className='journalLessonThemeItem__container' key={column.column_id}>
                        <div className='journalLessonThemeItemDate__container'>
                            <p className='journalLessonThemeItemDate__day'>{column.date.split('\n')[1]}</p>
                            <p className='journalLessonThemeItemDate__date'>{column.date.split('\n')[0]}</p>
                            <p id={column.column_id} className='journalLessonThemeItemType'>{column.lesson_type}</p>
                        </div>
                        <input
                        disabled={
                            !journal.can_edit ||
                            isDisabledByDate(column.date)
                        }
                        onBlur={(e) => onBlurChangeLessonTopic(column.column_id,e.target.value)} placeholder='Заповніть тему заняття' defaultValue={column.lesson_topic} className='journalLessonThemeItem__input__text'/>
                    </div>
                )}
            </div>
        </section>
    </div>
}