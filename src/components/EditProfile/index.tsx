import { Button, Modal, Popover } from "antd";
import Upload from "antd/es/upload/Upload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore"
import { UploadOutlined } from '@ant-design/icons';
import "./editProfileStyles.scss";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { QuestionMarkSvg } from "../../assets/svgs/questionMarkSvg";
import { PasswordInfo } from "../PasswordInfo";

type Props = {
    onEditClose:() => void
}

export const EditProfile:React.FC<Props> = ({onEditClose}) => {
    const user = useUserStore().user;
    const theme = useThemeStore().theme;
    const [formError,setFormError] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<{new_password:string,new_password_confimation:string,avatar:string}>();

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
            // const res = await axiosConfig(endpoints.changeUserInfo);
            onEditClose();
        }catch(err){
            console.error(err);
        }
    }

    return <div className={`editProfileMain_container ${theme}`}>
        <h1 className="editProfile_header"><button onClick={onEditClose} className="editProfile_leaveButton"><LeftArrowSvg/></button>Редагування профілю</h1>
        <div className='studentProfileInfo__container editProfileUserInfo'>
            <img className='studentProfile_img' src={user.avatar || defaultAvatar}/>
            <div className='studentProfileTextInfo__container'>
                <p className='studentProfile__name'>{user.full_name}</p>
                <p className='studentProfile__email'>{user.mailbox_address || `mail@gmail.com`}</p>
                <p className='studentProfile__group'>{user.group_fullname || `Група-00`}</p>
            </div>
        </div>
        <div className="editProfile_section">
            <div className="editProfileChangePhoto_container">
                <Upload>
                    <Button className="uploadButton" icon={<UploadOutlined />}>Загрузити</Button>
                </Upload>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="editProfile_form">
                <div className="editProfile_header_container">
                    <h2 className="editProfile_section_header">Змінити пароль </h2>
                    <Popover rootClassName="passwordInfo_popover" placement={'top'} content={<PasswordInfo/>}><div style={{width:'20px',height:'20px'}} className={`questionMark_container ${!!errors.new_password?.message ? 'active' : ''}`}><QuestionMarkSvg/></div></Popover>
                </div>
                <input {...register('new_password',{minLength:{value:8,message:'Пароль має бути не меншим за 8 символів!'},maxLength:{value:30,message:'Пароль має бути не більшим за 30 символів!'},pattern:{value:/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,30}$/,message:'Пароль некорректний'}})} className="input editProfile_input" placeholder="Введіть новий пароль"/>
                <input {...register('new_password_confimation',)} className="input editProfile_input" placeholder="Повторіть новий пароль"/>
                {!!formError && <p className="signIn_errorMessage">{formError}</p>}
                {!!errors.new_password?.message && <p className="signIn_errorMessage">{errors.new_password?.message}</p>}
                <input type={'submit'} className="primary_button" value={'Зберегти зміни'}/>
            </form>
        </div>
    </div>
}