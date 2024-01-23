import { Button, Modal, Popover, UploadProps } from "antd";
import Upload from "antd/es/upload/Upload";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore"
import { UploadOutlined } from '@ant-design/icons';
import "./editProfileStyles.scss";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { QuestionMarkSvg } from "../../assets/svgs/questionMarkSvg";
import { PasswordInfo } from "../PasswordInfo";
import { endpoints } from "../../consts/endpoints";
import axiosConfig from "../../axiosConfig";
import { getToken } from "../../helpers/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../consts/routes";
import Cookies from "js-cookie";
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import {EyeOutlined} from "@ant-design/icons";

const useEditProfile = () => {
    const user = useUserStore().user;
    const setToken = useUserStore().setToken;
    const setAvatar = useUserStore().setAvatar;
    const localCookie = user.token;
    const cookie = getToken();
    const [newAvatarUrl,setNewAvatarUrl] = useState('');
    const [formError,setFormError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<{new_password:string,new_password_confimation:string,avatar:File}>();
    const onEditClose = () => {
        navigate(routes.myProfile);
    }
    const onSubmit = async () => {
        const newPassword = watch('new_password');
        const newPasswordConfirmation = watch('new_password_confimation');
        const avatar = watch('avatar');
        if(newPassword && newPassword !== newPasswordConfirmation) {
            setFormError('Паролі не співпадають!');
            return;
        }
        if(!newPassword && !avatar){
            setFormError('Ви не змінили дані!');
            return;
        }
        try{
            const queries = [];
            if(avatar){
                queries.push(async () => {
                    const reader = new FileReader();
                    reader.readAsDataURL(avatar);
                    reader.onload = async (result) => {await axiosConfig.post(endpoints.changeAvatar,{avatar:result.target?.result},{headers:{Authorization:localCookie || cookie}});setAvatar(result.target?.result?.toString() || user.avatar);}
                })
                
            }
            if(newPassword){
                queries.push(async () => {
                    const res = await axiosConfig.post(endpoints.changePassword,{user_password:newPassword},{headers:{Authorization:localCookie || cookie}});
                    setToken(res.data.token);
                    if(getToken()){
                        Cookies.set('token',res.data.token);
                    }
                });
            }
            await Promise.all(queries.map(q => q()));
            Cookies.remove('comfirmedPassword');
            onEditClose();
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        if(!Cookies.get('comfirmedPassword')){
            navigate(routes.myProfile);
        }
    },[]);
    
    //@ts-ignore
    const beforeUpload = (file) => {
        setValue('avatar',file);
        setNewAvatarUrl(URL.createObjectURL(file));
    };
    return {onEditClose,beforeUpload,onSubmit,register,handleSubmit,newAvatarUrl,formError,user,errors}
}

export const EditProfile = () => {
    const theme = useThemeStore().theme;
    const {onEditClose,beforeUpload,onSubmit,register,handleSubmit,newAvatarUrl,formError,user,errors} = useEditProfile();
    const [passwordInputType,setPasswordInputType] = useState<Record<number,"password" | "text">>({1:'password',2:'password'});
    const onTogglePassword = (index:number) => {
        setPasswordInputType(prev => ({...prev,[index]:prev[index] === "password" ? "text" : "password"}));
    }

    return <div className={`editProfileMain_container ${theme}`}>
        <h1 className="editProfile_header"><button onClick={onEditClose} className="editProfile_leaveButton"><LeftArrowSvg/></button>Редагування профілю</h1>
        {/* {user.is_active && <h1 className="editProfile_header">Для того щоб активувати особовий запис потрібно змінити пароль.</h1>} */}
        <div className='studentProfileInfo__container editProfileUserInfo'>
            <img className='studentProfile_img studentProfile_img_edit' src={newAvatarUrl || user.avatar || defaultAvatar}/>
            <div className='studentProfileTextInfo__container'>
                <p className='studentProfile__name'>{user.full_name}</p>
                <p className='studentProfile__email'>{user.mailbox_address || `mail@gmail.com`}</p>
                <p className='studentProfile__group'>{user.group_fullname || `Група-00`}</p>
            </div>
        </div>
        <div className="editProfile_section">
            <div className="editProfileChangePhoto_container">
                <Upload beforeUpload={beforeUpload} accept="image/png, image/jpeg">
                    <Button className="uploadButton" icon={<UploadOutlined />}>Загрузити</Button>
                </Upload>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="editProfile_form" autoComplete={"off"}>
                <div className="editProfile_header_container">
                    <h2 className="editProfile_section_header">Змінити пароль </h2>
                    <Popover rootClassName="passwordInfo_popover" placement={'top'} content={<PasswordInfo/>}><div style={{width:'20px',height:'20px'}} className={`questionMark_container ${!!errors.new_password?.message ? 'active' : ''}`}><QuestionMarkSvg/></div></Popover>
                </div>
                <div style={{display:'flex',gap:'20px',width:'100%'}}>
                        <input type={passwordInputType[1]} {...register('new_password',{minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:/^(?=.*[0-9])(?=.*[!@#$%^&*+-/])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,30}$/,message:'Пароль некорректний'}})} className="input editProfile_input" placeholder="Введіть новий пароль" autoComplete={"off"} />
                        <span onClick={() => onTogglePassword(1)} className='passwordEye__button'>{passwordInputType[1] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{color:'white',fontSize:'17px'}} />}</span>
                    </div>
                <div style={{display:'flex',gap:'20px',width:'100%'}}>
                    <input {...register('new_password_confimation',)} className="input editProfile_input" placeholder="Повторіть новий пароль" autoComplete={"off"}/>
                    <span onClick={() => onTogglePassword(2)} className='passwordEye__button'>{passwordInputType[2] === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{color:'white',fontSize:'17px'}} />}</span>
                </div>
                {!!formError && <p className="signIn_errorMessage">{formError}</p>}
                {!!errors.new_password?.message && <p className="signIn_errorMessage">{errors.new_password?.message}</p>}
                <input type={'submit'} className="primary_button" value={'Зберегти зміни'}/>
            </form>
        </div>
    </div>
}