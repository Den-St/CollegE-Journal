import { Select } from 'antd';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkBack } from '../../assets/components/LinkBack/LinkBack';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { JournalPortraitModeWarning } from '../../assets/svgs/journalPortraitModeWarningSvg';
import { LeftArrowSvg } from '../../assets/svgs/leftArrowSvg';
import { routes } from '../../consts/routes';
import { studyMonths } from '../../consts/studyMonths';
import { useStudentJournal } from '../../hooks/studentJournal';
import { useStudentSubjects } from '../../hooks/studentSubjects';
import { useStudentJournalSubjectsStore } from '../../store/studentJournalSubjects';
import { useThemeStore } from '../../store/themeStore';
import { Loader } from '../Loader/Loader';
import { NoMatch } from '../NoMatch';
import { getColorByValue } from './CellInput';
import './journalStyles.scss';
const {Option} = Select;

export const StudentJournal = () => {
    const theme = useThemeStore().theme;
    const {loading,journal,fillters,onChangeFillters,columnByMonth} = useStudentJournal()
    const currentMonth = new Date().getMonth();
    const {journalSubjects} = useStudentSubjects();
    const subjects = journalSubjects.subjects;
    const currentSubjectName = subjects.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
    console.log(fillters.month);
    useEffect(() => {
        const subjectName = subjects.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
        if(!subjectName){
            document.title = `Журнал`;
            return;
        }
        document.title = `Журнал - ${subjectName} - ${studyMonths.find(month => month.number === fillters.month)?.name || 'Увесь семестр'}`;
    },[fillters.subject_id,fillters.month,journal,subjects]);

    const cellsRef = useRef<HTMLDivElement>(null);
    const lessonTypesRef = useRef<HTMLDivElement>(null);
    // const mainContainerRef = useRef<HTMLDivElement>(null);
    // const [journalWidth,setJournalWidth] = useState(document.getElementById('journal__container')?.clientWidth);
    
    const handleHorizontalScroll = () => {
        if(lessonTypesRef.current === null || cellsRef.current === null) return;
        lessonTypesRef.current.scrollLeft = cellsRef.current.scrollLeft;
    }
    // useEffect(() => {
    //     setJournalWidth(document.getElementById('journal__container')?.clientWidth);
    // },[document.getElementById('journal__container')?.clientWidth]);

    if(loading) return <Loader/>
    if(!journal) return <div className={`journalMain__container ${theme}`}>
            <section className='journalTop__container'>
                <LinkBack title={"Список предметів"} route={routes.pickJournalSubject}/>
            </section>
            <NoMatch title={`Журналу не знайдено`} isChildren={true}/>
        </div>
    if(!journal.columns.length) return <div className={`journalMain__container ${theme}`}>
            <section className='journalTop__container'>
                <LinkBack title={"Список предметів"} route={routes.pickJournalSubject}/>
            </section>
            <NoMatch title={`Журналу не знайдено`} isChildren={true}/>
        </div>

    return <div className={`journalMain__container ${theme}`}>
        <section className='journalTop__container'>
            <LinkBack title={"Список предметів"} route={routes.pickJournalSubject}/>
            <h1 className='journal__title'>Журнал</h1>
            <div className='journalFillters__container'>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Місяць</p>
                    </div>}
                    className="fillter_select"
                    defaultValue={fillters.month || null}
                    allowClear
                    onClear={() => onChangeFillters('month',null)}
                    value={fillters.month || null}
                    onChange={(value) => onChangeFillters('month',value || null)}
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
                        {!!subjects.length && 
                        subjects
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
            {fillters.month !== null && <div className='journalLeft__container'>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>" У жовтні кожного року проходить акція«відрахуй випускника» "</p>
                </div>
                <div className='journalColumnsCenter__container' ref={lessonTypesRef}>
                    {fillters.month !== null && journal.columns.map(column => <div key={column.column_index} className={`journalColumnsCenterItem__container ${!column.date.includes('\n') && 'specialLessonType'}`}>
                            <div className={`journalColumnsCenterItemType ${column.date.includes('\n') && `transparent`}`}>
                                {!column.date.includes('\n') && column?.lesson_type}
                            </div>
                            <div className='journalColumnsCenterItemDate__container'>
                                <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')[0]}</p>
                                <p className='journalColumnsCenterItemDate'>{column.date.split('\n')[1]}</p>
                            </div>
                    </div>)}
                </div>
            </div>}
            <div className='journalRight__container' style={{height:'unset'}}>
                {fillters.month !== null && <div className='journalRightColumns__container'>
                        <div className='journalRowItemLeft__container'>
                            <p className='journalRowItemLeft__name'>{currentSubjectName}</p>
                        </div>
                    </div>}
                <div className='journalRightRowsContainer' 
                style={{position:'unset',width:fillters.month === null ? '100%' : 'calc(100% - 332px)'}} 
                ref={cellsRef} onScroll={handleHorizontalScroll}>
                    {fillters.month === null ? columnByMonth?.map((columns,i) => 
                    <Fragment key={columns[0]?.column_index}>
                        { <div className='journalRowItemCenter__container' style={{marginBottom:'30px',justifyContent:'unset',marginLeft:fillters.month === null ? 'unset' : '66px'}}>
                            {columns.map(column => 
                                <div key={column?.column_index} className={`journalColumnsCenterItem__container ${!column.date.includes('\n') && 'specialLessonType'}`}>
                                    <div className='journalColumnsCenterItemDate__container'>
                                        <p className='journalColumnsCenterItemDateDay'>{column.date.split('\n')?.[0]}</p>
                                        <p className='journalColumnsCenterItemDate'>{column.date.split('\n')?.[1]}</p>
                                    </div>
                                </div>
                            )}
                        </div> }
                        <div className='journalRowItemCenter__container' style={{marginBottom:'30px',marginLeft:fillters.month === null ? 'unset' : '66px'}}>
                            {columns.map(column => 
                                <div key={column?.column_index + column.date} className={`journalRowItemCenterValue__container ${!column.date.includes('\n') && 'specialLessonType'}`}><p className='journalRowItemCenterValue__text' style={{color:getColorByValue(column.cells[0]?.value)}}>{column.cells[0]?.value}</p></div>
                            )}
                        </div>
                    </Fragment>
                    ) : <div className='journalRowItemCenter__container' style={{marginBottom:'30px',marginLeft:fillters.month === null ? 'unset' : '66px'}}>
                        {journal.columns.map(column => 
                            <div key={column?.column_index + column.date} className={`journalRowItemCenterValue__container ${!column.date.includes('\n') && 'specialLessonType'}`}><p className='journalRowItemCenterValue__text' style={{color:getColorByValue(column.cells[0]?.value)}}>{column.cells[0]?.value}</p></div>
                        )}
                    </div>}
                </div>
            </div>
        </section>
    </div>
}