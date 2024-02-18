import { Select } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import './journalStyles.scss';
const {Option} = Select;

export const StudentJournal = () => {
    const theme = useThemeStore().theme;
    const {loading,journal,fillters,onChangeFillters} = useStudentJournal()
    const currentMonth = new Date().getMonth();
    const {journalSubjects} = useStudentSubjects();
    const subjects = journalSubjects.subjects;
    const currentSubjectName = subjects.find(subject => subject.journal_id === fillters.subject_id)?.subject_full_name;
    useEffect(() => {
        document.title = `Журнал - ${currentSubjectName}`;
    },[]);

    if(loading) return <Loader/>
    if(!journal) return <NoMatch title={`Журналу не знайдено`}/>
    if(!journal.columns.length) return <NoMatch title="Журнал ще не створено"/>

    return <div className={`journalMain__container ${theme}`}>
        <section className='journalTop__container'>
            <h1 className='journal__title'><Link to={routes.pickJournalSubject} className="editProfile_leaveButton"><LeftArrowSvg/></Link>Журнал</h1>
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
                            return <Option value={month.number} label={month.name}>{month.name}</Option>
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
                            <Option value={subject.journal_id} label={subject.subject_full_name}>{subject.subject_full_name}</Option>
                        )}
                        {/* <Option value={'Математика1'} label={'Математика1'}>Математика1 <FilterIconSvg/></Option>
                        <Option value={'Математика2'} label={'Математика2'}>Математика2 <FilterIconSvg/></Option>
                        <Option value={'Математика3'} label={'Математика3'}>Математика3 <FilterIconSvg/></Option>
                        <Option value={'Математика4'} label={'Математика4'}>Математика4 <FilterIconSvg/></Option> */}
                    </Select>
                </div>
                {/* <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                        placeholder={
                            <div className="fillterPlaceholder_container">
                                <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                            </div>
                        } 
                        className="fillter_select"
                        allowClear
                        value={fillters.}
                        onChange={(value) => onChangeFillters('subject_id',value)}
                    >
                        <Option value={'Математика1'} label={'Математика1'}>Математика1 <FilterIconSvg/></Option>
                        <Option value={'Математика2'} label={'Математика2'}>Математика2 <FilterIconSvg/></Option>
                        <Option value={'Математика3'} label={'Математика3'}>Математика3 <FilterIconSvg/></Option>
                        <Option value={'Математика4'} label={'Математика4'}>Математика4 <FilterIconSvg/></Option>
                    </Select>
                </div> */}
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
                    <p className='journalColumnsLeft__text'>" У жовтні кожного року проходить акція«відрахуй випускника» "</p>
                </div>
                <div className='journalRowItemLeft__container'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>{currentSubjectName}</p>
                </div>
            </div>
            <div className='journalRight__container'>
                <div className='journalRightColumns__container'>
                    <div className='journalColumnsCenter__container'>
                        {journal?.columns.map(column => 
                            <div key={column.column_index} className='journalColumnsCenterItem__container'>
                                <div className='journalColumnsCenterItemType transparent'>
                                </div>
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
                <div className='journalRowItem__container'>
                    <div className='journalRowItemCenter__container'>
                        {journal?.columns.map(column => 
                            <div key={column.cells[0].index} className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>{column.cells[0].value}</p></div>
                        )}
                    </div>
                    {/* <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div> */}
                </div>
            </div>
        </section>
    </div>
}