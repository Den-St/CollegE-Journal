import { Select, Tooltip, Switch, Spin } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { JournalPortraitModeWarning } from "../../assets/svgs/journalPortraitModeWarningSvg";
import axiosConfig from "../../axiosConfig";
import { endpoints } from "../../consts/endpoints";
import { lessonTypesNamesAbbreviations } from "../../consts/lessonTypesNamesAbbreviations";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { getToken } from "../../helpers/auth";
import { setFromSubjects } from "../../helpers/setFromObjects";
import { useGroupsByTeacher } from "../../hooks/groupsByTeacher";
import { useJournalDragScroll } from "../../hooks/useJournalDragScroll";
import { useJournalPrintForm } from "../../hooks/useJournalPrintForm";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import { JournalAttestationT } from "../../types/journalAttestation";
import { JournalGroupT } from "../../types/journalGroup";
import { TeacherJournalT } from "../../types/teacherJournal";
import { TeacherJournalFilltersT } from "../../types/teacherJournalFillters";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";
import { CellInput, getColorByValue } from "./CellInput";
import { PrintForm } from "./PrintForm";
import { useTeacherSettingsModal, TeacherSettingsModal } from "./TeacherSettings";
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
    teachers:string[],
    subjects:string[],
    student_list:{
        columns: []
        full_name:string
        total: number
    },
    group_name:string
}

type AbsenceTableFilltersT = {
    group_id:string,
    offset:number,
}
const getPreviousMonday = () => {
    const date = new Date();
    const day = date.getDay();
    const prevMonday = new Date();
    prevMonday.setHours(0);
    prevMonday.setMinutes(0);
    prevMonday.setSeconds(0);

    if(date.getDay() === 0){
        prevMonday.setDate(date.getDate() - 7);
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }
    return Math.round((prevMonday.getTime() || 0)/1000);
}
const getEndOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const prevMonday = new Date();
    prevMonday.setHours(0);
    prevMonday.setMinutes(0);
    prevMonday.setSeconds(0);

    if(date.getDay() === 0){
        prevMonday.setDate(date.getDate() - 7);
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }
    prevMonday.setDate(prevMonday.getDate() + 6);
    return Math.round((prevMonday.getTime() || 0)/1000);
}

const getStartAndEnd = (offset:number) => {
    const date = new Date();
    const day = date.getDay();
    const monday = new Date();
    const saturday = new Date();
    monday.setHours(0);
    monday.setMinutes(0);
    monday.setSeconds(0);
    saturday.setHours(0);
    saturday.setMinutes(0);
    saturday.setSeconds(0);

    if(date.getDay() === 0){
        monday.setDate(date.getDate() - 7-(offset*7));
    }
    else{
        monday.setDate(date.getDate() - (day-1)-(offset*7));
    }
    saturday.setDate(monday.getDate()-(offset*7) + 5);

    return {start:Math.round((monday.getTime() || 0)/1000),end:Math.round((saturday.getTime() || 0)/1000)};
}


const useGetAbsenceTable = () => {
    const navigate = useNavigate();
    const [table,setTable] = useState<AbsenceTableT>();
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const group_id = searchParams.get('group_id');
    const offset_param = Number(searchParams.get('offset')) || 0;
    const [offset,setOffset] = useState(offset_param);
    const {start,end} = getStartAndEnd(offset);
    const [fillters,setFillters] = useState<AbsenceTableFilltersT>({
        group_id:group_id || '',
        offset:Number(offset_param) || 0
    });

    const token = useUserStore().user.token || getToken();
    
    const fetch = async (_fillters?:AbsenceTableFilltersT) => {
        if(!fillters.group_id) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.absenceTable,{group_id,start,end},{headers:{Authorization:token}});
            setTable(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
    // const refetch = async (_fillters?:TeacherJournalFilltersT) => {
    //     if(!fillters.subject_id && !_fillters?.subject_id) return;
    //     setLoading(true);
    //     try{
    //         const res = (!!_fillters?.subject_id && _fillters?.subject_id !== fillters.subject_id) 
    //         ? await axiosConfig.post(endpoints.journal,{end:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,start:-1,attestations:+_fillters.onlyAtts ? 1 : 0},{headers:{Authorization:token}}) 
    //         : await axiosConfig.post(endpoints.journal,{end:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.end || -1),journal_id:_fillters?.subject_id || fillters?.subject_id,start:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.start || -1),attestations:+(_fillters?.onlyAtts || fillters?.onlyAtts) ? 1 : 0},{headers:{Authorization:token}});
            
    //         if(_fillters?.subject_id !== fillters.subject_id) setAttestations(res.data.attestations);
    //         if(!!res.data.attestations?.length && !_fillters) setAttestations(res.data.attestations);
    //         setJournal(res.data);
    //     }catch(err){
    //         console.error(err);
    //     }
    //     setLoading(false);
    // }

    useEffect(() => {
        fetch();
    },[])

    const onChangeOffset = (fieldName:'group_id' | 'offset',value:number | string) => {
        if(!group_id) return;
        setFillters(prev => ({ ...prev,[fieldName]:value}));
        fetch({...fillters,[fieldName]:value});
    }

    // const isDisabledByDate = (dateString:string) => {
    //     if(!+dateString.includes('\n') || +dateString.split('\n')?.[1].split('.')[1] > currentMonth) {
    //         return true;
    //     }
    //     if(+dateString.split('\n')?.[1].split('.')[1] === currentMonth && +dateString.split('\n')[1].split('.')[0] > currentDate){
    //         return true;
    //     }
    //     return false;
    // }
    // const onChangeLessonType = async (column_id:string,lesson_type:string,column_index:number) => {
    //     try{
    //         await axiosConfig.post(endpoints.journalEditCellType,{column_id,lesson_type,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
    //         const lessonTypeP = document.getElementById('lessonTheme'+column_index.toString());
    //         if(lessonTypeP?.innerText){
    //             lessonTypeP.innerText = lesson_type;
    //         }
    //     }catch(err){    
    //         console.error(err);
    //     }
    // }
    // const onBlurChangeLessonTopic = async (column_id:string,lesson_topic:string) => {
    //     try{
    //         await axiosConfig.post(endpoints.journalEditCellTopic,{column_id,lesson_topic,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
    //     }catch(err){
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     navigate(routes.journal+`?group_id=${fillters.group_id}&subject_id=${fillters.subject_id}&attestations=${+fillters.onlyAtts}`);
    // },[fillters]);

    // return {loading,journal,fillters,onChangeFillters,token,isDisabledByDate,
    //         onChangeLessonType,onBlurChangeLessonTopic,currentMonth,attestations,
    //         refetch,};
    return {table,offset,start,end,loading,fillters,onChangeOffset}
}

export const AbsenceTable = () => {
    const {table,offset,start,end,loading,fillters,onChangeOffset} = useGetAbsenceTable();
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


    return <div onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} className={`journalMain__container ${theme}`}>
        <AbsenceTableFillters table={table} groups={groups} onChangeFillters={onChangeOffset} loading={loading} fillters={fillters}/>
        {/* {loading ? <Loader/>
        : !table ? <NoMatch title={`Журналу не знайдено`}/>
        : (!table.dates.length || !table.student_list.columns.length || !table.subjects.length) ? <NoMatch isChildren title="Журнал пустий"/> : <>
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
                    {journal?.columns.map((column,i) => 
                        <div key={column.column_id}  className={`journalColumnsCenterItem__container ${!column.date.includes('\n') && !!i && journal.columns[i-1]?.date !== column.date ? `specialLessonType` : ``} ${!column.date.includes('\n') && !!i && journal.columns[i+1]?.date !== column.date ? `specialLessonType_last` : ``}`}>
                                <div id={'columnSelect_'+column.column_index}
                                    className='journal_lessonTypeSelect_wrapper' 
                                    >{
                                    journal.can_edit === 1  && column.date.includes('.') ?
                                        <Select 
                                        disabled={
                                            journal.can_edit !== 1 || !column.date.includes('.')
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
                                        <div className='journalColumnsCenterItemType'>{lessonTypesNamesAbbreviations[column.lesson_type] || '-'}</div>
                                    </Tooltip>
                                }</div>
                            <div className='journalColumnsCenterItemDate__container'
                                id={'columnDate_'+column.column_index}
                            >
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
                        <div key={student.student_id} id={'student_'+student.index} className={`journalRowItemLeft__container ${student.index%2 === 0 ? 'even' : ''}`}>
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
                                        ? !!token && <CellInput className={`${!column.date.includes('\n') && !!j && journal.columns[j-1]?.date !== column.date ? `specialLessonType_cell` : ``} ${!column.date.includes('\n') && !!j && journal.columns[j+1]?.date !== column.date ? `specialLessonType_last_cell` : ``}`} onMouseMove={onMouseMove} onMouseUp={mouseUpHandler} rowIndex={i} studentIndex={student.index} columnIndex={j} key={`${column.column_id}_${i}`} token={token} date={column.date} onBlurData={{'column_id':column.column_id,'journal_id':journal.journal_id,subject_id:fillters.subject_id,'student_id':student.student_id,subject_system:journal.subject_system}} defaultValue={column.cells.find(cell => cell.index === student.index)?.value}/>
                                        : <p key={column.column_id} onMouseMove={() => {}} onMouseDown={mouseUpHandler} className={`journalRowItemCenterValue__text ${!column.date.includes('\n') && !!j && journal.columns[j-1]?.date !== column.date ? `specialLessonType_cell` : ``} ${!column.date.includes('\n') && !!j && journal.columns[j+1]?.date !== column.date ? `specialLessonType_last_cell` : ``}`} style={{cursor:'not-allowed',color:getColorByValue(column.cells.find(cell => cell.index === student.index)?.value || "",journal.subject_system),}}>{column.cells.find(cell => cell.index === student.index)?.value}</p>
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
                            <p id={'lessonTheme'+column.column_index.toString()} className='journalLessonThemeItemType'>{column.lesson_type}</p>
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
        </section> */}
        {/* </>} */}
    </div>
}

const useAbsenceTablePrint = () => {
    const [printLoading,setPrintLoading] = useState(false);
    const fetchFile = () => {
        setPrintLoading(true);
        setPrintLoading(false);
    }

    return {printLoading}
}
type Props = {
    fillters:AbsenceTableFilltersT,
    loading:boolean,
    onChangeFillters:(fieldName:'group_id' | 'offset',value:number | string) => void,
    groups:JournalGroupT[],
    table?:AbsenceTableT
}
export const AbsenceTableFillters:React.FC<Props> = ({groups,loading,fillters,onChangeFillters,table}) => {
    const {printLoading} = useAbsenceTablePrint();

    return <>
    <section className='journalTop__container'>
        <LinkBack title={"Список групи"} route={routes.pickJournalSubject + `?group_id=${fillters.group_id}`}/>
        <h1 className='journal__title'>Список відсутніх <p className='journalGroup_groupName'>{groups.find(group => group.journal_group === fillters.group_id)?.journal_group_full_name}</p></h1>
        <div className='journalFillters__container'>
            <div style={{'display':'flex','gap':'50px','flexWrap':'wrap'}}>
            <div className="adminPanelStudentList_fillterContainer fillter_container journalSubject_fillter_container"
                    style={{height:'300px !important',overflow:'hidden'}}
                    >
                {!groups.length
                ? <div style={{width:'100px',height:'50px'}}><Loader/></div>
                : <Select 
                    placeholder={
                        <div className="fillterPlaceholder_container">
                            <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
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
                {!loading && !!table && <button disabled={printLoading} className='primary_button'>{!printLoading ? `Друк` : <Spin/>}</button>}
            </div>
        </div>
    </section>
    </>
}