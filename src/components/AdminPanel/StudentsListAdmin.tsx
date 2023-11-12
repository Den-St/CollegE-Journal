import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useThemeController } from "../../hooks/themeController"

export const StudentsListAdmin = () => {
    const theme = useThemeController().theme;
    
    return <div className={`adminStudentListContainer ${theme}`}>
        <section className="studentTitle__container">
            <h1 className="studentTitle">Список студентів</h1>
            <div className="studentFilltersAdminPanel__container">
                <div className="adminPanelStudentList_fillterContainer">
                    <p className="groupFillter">Група</p>
                    <FilterIconSvg/>
                </div>
                <div className="adminPanelStudentList_conrollersContainer">
                    <button className="adminPanelStudentList_add">Додати</button>
                    <button className="adminPanelStudentList_save">Зберити</button>
                </div>
            </div>
        </section>
        <section className="studentList__container">
            <div className="studentItems__container">
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
            </div>
        </section>
    </div>
}