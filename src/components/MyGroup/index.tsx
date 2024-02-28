import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes"
import { useUserStore } from "../../store/userStore";

const useGetMyGroup = () => {
    const [students,setStudents] = useState([]);
    const [loading,setLoading] = useState(false);
    const token = useUserStore().user.token;

    const fetch = async () => {
        try{
            setLoading(true);
            const res = await axiosConfig.get(endpoints.myGroup,{headers:{Authorization:token}});
            setStudents(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    },[]);

    return {students,loading};
}

export const MyGroup = () => {
    const navigate = useNavigate();
    // const {students,loading} = useGetMyGroup();

    return <div style={{padding:'229px 7% 0',display:'flex',gap:'60px',flexDirection:'column'}}>
        <LinkBack title={'Профіль'} route={routes.myProfile}/>
        <h2 className="subjectsMainTitle">Мої одногрупники</h2>
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