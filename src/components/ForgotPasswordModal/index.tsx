import "./styles.scss";

export const ForgotPasswordModal = () => {
    return <div className="forgotPassword_container">
        <form className="forgotPassword_form">
            <h1 className="forgotPassword_header">Забули пароль?</h1>
            <div className="forgotPassword_input_container">
                <h2 className="forgotPassword_subheader">Введіть свою пошту, яка прив’язана до аккаунту</h2>
                <input className="input" placeholder="Введіть свою пошту"/>
            </div>
            <p className="forgotPassword_description">
                На цю пошту прийде автоматичний лист із запитом на зміну паролю. Також поки ви не змінете пароль за цим запитом, аккаунт буде недійсний
            </p>
            <input type={'submit'} className="primary_button" value={"Підтвердити запит"}/>
        </form>
    </div>
}