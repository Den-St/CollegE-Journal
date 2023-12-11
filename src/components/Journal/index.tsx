import { DatePicker, Select } from 'antd';
import { useState } from 'react';
import { CalendarSvg } from '../../assets/svgs/calendarSvg';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { useThemeStore } from '../../store/themeStore';
import './journalStyles.scss';
const {Option} = Select;

export const Journal = () => {
    const theme = useThemeStore().theme;
    const [datePickerOpen,setDatePickerOpen] = useState(false);
    const [pickedDate,setPickedDate] = useState<Date>();
    const onChangeDate = (e:Date) => {
        setPickedDate(e);
        setDatePickerOpen(false);
    }
    
    return <div className={`journalMain__container ${theme}`}>
        <section className='journalTop__container'>
            <h1 className='journal__title'>Журнал</h1>
            <div className='journalFillters__container'>
                {/* <div className="groupFillterItem__container">
                    <p className="journalFilterItem">Група</p>
                    <FilterIconSvg/>
                </div> */}
                 <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Група</p><FilterIconSvg/>
                    </div>} 
                    className="fillter_select"
                    allowClear

                    >
                        <Option value={'3-11'} label={'3-11'}>3-11 <FilterIconSvg/></Option>
                        <Option value={'3-21'} label={'3-21'}>3-21 <FilterIconSvg/></Option>
                        <Option value={'3-31'} label={'3-31'}>3-31 <FilterIconSvg/></Option>
                        <Option value={'3-41'} label={'3-41'}>3-41 <FilterIconSvg/></Option>
                    </Select>
                </div>
                {/* <div className="groupFillterItem__container">
                    <p className='journalFilterItem'>Місяць </p>
                    <FilterIconSvg/>
                </div> */}
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Місяць</p><FilterIconSvg/>
                    </div>}
                    className="fillter_select"
                    allowClear

                    >
                        <Option value={'Жовтень'} label={'Жовтень'}>Жовтень <FilterIconSvg/></Option>
                        <Option value={'Грудень'} label={'Грудень'}>Грудень <FilterIconSvg/></Option>
                        <Option value={'Серпень'} label={'Серпень'}>Серпень <FilterIconSvg/></Option>
                    </Select>
                </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                    </div>} 
                    className="fillter_select"
                    allowClear

                    >
                        <Option value={'Математика1'} label={'Математика1'}>Математика1 <FilterIconSvg/></Option>
                        <Option value={'Математика2'} label={'Математика2'}>Математика2 <FilterIconSvg/></Option>
                        <Option value={'Математика3'} label={'Математика3'}>Математика3 <FilterIconSvg/></Option>
                        <Option value={'Математика4'} label={'Математика4'}>Математика4 <FilterIconSvg/></Option>
                    </Select>
                </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Предмет</p><FilterIconSvg/>
                    </div>} 
                    className="fillter_select"
                    allowClear

                    >
                        <Option value={'Математика1'} label={'Математика1'}>Математика1 <FilterIconSvg/></Option>
                        <Option value={'Математика2'} label={'Математика2'}>Математика2 <FilterIconSvg/></Option>
                        <Option value={'Математика3'} label={'Математика3'}>Математика3 <FilterIconSvg/></Option>
                        <Option value={'Математика4'} label={'Математика4'}>Математика4 <FilterIconSvg/></Option>
                    </Select>
                </div>
            </div>
        </section>
        <section className='journal__container'>
            <div className='journalLeft__container'>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>" У жовтні кожного року проходить акція«відрахуй випускника» "</p>
                </div>
                <div className='journalRowItemLeft__container'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
                <div className='journalRowItemLeft__container even'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
                <div className='journalRowItemLeft__container'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
                <div className='journalRowItemLeft__container even'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
                <div className='journalRowItemLeft__container'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
                <div className='journalRowItemLeft__container even'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
                <div className='journalRowItemLeft__container'>
                    <p className='journalRowItemLeft__number'>1.</p>
                    <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                </div>
            </div>
            <div className='journalRight__container'>
                <div className='journalRightColumns__container'>
                    <div className='journalColumnsCenter__container'>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Лекція</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ПН</p>
                            <p className='journalColumnsCenterItemDate'>01.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Практика</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ВТ</p>
                            <p className='journalColumnsCenterItemDate'>02.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Залік</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>СР</p>
                            <p className='journalColumnsCenterItemDate'>03.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Лаб</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ЧТ</p>
                            <p className='journalColumnsCenterItemDate'>04.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Консульт</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ПТ</p>
                            <p className='journalColumnsCenterItemDate'>05.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Лекція</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ПН</p>
                            <p className='journalColumnsCenterItemDate'>01.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Практика</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ВТ</p>
                            <p className='journalColumnsCenterItemDate'>02.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Залік</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>СР</p>
                            <p className='journalColumnsCenterItemDate'>03.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Лаб</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ЧТ</p>
                            <p className='journalColumnsCenterItemDate'>04.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Консульт</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ПТ</p>
                            <p className='journalColumnsCenterItemDate'>05.05</p>
                        </div>
                    </div>
                    <div className='journalColumnsCenterItem__container'>
                        <div className='journalColumnsCenterItemType'>Консульт</div>
                        <div className='journalColumnsCenterItemDate__container'>
                            <p className='journalColumnsCenterItemDateDay'>ПТ</p>
                            <p className='journalColumnsCenterItemDate'>05.05</p>
                        </div>
                    </div>
                </div>
                <div className='journalColumnsRight__container'>
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
                </div>
                </div>
                <div className='journalRowItem__container'>

                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
                <div className='journalRowItem__container even'>
                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
                <div className='journalRowItem__container'>
                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
                <div className='journalRowItem__container even'>
                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
                <div className='journalRowItem__container'>
                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
                <div className='journalRowItem__container even'>
                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
                <div className='journalRowItem__container'>
                    <div className='journalRowItemCenter__container'>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                        <div className='journalRowItemCenterValue__container'><p className='journalRowItemCenterValue__text'>100</p></div>
                    </div>
                    <div className='journalRowItemRight__container'>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                        <div className='journalRowItemRightValue__container'><p className='journalRowItemRightValue__text'>100</p></div>
                    </div>
                </div>
            </div>
        </section>
        <section className='journalLessonsThemes__section'>
            <h1 className='journalLessonsThemes__title'>Теми заннять</h1>
            <div className='journalLessonsThemes__container'>
                <div className='journalLessonThemeItem__container'>
                    <div className='journalLessonThemeItemDate__container'>
                        <p className='journalLessonThemeItemDate__day'>ВТ</p>
                        <p className='journalLessonThemeItemDate__date'>02.05</p>
                        <p className='journalLessonThemeItemType'>Лекція</p>
                    </div>
                    <p className='journalLessonThemeItem__text'>Заповніть тему заннятя</p>
                </div>
                <div className='journalLessonThemeItem__container'>
                    <div className='journalLessonThemeItemDate__container'>
                        <p className='journalLessonThemeItemDate__day'>ВТ</p>
                        <p className='journalLessonThemeItemDate__date'>02.05</p>
                        <p className='journalLessonThemeItemType'>Лекція</p>
                    </div>
                    <p className='journalLessonThemeItem__text'>Заповніть тему заннятя</p>
                </div>
                <div className='journalLessonThemeItem__container'>
                    <div className='journalLessonThemeItemDate__container'>
                        <p className='journalLessonThemeItemDate__day'>ВТ</p>
                        <p className='journalLessonThemeItemDate__date'>02.05</p>
                        <p className='journalLessonThemeItemType'>Лекція</p>
                    </div>
                    <p className='journalLessonThemeItem__text'>Заповніть тему заннятя</p>
                </div>
                <div className='journalLessonThemeItem__container'>
                    <div className='journalLessonThemeItemDate__container'>
                        <p className='journalLessonThemeItemDate__day'>ВТ</p>
                        <p className='journalLessonThemeItemDate__date'>02.05</p>
                        <p className='journalLessonThemeItemType'>Лекція</p>
                    </div>
                    <p className='journalLessonThemeItem__text'>Заповніть тему заннятя</p>
                </div>
                <div className='journalLessonThemeItem__container'>
                    <div className='journalLessonThemeItemDate__container'>
                        <p className='journalLessonThemeItemDate__day'>ВТ</p>
                        <p className='journalLessonThemeItemDate__date'>02.05</p>
                        <p className='journalLessonThemeItemType'>Лекція</p>
                    </div>
                    <p className='journalLessonThemeItem__text'>Заповніть тему заннятя</p>
                </div>
                <div className='journalLessonThemeItem__container'>
                    <div className='journalLessonThemeItemDate__container'>
                        <p className='journalLessonThemeItemDate__day'>ВТ</p>
                        <p className='journalLessonThemeItemDate__date'>02.05</p>
                        <p className='journalLessonThemeItemType'>Лекція</p>
                    </div>
                    <p className='journalLessonThemeItem__text'>Заповніть тему заннятя</p>
                </div>
            </div>
        </section>
    </div>
}