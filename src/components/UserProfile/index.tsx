import { Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { EditProfileSvg } from "../../assets/svgs/editProfileSvg";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { StarSvg } from "../../assets/svgs/starSvg";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import { UserProfileT } from "../../types/userProfile";
import '../MyProfile/studentProfile.scss';
const {Option} = Select;

const useEditLessonGroups = () => {
    const [isOnEditingLG,setIsOnEditingLG] = useState(false);
    const onToggleEditLG = () => {
        setIsOnEditingLG(prev => !prev);
    }

    const onChangeLG = (type:string,value:string) => {

    }
    return {onToggleEditLG,isOnEditingLG,onChangeLG};
}

const useGetUserProfile = () => {
    const [user,setUser] = useState<UserProfileT>();
    const [loading,setLoading] = useState(false);
    const user_id = useParams().id;

    const fetch = async () => {
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.getUser,{user_id});
            setUser(res.data.data);
            document.title = `Профіль студента - ${res.data.data.full_name}`;
            console.log(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch()
    }, [])
    
    return {user,loading,user_id};
}
export const UserProfile = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const from = useSearchParams()[0].get('from');
    const navigate = useNavigate();
    const {onToggleEditLG,isOnEditingLG,onChangeLG} = useEditLessonGroups();
    const {user_id,user,loading} = useGetUserProfile();

    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        <section className='studentProfileMain__container'>
            <div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
                <LinkBack title="Список студентів" goTo={() => !!from ? navigate(from) : navigate(-1)}/>
                {/* <h2 className="subjectsMainTitle"><button onClick={() => !!from ? navigate(from) : navigate(-1)} className={'leftArrowButton'}><LeftArrowSvg/></button>Список студентів</h2> */}
                <div style={{'display':'flex'}}>
                    <div style={{'display':'flex','flexDirection':'column','gap':'60px'}}>
                    <h1 className="header">Профіль студента</h1>
                    <div className='studentProfileLeft__container'>
                        <div className='studentProfileInfo__container'>
                            <img className='studentProfile_img' src={
                                user?.avatar || 
                                defaultAvatar
                            }/>
                            <div className='studentProfileTextInfo__container'>
                                <p className='studentProfile__name'>
                                    {user?.full_name}
                                    {/* {user.security_level !== securityLevels.admin &&  */}
                                    {/* <StarSvg/> */}
                                    {mySecurityLevel === securityLevels.admin && !!user_id && 
                                    <Link to={routes.editUser.replace(':id',user_id)} className='editUserProfile_button'><EditProfileSvg/></Link>}
                                </p>
                                {/* {
                                !!user?.user_group?.group_full_name && 
                                mySecurityLevel === securityLevels.admin || mySecurityLevel === securityLevels.teacher
                                ? <Link to={routes.pickJournalSubject} className='studentProfile__group'>
                                    {user?.user_group?.group_full_name}
                                    </Link> 
                                : <p className='studentProfile__group'>
                                    {user?.user_group?.group_full_name}
                                </p>} */}
                                <p className='studentProfile__group'>
                                    {user?.user_group?.group_full_name}
                                </p>
                                <p className='studentProfile__bio'>
                                    {user?.interests}
                                </p>
                              
                            </div>
                        </div>
                    </div>
                    </div>
                    {
                    mySecurityLevel === securityLevels.admin || mySecurityLevel === securityLevels.teacher
                    && <div style={{'display':'flex','flexDirection':'column','gap':'60px','maxWidth':'500px',width:'50%'}}>
                        <div style={{'display':'flex','gap':'30px'}}><h2 className="header">Додаткова інформація</h2>
                            {mySecurityLevel === securityLevels.admin && <button className={`editUserProfile_button ${isOnEditingLG && `onEditing`}`} style={{'fill':isOnEditingLG ? 'orange' : 'gray'}} onClick={onToggleEditLG}><EditProfileSvg/></button>}
                        </div>
                        <div className="studentProfile_editLessonGroups_container">
                            <div style={{'display':'flex','flexWrap':'wrap','justifyContent':'space-between','rowGap':'30px',}}>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Англ. Мова підгрупа</h3>
                                    {!isOnEditingLG ? <p className="subHeader">Підгрупа А</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('',e)}
                                        // value={createUserWatch('department')}
                                        >
                                        <Option value={"Підгрупа А"} label={"Підгрупа А"}>Підгрупа А</Option>
                                        <Option value={"Підгрупа Б"} label={"Підгрупа Б"}>Підгрупа Б</Option>
                                    </Select>}
                                </div>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Фіз-культура група</h3>
                                    {!isOnEditingLG ? <p className="subHeader">Основна</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('',e)}
                                        // value={createUserWatch('department')}
                                        >
                                        <Option value={"Основна"} label={"Основна"}>Основна</Option>
                                        <Option value={"Додаткова"} label={"Додаткова"}>Додаткова</Option>
                                    </Select>}
                                </div>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Спец. куср Англ. мови</h3>
                                    {!isOnEditingLG ? <p className="subHeader">Вивчає</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('',e)}
                                        // value={createUserWatch('department')}
                                        >
                                        <Option value={"Вивчає"} label={"Вивчає"}>Вивчає</Option>
                                        <Option value={"Не вивчає"} label={"Не вивчає"}>Не вивчає</Option>
                                    </Select>}
                                </div>
                                <div style={{'display':'flex','flexDirection':'column','gap':'10px',width:'50%',maxWidth:'200px'}}>
                                    <h3 className="subSubHeader" style={{'height':'40px'}}>Німецька мова</h3>
                                    {!isOnEditingLG ? <p className="subHeader">Вивчає</p>
                                        : <Select
                                        className="createUserSelect"
                                        placeholder={'Оберіть'}
                                        optionLabelProp="label"
                                        onChange={(e) => onChangeLG('',e)}
                                        // value={createUserWatch('department')}
                                        >
                                        <Option value={"Вивчає"} label={"Вивчає"}>Вивчає</Option>
                                        <Option value={"Не вивчає"} label={"Не вивчає"}>Не вивчає</Option>
                                    </Select>}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </section>
        {
        mySecurityLevel === securityLevels.admin || mySecurityLevel === securityLevels.teacher &&
        <section className='profile_detailedInfo_section'>
            <div className='profile_detailedInfo_dir_container'>
                <h1 className='profile_detailedInfo_dir_header'>Інформація про студента</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Пошта студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.mailbox_address}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер студента</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.phone_number}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата народження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.birth_date}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Місце знаходження</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.location}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Номер батьків</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.parents_phone_number}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Отримання стипендії</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.is_on_scholarships ? 'Отримує стипендію' : 'Не отримує стипендію'}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Форма навчання</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.education_form}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Бюджет/Контракт</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.education_type}</h2>
                </div>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Дата вступу</h2>
                    <h2 className='profile_detailedInfo_item_text'>{user?.admission_date}</h2>
                </div>
            </div>
            <div className='profile_detailedInfo_dir_container' style={{flexDirection:'column'}}>
                <h1 className='profile_detailedInfo_dir_header'>Важливо</h1>
                <div className='profile_detailedInfo_itemContainer'>
                    <h2 className='profile_detailedInfo_item_header'>Цю інформацію не бачать інші студенти, також ви не можете цю інформацію самостійно редагувати</h2>
                </div>
            </div>
        </section>
        }
    </div>
}