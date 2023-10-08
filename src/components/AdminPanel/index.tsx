import { ExclamationMarkMessage } from "../../assets/svgs/exclamationMarkMessage";
import { ScheduleSvg } from "../../assets/svgs/scheduleSvg";
import { TwoPeopleSvg } from "../../assets/svgs/twoPeopleSvg";
import { useThemeStore } from "../../store/themeStore";
import "./adminPanelStyles.scss";

export const AdminPanel = () => {
    const theme = useThemeStore().theme;

    return <div className={`adminPanelMain__container ${theme}`}>
        <h1 className={"adminPanelMain__title"}>Кабінет Адміністратора</h1>
        <section className={"adminPanel__container"}>
            <h2 className={"adminPanel__title"}>Панель адміністратора</h2>
            <div className={"adminPanelControllers__container"}>
                <div className={"adminPanelControllerItem__container"}>
                    <p className={"adminPanelControllers__title"}>
                        Налаштування розклада
                    </p>
                    <ScheduleSvg/>
                </div>
                <div className={"adminPanelControllerItem__container"}>
                    <p className={"adminPanelControllers__title"}>
                        Налаштування групп
                    </p>
                    <TwoPeopleSvg/>
                </div>
                <div className={"adminPanelControllerItem__container"}>
                    <p className={"adminPanelControllers__title"}>
                        Новини та оголошення
                    </p>
                    <ExclamationMarkMessage/>
                </div>
            </div>
        </section>
        <section className="adminPanelStats__container">
            <h2 className={"adminPanel__title"}>Статистика</h2>
            <div className="adminPanelStatsBlocks__container">
                <div className="adminPanelStatBlock__container">
                    <h3 className="adminPanelStatName">Кількість відвідувань сайту</h3>
                    <div className="adminPanelStatsItems__container">
                        <div className="adminPanelStatItemDay__container">
                        0000 / день
                        </div>
                        <div className="adminPanelStatItem__container">
                        0000 / тиждень
                        </div>
                        <div className="adminPanelStatItem__container">
                        0000 / місяць
                        </div>
                    </div>
                </div>
                <div className="adminPanelStatBlock__container">
                    <h3 className="adminPanelStatName">Карта відвідування сайту</h3>
                    <div className="adminPanelStatsItem__container">
                        <p className="adminPanelStatItemName">Оцінки</p>
                        <p className="adminPanelStatItemWeek">0000 / Тиждень</p>
                        <p className="adminPanelStatItemMonth">0000 / Місяць</p>
                    </div>
                    <div className="adminPanelStatsItem__container">
                        <p className="adminPanelStatItemName">Завдання</p>
                        <p className="adminPanelStatItemWeek">0000 / Тиждень</p>
                        <p className="adminPanelStatItemMonth">0000 / Місяць</p>
                    </div>
                    <div className="adminPanelStatsItem__container">
                        <p className="adminPanelStatItemName">Розклад</p>
                        <p className="adminPanelStatItemWeek">0000 / Тиждень</p>
                        <p className="adminPanelStatItemMonth">0000 / Місяць</p>
                    </div>
                    <div className="adminPanelStatsItem__container">
                        <p className="adminPanelStatItemName">Новини</p>
                        <p className="adminPanelStatItemWeek">0000 / Тиждень</p>
                        <p className="adminPanelStatItemMonth">0000 / Місяць</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
}    
