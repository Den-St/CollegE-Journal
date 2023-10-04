import { useThemeStore } from '../../store/themeStore';
import './journalStyles.scss';

export const Journal = () => {
    const theme = useThemeStore().theme;

    return <div className={`journalMain__container ${theme}`}>
        <section className='journalTop__container'>
            <h1 className='journal__title'>Журнал</h1>
            <div className='journalFillters__container'>
                <p className='journalFilterItem'>Група</p>
                <p className='journalFilterItem'>Місяць</p>
                <p className='journalFilterItem'>Предмет</p>
            </div>
        </section>

        <section className='journal__container'>
            <div className='journalColumns__container'>
                <div className='journalColumnsLeft__container'>
                    <h1 className='journalColumnsLeft__title'>Цитати на кожен день</h1>
                    <p className='journalColumnsLeft__text'>" У жовтні кожного року проходить акція«відрахуй випускника» "</p>
                </div>
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
                </div>
                <div className='journalColumnsRight__container'>
                    <div className='journalColumnsRightItem__container'>
                        <div className='journalColumnsRightItemType'>Аттестація</div>
                        <div className='journalColumnsRightItemMonth'>
                            Травень
                        </div>
                    </div>
                    <div className='journalColumnsRightItem__container'>
                        <div className='journalColumnsRightItemType'>Коригуюч</div>
                        <div className='journalColumnsRightItemMonth'>
                            Травень
                        </div>
                    </div>
                </div>
            </div>
            <div className='journalRows__container'>
                <div className='journalRowItem__container'>
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
                    <div className='journalRowItemLeft__container'>
                        <p className='journalRowItemLeft__number'>1.</p>
                        <p className='journalRowItemLeft__name'>Барвінок О. С.</p>
                    </div>
                    <div className='journalRowItemCenter__container'>
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
    </div>
}