import { Select } from "antd";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { emailPattern } from "../../consts/emailPattern";
import { routes } from "../../consts/routes";
import { useCreateTeach } from "../../hooks/createTeacher";
import { useThemeStore } from "../../store/themeStore";
import "../EditGroup/editGroupStyles.scss";
const {Option} = Select;
const userErrorCodesToMessages:Record<number,string> = {
    0:'Користувач з такою поштовою адресою вже існує!'
}
export const CreateTeacher = () => {
    const {handleSubmit,onCreateUser,createUserErrorCode,createUserFormErrors,createUserRegister,createUserSetValue,createUserWatch,createUserLoading} = useCreateTeach();
    const theme = useThemeStore().theme;

    return <div className={`editGroupMain_container ${theme}`}>
        <h1 className="editGroupHeader"><Link className="editProfile_leaveButton"  to={routes.adminPanel + '?section=groups'}><LeftArrowSvg/></Link>Створення викладача</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  
                    // {...createUserRegister('full_name',{required:{value:true,message:'Введіть ПІБ студента!'},minLength:{value:10,message:'ПІБ студента занадто коротке!'},maxLength:{value:40,message:'ПІБ студента занадто велике!'},pattern:{value:/^[а-яА-Я\s\-\і\ґ\ї]*$/,message:'Некорректне ПІБ!'}})} 
                    className="createUser__input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта викладача</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})} type={'email'} 
                    className="createUser__input" placeholder='Введіть пошту викладача'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Номер викладача</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:false,pattern:{value:emailPattern,message:'Не корректний email!'}})} type={'email'} 
                    className="createUser__input" placeholder='Введіть номер викладача'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Циклова комісія</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})} type={'email'} 
                    className="createUser__input" placeholder='Введіть інтереси викладача'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
            <div className="createUserSelect__container" style={{width:'45%'}}>
                    <label className="createUserInput__label">Посада</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть посаду викладача'}
                            optionLabelProp="label"
                            // {...createUserRegister('education_type',{required:true})}
                            // onChange={(e) => createUserSetValue('education_type',e)}
                            // value={createUserWatch('education_type')}
                            >   
                            <Option value={"Посада 1"} label={"Посада 1"}>Посада 1</Option>
                            <Option value={"Посада 2"} label={"Посада 2"}>Посада 2</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="createUserInput__label">Додаткова посада</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть додаткова посада викладача'}
                            optionLabelProp="label"
                            // {...createUserRegister('education_type',{required:true})}
                            // onChange={(e) => createUserSetValue('education_type',e)}
                            // value={createUserWatch('education_type')}
                            >   
                            <Option value={"Посада 1"} label={"Посада 1"}>Посада 1</Option>
                            <Option value={"Посада 2"} label={"Посада 2"}>Посада 2</Option>
                        </Select>
                    </div>
                </div>
            </div>
            {/* <div className="createUserFormSelects__container"> */}
            {/* </div> */}
            {//@ts-ignore
            // Object.keys(createUserFormErrors).map(key => !!createUserFormErrors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors[key]?.message}</p>)
            }
            {/* {!!createUserFormErrors.full_name?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.full_name?.message}</p>}
            {!!createUserFormErrors.mailbox_address?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.mailbox_address?.message}</p>}
            {!!createUserFormErrorMessage && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrorMessage}</p>} */}
            {/* {createUserErrorCode !== undefined && <p style={{width:'fit-content'}} className="signIn_errorMessage">{userErrorCodesToMessages[createUserErrorCode]}</p>} */}
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Зареєструвати"} disabled={createUserLoading}/>
            </div>
        </form>
    </div>
}