import { useForm } from "react-hook-form";
import { emailPattern } from "../../consts/emailPattern";
import "./styles.scss";



export const ForgotPasswordModal:React.FC<{onClose:() => void}> = ({onClose}) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{errors}
    } = useForm<{mailbox_address:string}>();

    const onSubmit = (data:{mailbox_address:string}) => {
        onClose();
    }
    return <div className="forgotPassword_container">
        <form onSubmit={handleSubmit(onSubmit)} className="forgotPassword_form">
            <h1 className="forgotPassword_header">Забули пароль?</h1>
            <div className="forgotPassword_input_container">
                <h2 className="forgotPassword_subheader">Введіть свою пошту, яка прив’язана до аккаунту</h2>
                <input {...register('mailbox_address',{pattern:{value:emailPattern,message:'Некорректний email!'},required:{value:true,message:'Введіть поштову адресу!'}})} className="input" placeholder="Введіть свою пошту"/>
            </div>
            {!!errors.mailbox_address?.message && <p className='signIn_errorMessage'>{errors.mailbox_address?.message}</p>}
            <p className="forgotPassword_description">
                На цю пошту прийде автоматичний лист із запитом на зміну паролю. Також поки ви не змінете пароль за цим запитом, аккаунт буде недійсний
            </p>
            <input type={'submit'} className="primary_button" value={"Підтвердити запит"}/>
        </form>
    </div>
}