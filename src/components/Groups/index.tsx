import { useThemeStore } from "../../store/themeStore"
import './groupsStyles.scss';

export const Groups = () => {
    const theme = useThemeStore().theme;

    return <div className={`groupsMain__container ${theme}`}>
        <section className="groupsTop__container">
            <h1 className="groupTitle">Список груп</h1>
            <div className="groupsFillters__container">
                <p className="groupYearSelectFilter">Рік</p>
                <p className="groupSpecializationFilter">Спеціальність</p>
            </div>
        </section>

        <section className="groupsCourses__container">
            <div className="groupsCourseItem__container">
                <h2 className="groupsCourseItem__title">Перший курс</h2>
                <div className="groupCourseItemGroups__container">
                    <div className="groupItem__container">
                        3-11
                    </div>
                     <div className="groupItem__container">
                        3-12
                    </div>
                     <div className="groupItem__container">
                        КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                </div>
            </div>
            <div className="groupsCourseItem__container">
                <h2 className="groupsCourseItem__title">Перший курс</h2>
                <div className="groupCourseItemGroups__container">
                    <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                </div>
            </div>
            <div className="groupsCourseItem__container">
                <h2 className="groupsCourseItem__title">Перший курс</h2>
                <div className="groupCourseItemGroups__container">
                    <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                </div>
            </div>
            <div className="groupsCourseItem__container">
                <h2 className="groupsCourseItem__title">Перший курс</h2>
                <div className="groupCourseItemGroups__container">
                    <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                </div>
            </div>
            <div className="groupsCourseItem__container">
                <h2 className="groupsCourseItem__title">Перший курс</h2>
                <div className="groupCourseItemGroups__container">
                    <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                     <div className="groupItem__container">
                     КН-11
                    </div>
                </div>
            </div>
        </section>
    </div>
}