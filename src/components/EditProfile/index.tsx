import { Button, Modal } from "antd";
import Upload from "antd/es/upload/Upload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { endpoints } from "../../consts/endpoints";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore"
import { UploadOutlined } from '@ant-design/icons';
import "./editProfileStyles.scss";

type Props = {
    onEditClose:() => void
}

export const EditProfile:React.FC<Props> = ({onEditClose}) => {
    const user = useUserStore().user;
    const theme = useThemeStore().theme;
    const [onModal,setOnModal] = useState(false);
    const [formError,setFormError] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<{new_password:string,new_password_confimation:string,old_password:string,avatar:string}>();
    const onOpenModal = () => {
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
        setFormError('');
        setOnModal(true);
    }
    const onCloseModal = () => {
        setOnModal(false);
    }
    const onSubmit = async () => {
        try{
            // const res = await axiosConfig(endpoints.changeUserInfo);
            onCloseModal();
        }catch(err){
            console.error(err);
        }
    }

    return <div className={`editProfileMain_container ${theme}`}>
        <h1 className="editProfile_header">Редагування профілю</h1>
        <div className='studentProfileInfo__container editProfileUserInfo'>
            <img className='studentProfile_img' src={user.avatar || defaultAvatar}/>
            <div className='studentProfileTextInfo__container'>
                <p className='studentProfile__name'>{user.full_name}</p>
                <p className='studentProfile__email'>{user.mailbox_adress || `mail@gmail.com`}</p>
                <p className='studentProfile__group'>{user.group_fullname || `Група-00`}</p>
            </div>
        </div>
        <div className="editProfile_section">
            <div className="editProfileChangePhoto_container">
                <Upload>
                    <Button className="uploadButton" icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </div>
            <form className="editProfile_form">
                <h2 className="editProfile_section_header">Змінити пароль</h2>
                <input {...register('new_password')} className="input editProfile_input" placeholder="Введіть новий пароль"/>
                <input {...register('new_password_confimation')} className="input editProfile_input" placeholder="Повторіть новий пароль"/>
                {!!formError && <p className="signIn_errorMessage">{formError}</p>}
                <span onClick={onOpenModal} className="primary_button">Зберегти зміни</span>
            </form>
        </div>
        <Modal open={onModal} onCancel={onCloseModal} footer={false} className={'editProfileModal'}>
            <div className="editProfileModal_container">
                <h1 className="editProfileModal_header">Для редагування профілю треба ввести пароль</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="editProfileModal_form">
                    <input {...register('old_password',{required:{value:true,message:'Ви не ввели пароль!'}})} placeholder="Введіть теперішній пароль" className="input"/>
                    <div className="editFormButtons_container">
                        <input type={'submit'} value={'Далі'} className="primary_button"/>
                        <span className="forgotPassword">Забули пароль?</span>
                    </div>
                    {!!errors.old_password?.message && <p className="signIn_errorMessage">{errors.old_password?.message}</p>}
                </form>
                <button className="primary_button" onClick={onCloseModal}>Повернутися</button>
            </div>
        </Modal>
    </div>
}