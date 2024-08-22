import { Select, Tooltip, Switch, Spin } from "antd";
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
const {Option} = Select;

type AbsenceTableT = {
    dates:string[],
    group_leader_data: {
        full_name: string,
        phone_number: string
    },
    supervisor_data: {
        full_name: string
        phone_number: string
    },
    teachers:string[][],
    subjects:string[][],
    student_list:{
        columns: string[][] 
        full_name:string
        total: number
    }[],
    group_name:string
}

type AbsenceTableFilltersT = {
    group_id:string,
    offset:number,
}

const getMondaysAndSaturdays = () => {
    const today = new Date();
    today.setHours(6);
    const days = eachDayOfInterval({
        start: new Date(today.getFullYear(), 0, 1,6),
        end: nextSaturday(today)
    })
    const formatedModaysAndSaturdays = days.map(el => { 
        if(format(el, 'EEEE') !== "Monday" &&  format(el, 'EEEE') !== 'Saturday') return;

        const date = new Date(el);
        date.setHours(6);
        return date;
    }).filter(date => !!date);
    console.log(formatedModaysAndSaturdays);
    return formatedModaysAndSaturdays;
}
const getStartAndEnd = (offset:number,formatedModaysAndSaturdays:(Date | undefined)[]) => {


    const currentMonday = formatedModaysAndSaturdays?.[formatedModaysAndSaturdays.length-1+(offset*2 - 1)];
    const currentSaturday = formatedModaysAndSaturdays?.[formatedModaysAndSaturdays.length-1+(offset*2)];

    return {start:Math.round((currentMonday?.getTime() || 0)/1000),end:Math.round((currentSaturday?.getTime() || 0)/1000)};
}


const useGetAbsenceTable = () => {
    const navigate = useNavigate();
    const [table,setTable] = useState<AbsenceTableT>();
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const group_id = searchParams.get('group_id');
    const offset_param = (Number(searchParams.get('offset')) || 0) > 0 ? 0 : Number(searchParams.get('offset'));
    const [fillters,setFillters] = useState<AbsenceTableFilltersT>({
        group_id:group_id || '',
        offset:Number(offset_param) || 0
    });
    const formatedModaysAndSaturdays = useMemo(getMondaysAndSaturdays,[])
    const {start,end} = getStartAndEnd(fillters.offset,formatedModaysAndSaturdays);
    console.log(start,end);

    const token = useUserStore().user.token || getToken();
    
    const fetch = async (_fillters?:AbsenceTableFilltersT) => {
        if(!fillters.group_id) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.absenceTable,{group_id:_fillters?.group_id,start,end},{headers:{Authorization:token}});
            setTable(res.data.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
    const debounceOnIncrementOffset = useCallback(_debounce(fetch, 300),[]);

    useEffect(() => {
        fetch({'group_id':fillters.group_id,'offset':offset_param});
    },[])

    const onChangeOffset = (fieldName:'group_id' | 'offset',value:number | string) => {
        if(!group_id) return;
        setFillters(prev => ({ ...prev,[fieldName]:value}));
        debounceOnIncrementOffset({...fillters,[fieldName]:value});
    }

    useEffect(() => {
        navigate(routes.absenceTable+`?group_id=${fillters.group_id}&offset=${fillters.offset}`);
    },[fillters]);

    return {table,start,end,loading,fillters,onChangeOffset}
}

const useAbsenceTableTeacherSubjectsDragToScroll = () => {
    const teachersRef = useRef<HTMLDivElement>(null);
    const subjectsRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef<{x:number,y:number}>({x:0,y:0})
    const [isMouseDown,setIsMouseDown] = useState(false);
    const handleHorizontalScrollTeachers = () => {
        if(subjectsRef.current === null || teachersRef.current === null) return;
        subjectsRef.current.scrollLeft = teachersRef.current.scrollLeft;
    }
    const handleHorizontalScrollSubjects = () => {
        if(subjectsRef.current === null || teachersRef.current === null) return;
        teachersRef.current.scrollLeft = subjectsRef.current.scrollLeft;
    }

    const mouseDownHandler = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
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
        if(subjectsRef.current === null || teachersRef.current === null) return;
        
        const deltaX = !localMousePos ? e.clientX - mousePos.current.x : e.clientX - localMousePos.x;
        if(deltaX < 0){
            teachersRef.current.scrollLeft += 5 - deltaX;
            subjectsRef.current.scrollLeft += 5 - deltaX;
        }else if(deltaX > 0){
            teachersRef.current.scrollLeft -= 5 + deltaX;
            subjectsRef.current.scrollLeft -= 5 - deltaX;
        }
        mousePos.current.x = e.clientX;
    }

    return {teachersRef,subjectsRef,mousePos,onMouseMove,mouseUpHandler,mouseDownHandler,handleHorizontalScrollSubjects,handleHorizontalScrollTeachers}
}

export const AbsenceTable = () => {
    const {table,start,end,loading,fillters,onChangeOffset} = useGetAbsenceTable();
    const {groups} = useGroupsByTeacher();
    const group = groups.find(group => group.journal_group === fillters.group_id);
    const theme = useThemeStore().theme;
    const {cellsRef,lessonTypesRef,mainContainerRef,onMouseMove,mouseUpHandler,
           mouseDownHandler,handleHorizontalScrollLessonTypes,handleHorizontalScroll,handleVerticalScroll} = useJournalDragScroll();

    useEffect(() => {
        if(!group?.journal_group_full_name){
            document.title = `Таблиця відсутніх`;
            return;
        }
        document.title = `Таблиця відсутніх - ${group?.journal_group_full_name}`;
    },[table,group]);
    console.log(new Date(start*1000).toLocaleDateString());

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
                                    <Fragment key={j}>{dayValues.map(day => <p key={j} onMouseMove={() => {}} onMouseDown={mouseUpHandler} className={`journalRowItemCenterValue__text`} style={{cursor:'not-allowed',}}>{day}</p>)}</Fragment>
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

const useAbsenceTablePrint = (start:number,end:number,group_name?:string,group_id?:string,) => {
    const [printLoading,setPrintLoading] = useState(false);
    const token = useUserStore().user.token;

    const fetchFile = async () => {
        if(!group_id || !group_name) return;
        setPrintLoading(true);

        console.log('safasdaf');
        try{
            const res = axiosConfig.post(endpoints.absenceTableFile,{group_id:group_id,start,end},{headers:{Authorization:token}})
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
                const url = window.URL.createObjectURL(blob);  // Create a URL for the blob
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'file.xls';  // Set the file name for download
                document.body.appendChild(a);
                a.click();  // Programmatically click the anchor to trigger the download
                window.URL.revokeObjectURL(url);  // Clean up the URL object
                document.body.removeChild(a);  // Remove the anchor element
            })
            .catch(error => console.error('Error downloading the file:', error));
        }catch(err){
            console.error(err);
        }
        setPrintLoading(false);
    }

    return {printLoading,fetchFile}
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
    const {printLoading,fetchFile} = useAbsenceTablePrint(start,end,groups.find(group => group.journal_group === fillters.group_id)?.journal_group_full_name,groups.find(group => group.journal_group === fillters.group_id)?.journal_group);
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
            <LinkBack title={"Список групи"} route={routes.pickJournalSubject + `?group_id=${fillters.group_id}`}/>
            <h1 className='journal__title'>Список відсутніх <p className='journalGroup_groupName'>{groups.find(group => group.journal_group === fillters.group_id)?.journal_group_full_name}</p></h1>
            <div className='journalFillters__container'>
                <div style={{'display':'flex','gap':'50px','flexWrap':'wrap'}}>
                    <div className="absenceTable_weekFillter">
                        <button className="absenceTable_fillterArrowButton" onClick={onDecrementOffset}><LeftArrowSvg/></button>
                        <p className="absenceTable_datesFillter">{new Date(start*1000).toLocaleDateString()+'-'+new Date(end*1000).toLocaleDateString()}</p>
                        <button className="absenceTable_fillterArrowButton"  disabled={fillters.offset === 0} onClick={onIncrementOffset}><RightArrowSvg/></button>
                        <button style={{'display':'flex',marginLeft:'-10px','fontSize':'20px'}} className="absenceTable_fillterArrowButton"  disabled={fillters.offset === 0} onClick={onJumpToEnd}><FastForwardFilled/></button>
                    </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container journalSubject_fillter_container"
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
                </div>
                </div>
                <div style={{'display':'flex','gap':'30px'}}>
                    {!loading && !!table && <button disabled={printLoading} className='primary_button' onClick={fetchFile}>{!printLoading ? `Друк` : <Spin/>}</button>}
                </div>
            </div>
        </section>
    </>
}