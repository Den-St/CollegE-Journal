import { Select, Slider, Tooltip } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { LinkBack } from '../../assets/components/LinkBack/LinkBack';
const {Option} = Select;

const lessonTypesNames:Record<string,string> = {
    "Лекція":"Лк",
    "Практика":"Пр",
    "Залік":"Злк",
    "Лаб":"Лаб",
    "Консультація":"Кон",
    "Атестаційна":"Ат",
    "Коригуюча":"Кор",
    "Підсумкова":"Підс",
    "Річна":"Річна"
}

const useJournalDragScroll = () => {
    const cellsRef = useRef<HTMLDivElement>(null);
    const lessonTypesRef = useRef<HTMLDivElement>(null);
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef<{x:number,y:number}>({x:0,y:0})
    const [isMouseDown,setIsMouseDown] = useState(false);
    const handleHorizontalScroll = () => {
        if(lessonTypesRef.current === null || cellsRef.current === null) return;
        lessonTypesRef.current.scrollLeft = cellsRef.current.scrollLeft;
    }
    const handleHorizontalScrollLessonTypes = () => {
        if(lessonTypesRef.current === null || cellsRef.current === null) return;
        cellsRef.current.scrollLeft = lessonTypesRef.current.scrollLeft;
    }
    const handleVerticalScroll = () => {
        if(mainContainerRef.current === null || cellsRef.current === null) return;
        cellsRef.current.scrollTop = mainContainerRef.current.scrollTop;
    }
    const mouseDownHandler = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        console.log('1')
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
        setIsMouseDown(true);
        onMouseMove(e,true,{x:e.clientX,y:e.clientY});
    }
    const mouseUpHandler = () => {
        setIsMouseDown(false);
    }
    const onMouseMove = (e:React.MouseEvent<HTMLDivElement,MouseEvent>,localIsMouseDown?:boolean,localMousePos?:{x:number,y:number}) => {
        if(!isMouseDown && !localIsMouseDown) return;
        console.log('1')
        if(lessonTypesRef.current === null || cellsRef.current === null || mainContainerRef.current === null) return;
        
        const deltaX = !localMousePos ? e.clientX - mousePos.current.x : e.clientX - localMousePos.x;
        const deltaY = !localMousePos ? e.clientY - mousePos.current.y : e.clientY - localMousePos.y;
        if(deltaX < 0){
            cellsRef.current.scrollLeft += 5 - deltaX;
            lessonTypesRef.current.scrollLeft += 5 - deltaX;
        }else if(deltaX > 0){
            cellsRef.current.scrollLeft -= 5 + deltaX;
            lessonTypesRef.current.scrollLeft -= 5 - deltaX;
        }
        if(deltaY < 0){
            cellsRef.current.scrollTop += 5 - deltaY;
            mainContainerRef.current.scrollTop += 5 - deltaY;
        }else if(deltaY > 0){
            cellsRef.current.scrollTop -= 5 + deltaY;
            mainContainerRef.current.scrollTop -= 5 + deltaY;
        }
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
    }

        
    return {cellsRef,lessonTypesRef,mainContainerRef,mousePos,onMouseMove,mouseUpHandler,mouseDownHandler,handleHorizontalScrollLessonTypes,handleHorizontalScroll,handleVerticalScroll}
}

export const TeacherJournal = () => {
    const {fillters,loading,journal,onChangeFillters,isDisabledByDate,onBlurChangeLessonTopic,onChangeLessonType,currentMonth,token,attestations} = useGetTeacherJournal();
    const {groups} = useGroupsByTeacher();
    const groupJournal = groups.find(group => group.journal_group === fillters.group_id);
    const theme = useThemeStore().theme;
    const {cellsRef,lessonTypesRef,mainContainerRef,onMouseMove,mouseUpHandler,mouseDownHandler,handleHorizontalScrollLessonTypes,handleHorizontalScroll,handleVerticalScroll} = useJournalDragScroll();
    
    useEffect(() => {
        const subjectName = groupJournal?.can_edit.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name || groupJournal?.can_view.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
        if(!groupJournal?.journal_group_full_name || !subjectName){
            document.title = `Журнал`;
            return;
        }
        document.title = `${groupJournal?.journal_group_full_name} - ${subjectName} - ${attestations?.find(att => att.active)?.name}`;
    },[fillters.subject_id,journal,groupJournal]);

    if(loading) return <Loader/>
    if(!journal) return <NoMatch title={`Журналу не знайдено`}/>
    if(!journal.students.length || !journal.columns.length) return <NoMatch title="Журнал ще не створено"/>

    return <div onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} className={`journalMain__container ${theme}`}>
        <section className='journalTop__container'>
            <LinkBack title={"Обрати предмет"} route={routes.pickJournalSubject + `?group_id=${groupJournal?.journal_group}`}/>
            <h1 className='journal__title'>Журнал <p className='journalGroup_groupName'>{groupJournal?.journal_group_full_name}</p></h1>
            <div className='journalFillters__container'>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Місяць</p>
                    </div>}
                    className="fillter_select"
                    defaultValue={attestations?.find(att => att.active)?.name}
                    allowClear
                    value={attestations?.find(att => att.active)?.name}
                    onChange={(value) => onChangeFillters('month',value)}
                    // onClear={() => onChangeFillters('month',null)}
                    >
                        {/* {studyMonths.map((month,i) => {
                            if(i > studyMonths.findIndex(_month => _month.number === currentMonth + 1)) return null;
                            return <Option key={month.number} value={month.number} label={month.name}>{month.name}</Option>
                        })} */}
                        {attestations?.map(att => 
                            <Option key={att.name} value={att.name} label={att.name}>{att.name}</Option>
                        )}
                    </Select>
                </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container journalSubject_fillter_container"
                        style={{height:'300px !important',overflow:'hidden'}}
                        >
                    <Select 
                        placeholder={
                            <div className="fillterPlaceholder_container">
                                <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                            </div>
                        }
                        className="fillter_select"
                        style={{width:'300px !important'}}
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
            <div className='journalLeft__container' onMouseMove={onMouseMove} onMouseDown={mouseDownHandler}  onMouseUp={mouseUpHandler}>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>У жовтні кожного року проходить акція «відрахуй випускника»</p>
                </div>
                <div className='journalColumnsCenter__container' onScroll={handleHorizontalScrollLessonTypes} ref={lessonTypesRef}>
                    {journal?.columns.map(column => 
                        <div key={column.column_id} className={`journalColumnsCenterItem__container ${!column.date.includes('\n') && 'specialLessonType'}`}>
                                {
                                    journal.can_edit === 1  && column.date.includes('\n') ?
                                    <Select 
                                        disabled={
                                            journal.can_edit !== 1 || !column.date.includes('\n')
                                        }
                                        defaultValue={column.lesson_type || null} 
                                        className='journal_lessonTypeSelect' 
                                        rootClassName='journal_lessonTypeSelect'
                                        placeholder={'Тип'}
                                        onChange={(value) => onChangeLessonType(column.column_id,value,column.column_index)}>
                                            <Option label={"Лк"} value={"Лекція"}>Лекція</Option>
                                            <Option label={"Практика"} value={"Практика"}>Практика</Option>
                                            <Option label={"Залік"} value={"Залік"}>Залік</Option>
                                            <Option label={"Лаб"} value={"Лаб"}>Лаб</Option>
                                            <Option label={"Консультація"} value={"Консультація"}>Консультація</Option>
                                    </Select>
                                    : 
                                    <Tooltip title={column.lesson_type}>
                                        <div className='journalColumnsCenterItemType'>{lessonTypesNames[column.lesson_type] || ''}</div>
                                    </Tooltip>
                                }
                            <div className='journalColumnsCenterItemDate__container'>
                                <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')[0]}</p>
                                <p className='journalColumnsCenterItemDate'>{column.date.split('\n')[1]}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div onMouseUp={mouseUpHandler} className='journalRight__container' ref={mainContainerRef} onScroll={handleVerticalScroll}>
                <div className={`journalRightColumns__container`}>
                        {journal?.students.map(student => 
                            <div key={student.student_id} className={`journalRowItemLeft__container ${student.index%2 === 0 ? 'even' : ''}`}>
                                <p className='journalRowItemLeft__number'>{student.index}.</p>
                                <p className='journalRowItemLeft__name'>{student.full_name}</p>
                            </div>
                        )}
                </div>
                <div className='journalRightRowsContainer'
                    onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                    onMouseMove={onMouseMove}
                    ref={cellsRef} onScroll={handleHorizontalScroll}>
                        {journal?.students.map((student,i) => 
                            <div key={student.student_id} className={`journalRowItem__container ${student.index%2 === 0 ? 'even' : ''}`}>
                                <div className='journalRowItemCenter__container'>
                                    {journal.columns.map((column,j) => 
                                        (journal.can_edit === 1 &&
                                        (!isDisabledByDate(column.date) || !column.date.includes('\n')))
                                        ? !!token && <CellInput onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} rowIndex={i} columnIndex={j} key={column.column_id} token={token} date={column.date} onBlurData={{'column_id':column.column_id,'journal_id':journal.journal_id,subject_id:fillters.subject_id,'student_id':student.student_id,subject_system:journal.subject_system}} defaultValue={column.cells.find(cell => cell.index === student.index)?.value}/>
                                        : <p key={column.column_id} onMouseMove={() => {}} onMouseDown={mouseUpHandler} className={`journalRowItemCenterValue__text ${!column.date.includes('\n') && 'specialLessonType_cell'}`} style={{cursor:'not-allowed',color:getColorByValue(column.cells.find(cell => cell.index === student.index)?.value || "",journal.subject_system),}}>{column.cells.find(cell => cell.index === student.index)?.value}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </section>
        <section className='journalLessonsThemes__section'>
            <h1 className='journalLessonsThemes__title'>Теми занять</h1>
            <div className='journalLessonsThemes__container'>
                {journal?.columns.map(column => column.date.includes('.') &&
                    <div className='journalLessonThemeItem__container' key={column.column_id}>
                        <div className='journalLessonThemeItemDate__container'>
                            <p className='journalLessonThemeItemDate__day'>{column.date.split('\n')[0]}</p>
                            <p className='journalLessonThemeItemDate__date'>{column.date.split('\n')[1]}</p>
                            <p id={column.column_index.toString()} className='journalLessonThemeItemType'>{column.lesson_type}</p>
                        </div>
                        <input
                        disabled={
                            journal.can_edit === 0
                        }
                        onBlur={(e) => onBlurChangeLessonTopic(column.column_id,e.target.value)} 
                        placeholder='Заповніть тему заняття' defaultValue={column.lesson_topic} 
                        className='journalLessonThemeItem__input__text'/>
                    </div>
                )}
            </div>
        </section>
    </div>
}