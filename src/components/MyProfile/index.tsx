    import { Modal } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DiagonalArrowSvg } from '../../assets/svgs/diagonalArrowSvg';
import { EditProfileSvg } from '../../assets/svgs/editProfileSvg';
import axiosConfig from '../../axiosConfig';
import { defaultAvatar } from '../../consts/defaultAvatar';
import { endpoints } from '../../consts/endpoints';
import { routes } from '../../consts/routes';
import { securityLevels } from '../../consts/securityLevels';
import { getToken } from '../../helpers/auth';
import { useThemeStore } from '../../store/themeStore';
import { useUserStore } from '../../store/userStore';
import { TeacherSchedule } from './LessonsSchedule';
import { LessonsScheduleStudents } from './LessonsSchedule/studentSchedule';
import './studentProfile.scss';
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import {EyeOutlined} from "@ant-design/icons";
import { scheduleTimings } from '../../consts/scheduleTimings';
import { StarSvg } from '../../assets/svgs/starSvg';
import { useGetGroup } from '../../hooks/getGroup';
import { RobotSvg } from '../../assets/svgs/robotSvg';

const useTryEditProfile = () => {
    const navigate = useNavigate();
    const initEdit = useSearchParams()[0].get('edit');
    const [onTryEditing,setOnTryEditing] = useState(!!initEdit || false);
    const user = useUserStore().user;
    const localCookie = user.token;
    const cookie = getToken();
    const [status,setStatus] = useState<number>();

    const onTryEdit = () => {
        setOnTryEditing(true);
    }
    const onTryEditClose = () => {
        setOnTryEditing(false);
    }
    const onRealEdittingOpen = async () => {
        Cookies.set('comfirmedPassword','true',{expires:new Date(new Date().getTime() + 10 * 1000)});
        navigate(routes.editProfile);
    }
    const onSubmitTryEditing = async (data:{user_password:string}) => {
        try{
            try{
                const res = await axiosConfig.post(endpoints.login,{user_password:data.user_password,mailbox_address:user.mailbox_address},{headers:{Authorization:localCookie || cookie}});
                onTryEditClose();
                onRealEdittingOpen();
            }catch(err){
                setStatus(0);
                console.error(err);
            }
        }catch(err){
            console.error(err);
        }
    }
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<{user_password:string,}>();

    return {onTryEditing,onTryEdit,onSubmitTryEditing,register,handleSubmit,onTryEditClose,errors,status}
}


export const MyProfile = () => {
    const [passwordInputType,setPasswordInputType] = useState<"password" | "text">("password");
    const onTogglePassword = () => {
        setPasswordInputType(prev => prev === "password" ? "text" : "password");
    }
    const studentLinks = [
        {
            label:'Перегляд оцінок',
            link:routes.pickJournalSubject
        },
        {
            label:'Домашнє завдання',
            link:'#'
        },
    ];
    
    const teacherLinks = [
        {
            label:'Журнал оцінок',
            link:routes.groups
        },
        {
            label:'Завантажити завдання',
            link:'#'
        },
    ];
    const theme = useThemeStore().theme;
    const user = useUserStore().user;
    const {onTryEditing,onTryEdit,onSubmitTryEditing,register,handleSubmit,onTryEditClose,errors,status} = useTryEditProfile();
    
    useEffect(() => {
        document.title = 'Мій профіль';
    },[]);
    
    return <div className={`studentProfile__container ${theme}`}>
        <section className='studentProfileMain__container'>
            <div className='studentProfileLeft__container'>
                <div className='studentProfileInfo__container'>
                    <img className='studentProfile_img' src={user.avatar || defaultAvatar}/>
                    <div className='studentProfileTextInfo__container'>
                        <div className='studentProfile__name_container'>
                            <p className='studentProfile__name'>{user.full_name}</p>
                            {/* {user.security_level !== securityLevels.admin &&  */}
                            {/* <StarSvg/> */}
                            <button className='editUserProfile_button' onClick={onTryEdit}><EditProfileSvg/></button>
                        </div>
                        {/* <p className='studentProfile__email'>{user.mailbox_address || `mail@gmail.com`}</p> */}
                        {!!user?.user_group?.group_full_name && 
                        user.security_level === securityLevels.student
                        ? <Link to={routes.myGroup} className='studentProfile__group'>{user?.user_group?.group_full_name}</Link>
                        : (user.security_level === securityLevels.teacher || user.security_level === securityLevels.admin) && <Link to={routes.groups} className='studentProfile__group'>{user?.user_group?.group_full_name}</Link> 
                        }
                        <p className='studentProfile__bio'>{user.interests || ``}</p>
                    </div>
                </div>
                <div className='studentProfileTabs__container'>
                    {user.security_level === securityLevels.student ? studentLinks.map((link) =>
                        <Link to={link.link} key={link.label} className={`studentProfileTab__button`}>
                                {link.label} {DiagonalArrowSvg()}
                        </Link>)
                    : teacherLinks.map((link) =>
                        <Link to={link.link} key={link.label} className={`studentProfileTab__button`}>
                            {link.label} {DiagonalArrowSvg()}
                        </Link>)}
                </div>
            </div>
            {user.security_level === securityLevels.student ? <></>
                :   <div className='lessonsScheduleDayLessons__container'>
                    <h1 className='header' style={{'marginBottom':'10px'}}>Час проведення пар</h1>
                    <div className="lessonsScheduleDayLessonItem__container">
                        <p className="lessonsScheduleLessonNumber"></p>
                        <p className="lessonsScheduleLessonStart">Початок</p>
                        <p className="lessonsScheduleLessonEnd">Кінець</p>
                    </div>
                    {scheduleTimings.map((timing,i) => 
                        <div key={timing.id} className="lessonsScheduleDayLessonItem__container">
                            <p className="lessonsScheduleLessonNumber">{i + 1}</p>
                            <p className="lessonsScheduleLessonStart" style={{width:'100px'}}>{timing.start}</p>
                            <p className="lessonsScheduleLessonEnd">{timing.end}</p>
                        </div>
                    )}
                </div>
                }
        </section>
        {user.security_level === securityLevels.student ? <LessonsScheduleStudents/> : <TeacherSchedule/>}
        {user.security_level === securityLevels.student && 
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
            <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                <h1 className='profile_detailedInfo_dir_header'>Інформація про студента</h1>
                <div className='profile_detailedInfo_dir_container'>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Пошта студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.mailbox_address}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.phone_number}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата народження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.birth_date?.toLocaleString().split(',')[0] || ''}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Місце знаходження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.location}</h2>
                </div>
                {/* <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Отримання стипендії</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.}</h2>
                </div> */}
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Форма навчання</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.education_form}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Бюджет/Контракт</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user.education_type}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата вступу</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.admission_date?.toLocaleString().split(',')[0] || ''}</h2>
                </div>
                </div>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container_important' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>}
        {user.security_level === securityLevels.teacher && 
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
                <div style={{'display':'flex','flexDirection':'column','gap':'20px'}}>
                    <h1 className='profile_detailedInfo_dir_header'>Інформація про викладача</h1>
                    <div className='profile_detailedInfo_dir_container'>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Пошта викладача</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.mailbox_address}</h2>
                        </div>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Номер викладача</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.phone_number}</h2>
                        </div>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Посада</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.job_title}</h2>
                        </div>
                        <div className='profile_detailedInfo_itemContainer'>
                            <h2 className='profile_detailedInfo_item_header'>Додаткова посада</h2>
                            <h2 className='profile_detailedInfo_item_text'>{user.additional_job_title}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container_important' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>}
        <Modal centered open={onTryEditing} onCancel={onTryEditClose} footer={false} rootClassName={'tryEditProfileModal'}>
            <div className="editProfileModal_container">
                <h1 className="editProfileModal_header">{user.is_active ? `Для редагування профілю треба ввести пароль` : 'Для активації особового запису потрібно змінити пароль'}</h1>
                <form autoComplete={"off"} onSubmit={handleSubmit(onSubmitTryEditing)} className="editProfileModal_form">
                    <div style={{display:'flex',gap:'20px',width:'100%',position:'relative'}}>
                        <input style={{width:"100%"}} {...register('user_password',{required:{value:true,message:'Нажаль дані введені не коректно, перевірте їх та спробуйте ще раз!'}})} placeholder="Введіть теперішній пароль" className="input" type={passwordInputType}/>
                        <span onClick={onTogglePassword} style={{'position':'absolute','right':'25px','top':'22px','width':'unset'}} className='passwordEye__button'>{passwordInputType === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{fontSize:'17px'}} />}</span>
                    </div>
                    {!!errors.user_password?.message && <p className="signIn_errorMessage">{errors.user_password?.message}</p>}
                    {status === 0 && <p className="signIn_errorMessage">Нажаль дані введені не корректно, перевірте їх та спробуйте ще раз!</p>}
                    <div className="editFormButtons_container">
                        <input style={{'width':'271px'}} autoComplete={"off"} type={'submit'} value={'Далі'} className="primary_button"/>
                        <span style={{'width':'149px','marginRight':'28px'}} className="forgotPassword">Забув пароль</span>
                    </div>
                </form>
                <button className="primary_button" style={{'width':'271px'}} onClick={onTryEditClose}>Повернутися</button>
            </div>
        </Modal>
    </div>
}