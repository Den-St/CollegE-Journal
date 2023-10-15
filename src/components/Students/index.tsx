import { Link } from 'react-router-dom';
import { FilterIconSvg } from '../../assets/svgs/filterIconSvg';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { useThemeStore } from '../../store/themeStore';
import './studentsStyle.scss';

export const Students = () => {
    const theme = useThemeStore().theme;

    return <div className={`main__container ${theme}`}>
            <section className="studentTitle__container">
                <h1 className="studentTitle">Список студентів</h1>
                <div className="studentFillters__container">
                    <p className="groupFillter">Група</p>
                    <FilterIconSvg/>
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