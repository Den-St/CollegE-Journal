import { Select, Tooltip, Switch, Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import { eachDayOfInterval, format, nextSaturday } from "date-fns";
import { useState, useEffect, Fragment, useMemo, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../../assets/components/LinkBack/LinkBack";
import { FilterIconSvg } from "../../../assets/svgs/filterIconSvg";
import { JournalPortraitModeWarning } from "../../../assets/svgs/journalPortraitModeWarningSvg";
import { LeftArrowSvg } from "../../../assets/svgs/leftArrowSvg";
import { RightArrowSvg } from "../../../assets/svgs/rightArrowSvg";
import axiosConfig from "../../../axiosConfig";
import { endpoints } from "../../../consts/endpoints";
import { routes } from "../../../consts/routes";
import { getToken } from "../../../helpers/auth";
import { daysShort } from "../../../helpers/daysShort";
import { useGroupsByTeacher } from "../../../hooks/groupsByTeacher";
import { useJournalDragScroll } from "../../../hooks/useJournalDragScroll";
import { useThemeStore } from "../../../store/themeStore";
import { useUserStore } from "../../../store/userStore";
import { JournalGroupT } from "../../../types/journalGroup";
import { Loader } from "../../Loader/Loader";
import { NoMatch } from "../../NoMatch";
import {FastForwardFilled} from '@ant-design/icons';
import _debounce from 'lodash/debounce';
import './absenceTableStyles.scss';
import { securityLevels } from "../../../consts/securityLevels";
import { useJournalPrintForm } from "../../../hooks/useJournalPrintForm";
import { AbsenceTablePrintForm } from "./AbsenceTablePrintForm";
import { AbsenceTableFilltersT, AbsenceTableT } from "../../../types/absenceTable";
import { useAbsenceTableDownload } from "../../../hooks/absenceTableDownload";
import { useAbsenceTableTeacherSubjectsDragToScroll } from "../../../hooks/absenceTableDragToScroll";
import { useAbsenceTablePrintForm } from "../../../hooks/absenceTablePrintform";
import { useGetAbsenceTable } from "../../../hooks/getAbsenceTable";
const {Option} = Select;


export const AbsenceTable = () => {
    const {table,start,end,loading,fillters,onChangeOffset,navigate} = useGetAbsenceTable();
    const {groups} = useGroupsByTeacher();
    const group = groups.find(group => group.journal_group === fillters.group_id);
    const theme = useThemeStore().theme;
    const {cellsRef,lessonTypesRef,mainContainerRef,onMouseMove,mouseUpHandler,
           mouseDownHandler,handleHorizontalScrollLessonTypes,handleHorizontalScroll,handleVerticalScroll} = useJournalDragScroll();
    const user_level = useUserStore().user.security_level;
    
    useEffect(() => {
        console.log(user_level,group);
        if(!!user_level && user_level !== securityLevels.admin && !!group && !group?.is_supervisor) navigate(routes.groups);
    },[user_level,group])

    useEffect(() => {
        if(!group?.journal_group_full_name){
            document.title = `Таблиця відсутніх`;
            return;
        }
        document.title = `Таблиця відсутніх - ${group?.journal_group_full_name}`;
    },[table,group]);

    return <div onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} className={`journalMain__container ${theme}`}>
        <AbsenceTableFillters start={start} end={end} table={table} groups={groups} onChangeFillters={onChangeOffset} loading={loading} fillters={fillters}/>
        {loading ? <Loader/>
        : !table ? <NoMatch title={`Таблиці за групою не знайдено`}/>
        : (!table.dates?.length || !table.student_list.length || !table.subjects.length) ? <NoMatch isChildren title="Таблиця пуста"/> : <>
        <section className='journal_portraitModeWarning'>
                <JournalPortraitModeWarning/>
                <p className='journal_portraitModeWarning_header'>Халепа, треба перевернути телефон</p>
                <p className='journal_portraitModeWarning_description'>Переверніть телефон у альбомний режим, тільки так можливо передивитися таблицю</p>
        </section>
        <section className='journal__container'>
            <div className='journalLeft__container' onMouseMove={onMouseMove} onMouseDown={mouseDownHandler}  onMouseUp={mouseUpHandler}>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>У жовтні кожного року проходить акція «відрахуй випускника»</p>
                </div>
                <div className='journalColumnsCenter__container' onScroll={handleHorizontalScrollLessonTypes} ref={lessonTypesRef}>
                    {table.dates?.map((date,i) => 
                        <div key={date}  className={`absenceTable_dayContainer`}>
                            <p className="absenceTable_day">{daysShort[date.split(' ')[0]]}</p>
                            <div className="absenceTable_dayNumberContainer">
                                <p className="absenceTable_dayNumber">1</p>
                                <p className="absenceTable_dayNumber">2</p>
                                <p className="absenceTable_dayNumber">3</p>
                                <p className="absenceTable_dayNumber">4</p>
                                <p className="absenceTable_dayNumber">5</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div onMouseUp={mouseUpHandler} className='journalRight__container' ref={mainContainerRef} onScroll={handleVerticalScroll}>
                <div className={`journalRightColumns__container`}>
                    {table?.student_list.map((student,i) => 
                        <div key={student.full_name} id={'student_'+i} className={`journalRowItemLeft__container ${(i+1)%2 === 0 ? 'even' : ''}`}>
                            <p className='journalRowItemLeft__number'>{i+1}.</p>
                            <p className='journalRowItemLeft__name'>{student.full_name}</p>
                        </div>
                    )}
                </div>
                <div className='journalRightRowsContainer'
                    onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                    onMouseMove={onMouseMove}
                    ref={cellsRef} onScroll={handleHorizontalScroll}>
                    {table?.student_list.map((student,i) => 
                        <div key={student.full_name+i} className={`journalRowItem__container ${(i+1)%2 === 0 ? 'even' : ''}`}>
                            <div className='journalRowItemCenter__container'>
                                {student.columns.map((dayValues,j) => 
                                    <Fragment key={j}>{dayValues.map(day => <p key={j} onMouseMove={() => {}} onMouseDown={mouseUpHandler} className={`journalRowItemCenterValue__text`} style={{cursor:'not-allowed',color:'var(--primary-orange)'}}>{day}</p>)}</Fragment>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
        <AbsenceTableTeachersSubjects table={table}/>
        </>}
    </div>
}

type TeachersProps = {
    table:AbsenceTableT
}

const AbsenceTableTeachersSubjects:React.FC<TeachersProps> = ({table}) => {
    const {teachersRef,subjectsRef,onMouseMove,mouseUpHandler,
        mouseDownHandler,handleHorizontalScrollTeachers,handleHorizontalScrollSubjects} = useAbsenceTableTeacherSubjectsDragToScroll();

    return  <section 
            onMouseUp={mouseUpHandler}
            className="absenceTable_teacherSection">
        <div className="absenceTable_teachersContainer">
            <p className="absenceTable_teachersSection_header">ПІБ Викладача</p>
            <div 
            onScroll={handleHorizontalScrollTeachers} ref={teachersRef}
            onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
            onMouseMove={onMouseMove}
            className="absenceTable_teachersContainer">
                {table.teachers.map(teachersSubArray => <>{teachersSubArray.map(teacher => <p className="absenceTable_teacher">{teacher}</p>)}</>)}
            </div>
        </div>
        <div className="absenceTable_teachersContainer">
            <p className="absenceTable_teachersSection_header">Дисципліна</p>
            <div 
            onScroll={handleHorizontalScrollSubjects} ref={subjectsRef} 
            onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
            onMouseMove={onMouseMove}
            className="absenceTable_teachersContainer">
                {table.subjects.map(subjectsSubArray => <>{subjectsSubArray.map(subject => <p className="absenceTable_teacher">{subject}</p>)}</>)}
            </div>
        </div>
    </section>
}

type Props = {
    fillters:AbsenceTableFilltersT,
    loading:boolean,
    onChangeFillters:(fieldName:'group_id' | 'offset',value:number | string) => void,
    groups:JournalGroupT[],
    table?:AbsenceTableT,
    start:number,
    end:number
}

export const AbsenceTableFillters:React.FC<Props> = ({groups,loading,fillters,onChangeFillters,table,start,end}) => {
    const group = groups.find(group => group.journal_group === fillters.group_id);
    const {handlePrint,componentRef} = useAbsenceTablePrintForm()
    const {downloadLoading,fetchFile} = useAbsenceTableDownload(start,end,group?.journal_group_full_name,group?.journal_group);
    const isAdmin = useUserStore().user.security_level === securityLevels.admin;
    const onDecrementOffset = () => {
        onChangeFillters('offset',fillters.offset - 1);
    }
    const onIncrementOffset = () => {
        onChangeFillters('offset',fillters.offset + 1);
    }  
    const onJumpToEnd = () => {
        onChangeFillters('offset',0);
    }

    return <>
        <section className='journalTop__container'>
            {!!group?.journal_group_full_name && !!table && <AbsenceTablePrintForm ref={componentRef} table={table} groupName={group.journal_group_full_name}/>}
            <LinkBack title={"Список групи"} route={routes.pickJournalSubject + `?group_id=${fillters.group_id}`}/>
            <div style={{'width':'100%','justifyContent':'space-between','display':'flex'}}>
                <h1 className='journal__title'>Список відсутніх <p className='journalGroup_groupName'>{group?.journal_group_full_name}</p></h1>
                <div style={{'display':'flex','gap':'30px'}}>
                    {!loading && !!table && <button disabled={downloadLoading} className='primary_button' onClick={fetchFile}>{!downloadLoading ? `Завантажити` : <Spin/>}</button>}
                    {!loading && !!table && <button className='primary_button' onClick={handlePrint}>Друк</button>}
                </div>
            </div>
            <div className='journalFillters__container'>
                <div style={{'display':'flex','gap':'60px','flexWrap':'wrap'}}>
                    <div className="absenceTable_weekFillter">
                        <button className="absenceTable_fillterArrowButton" onClick={onDecrementOffset}><LeftArrowSvg/></button>
                        <p className="absenceTable_datesFillter">{new Date(start*1000).toLocaleDateString()+'-'+new Date(end*1000).toLocaleDateString()}</p>
                        <button className={`absenceTable_fillterArrowButton ${fillters.offset === 0 ? 'disabled' : ''}`}  disabled={fillters.offset === 0} onClick={onIncrementOffset}><RightArrowSvg/></button>
                        {/* <button  disabled={fillters.offset === 0} onClick={onJumpToEnd}><FastForwardFilled/></button> */}
                    </div>
                {isAdmin && <div className="adminPanelStudentList_fillterContainer fillter_container journalSubject_fillter_container"
                        style={{height:'300px !important',overflow:'hidden'}}
                        >
                    {loading || !groups.length
                    ? <div style={{width:'100px',height:'50px'}}><Loader/></div>
                    : <Select 
                        placeholder={
                            <div className="fillterPlaceholder_container">
                                <p className="fillter_placeholder">Група</p><FilterIconSvg/>
                            </div>
                        }
                        className="fillter_select"
                        style={{width:'300px !important'}}
                        // allowClear
                        loading={loading}
                        value={groups.find(group => group.journal_group === fillters.group_id)?.journal_group || ''}
                        onChange={(value) => onChangeFillters('group_id',value)}
                    >
                        {!!fillters.group_id && 
                        groups
                        .map(group =>
                            <Option key={group.journal_group} value={group.journal_group} label={group.journal_group_full_name}>{group.journal_group_full_name}</Option>
                        )}
                    </Select>}
                </div>}
                </div>
               
            </div>
        </section>
    </>
}