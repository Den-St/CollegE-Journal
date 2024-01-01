import { GoogleIconSvg } from '../../assets/svgs/googleIconSvg';
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import {EyeOutlined} from "@ant-design/icons";
import './loginStyles.scss';
import {Input} from 'antd';
import { useThemeStore } from '../../store/themeStore';
import { useEffect, useState } from 'react';
import { useSignIn } from '../../hooks/signIn';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { routes } from '../../consts/routes';

const statusCodes:Record<number,string> = {
    0:'Нажаль дані введені не корректно, перевірте їх та спробуйте ще раз!',
}

export const SignIn = () => {
    const theme = useThemeStore().theme;
    useEffect(() => {
        document.title = "Вхід до акаунту";
    },[]);
    const [passwordInputType,setPasswordInputType] = useState<"password" | "text">("password");
    const onTogglePassword = () => {
        setPasswordInputType(prev => prev === "password" ? "text" : "password");
    }
    const {onLogin,status,loading,setRemember} = useSignIn();
    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<{mailbox_address:string,user_password:string}>();

    if(status === 1) return <Navigate to={routes.homePage}/>

    return <>
    <div className={`signIn__container ${theme}`}>
        <div className='signIn__wrapper'>
            <h1 className="signIn__header">Вхід</h1>
            <form onSubmit={handleSubmit(onLogin)} className="signIn__form" autoComplete={'off'}>
                <div className="signInInput__container">
                    <input autoComplete="off"  {...register('mailbox_address',)} type={'email'}  placeholder={"Username@gmail.com"} className={'email__input'}/>
                </div>
                <div className="signInInput__container">
                    <input autoComplete="off"  {...register('user_password')} type={passwordInputType} placeholder={"Password"} className={'password__input'}/>
                    <span onClick={onTogglePassword} className='passwordEye__button'>{passwordInputType === "password" ? <ToggleHidePasswordEye /> : <EyeOutlined style={{fontSize:'17px'}} />}</span>
                </div>
                <div className="signInSettings__container">
                    <div className="rememberMe__container">
                        <input autoComplete="off"  type='checkbox' onChange={(e) => setRemember(e.target.checked)} className="rememberMe__checkbox"/>
                        <p className="rememberMe__title">Запам'ятати мене</p>
                    </div>
                    <p className="forgotPassword">Забули пароль?</p>
                </div>
                {status !== undefined && <p className='signIn_errorMessage'>{statusCodes[status]}</p>}
                <input autoComplete="off"  disabled={loading} type={'submit'} className="signIn__button" value={'Увійти'}/>
            </form>
            <button className='signInWithGoogle__button'>
                <span className='signInWithGoogle__icon'>
                    <GoogleIconSvg/>
                </span>
                <span className='signInWithGoogle__title'>
                    Увійти через Google
                </span>
            </button>
            <div className='noAccount__container'>
                <span className='noAccount__text'>Досі немає облікового запису?</span>
                <span className='noAccount__text'>Будь ласка, отримайте дані входу у куратора, для підтвердження облікового запису.</span>
            </div>
        </div>
    </div></>
}