import { GoogleIconSvg } from '../../assets/svgs/googleIconSvg';
import { ToggleHidePasswordEye } from '../../assets/svgs/toogleHidePasswordEye';
import './loginStyles.scss';
import {Input} from 'antd';
import {signInBackgroundCorner} from '../../assets/svgs/signInBackgroundCorner';

export const SignIn = () => {
    return <>
    <div className='signIn__container'>
        <div className='signIn__wrapper'>
            <h1 className="signIn__header">Вхід</h1>
            <form className="signIn__form" autoComplete={'off'}>
                <div className="signInInput__container">
                    <input type={'email'} autoComplete={'false'}  placeholder={"Username@gmail.com"} className={'email__input'}/>
                </div>
                <div className="signInInput__container">
                    <input type={'password'} autoComplete={'false'} placeholder={"Password"} className={'password__input'}/>
                    <span className='passwordEye__button'><ToggleHidePasswordEye/></span>
                </div>
                <div className="signInSettings__container">
                    <div className="rememberMe__container">
                        <Input type='checkbox' className="rememberMe__checkbox"/>
                        <p className="rememberMe__title">Запам'ятати мене</p>
                    </div>
                    <p className="forgotPassword">Забули пароль?</p>
                </div>
                <button className="signIn__button">Увійти</button>
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