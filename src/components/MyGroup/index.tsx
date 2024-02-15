import { Link, useNavigate } from "react-router-dom"
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { routes } from "../../consts/routes"

export const MyGroup = () => {
    const navigate = useNavigate();
    return <div style={{padding:'229px 7% 0',display:'flex',gap:'60px',flexDirection:'column'}}>
        <h2 className="subjectsMainTitle"><button onClick={() => navigate(-1)} className={'leftArrowButton'}><LeftArrowSvg/></button>Мої одногрупники</h2>
        <section className="studentList__container">
            <div className="studentItems__container">
            <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Ім'я Прізвище По батькові</p>
                    </div>
                    <Link className="studentButton" to={routes.userProfile.replace(':id', '1')}>Перейти</Link>
                </div> 
            </div>
        </section>
    </div>
    
}