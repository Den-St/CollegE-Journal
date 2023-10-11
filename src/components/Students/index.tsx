import { Link } from 'react-router-dom';
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
                    <svg className="fillterImg" xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                        <path d="M1 1.5H19" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 6.5H15" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 11.5H11" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 16.5H7" stroke-width="2" stroke-linecap="round"/>
                    </svg>
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