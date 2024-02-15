import { Select } from "antd";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { emailPattern } from "../../consts/emailPattern";
import { routes } from "../../consts/routes";
import { useCreateTeacher } from "../../hooks/createTeacher";
import { useThemeStore } from "../../store/themeStore";
import "../EditGroup/editGroupStyles.scss";
import "../Teachers/teachersStyles.scss";

const {Option} = Select;
const userErrorCodesToMessages:Record<number,string> = {
    0:'Користувач з такою поштовою адресою вже існує!'
}
export const CreateTeacher = () => {
    const {handleSubmit,onCreateUser,createUserErrorCode,createUserFormErrors,createUserRegister,createUserSetValue,createUserWatch,createUserLoading} = useCreateTeacher();
    const theme = useThemeStore().theme;

    return <div className={`editGroupMain_container ${theme}`}>
        <h1 className="editGroupHeader"><Link className="editProfile_leaveButton"  to={routes.adminPanel + '?section=groups'}><LeftArrowSvg/></Link>Створення викладача</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  
                    {...createUserRegister('full_name',{required:{value:true,message:'Введіть ПІБ викладача!'},minLength:{value:10,message:'ПІБ викладача занадто коротке!'},maxLength:{value:40,message:'ПІБ викладача занадто велике!'},pattern:{value:/^[а-яА-Я\s\-\і\ґ\ї\є\І\Ґ\Ї\Є]*$/,message:'Некорректне ПІБ!'}})} 
                    className="createUser__input" placeholder='Введіть ПІБ викладача'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта викладача</label>
                    <input autoComplete="off" 
                    {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})} type={'email'} 
                    className="createUser__input" placeholder='Введіть пошту викладача'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Номер викладача</label>
                    <input autoComplete="off" 
                    {...createUserRegister('phone_number',{required:{value:true,message:'Введіть номер викладача!'},minLength:{value:10,message:'Некорректний номер викладача!'},})}
                    className="createUser__input" placeholder='Введіть номер викладача'/>
                </div>
                <div className="createUserSelect__container" style={{width:'50%'}}>
                    <label className="createUserInput__label">Циклова комісія</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть циклову комісію'}
                            optionLabelProp="label"
                            {...createUserRegister('department',{required:true})}
                            onChange={(e) => createUserSetValue('department',e)}
                            value={createUserWatch('department')}
                            >   
                            <Option value={"Циклова комісія іноземних мов"} label={"Циклова комісія іноземних мов"}>Циклова комісія іноземних мов</Option>
                            <Option value={"Циклова комісія інформаційних технологій"} label={"Циклова комісія інформаційних технологій"}>Циклова комісія інформаційних технологій</Option>
                            <Option value={"Циклова комісія гуманітарної та соціально-економічної підготовки"} label={"Циклова комісія гуманітарної та соціально-економічної підготовки"}>Циклова комісія гуманітарної та соціально-економічної підготовки</Option>
                            <Option value={"Циклова комісія телекомунікацій та радіотехніки"} label={"Циклова комісія телекомунікацій та радіотехніки"}>Циклова комісія телекомунікацій та радіотехніки</Option>
                            <Option value={"Циклова комісія природничо-матетматичної підготовки"} label={"Циклова комісія природничо-матетматичної підготовки"}>Циклова комісія природничо-матетматичної підготовки</Option>
                            <Option value={"Інше"} label={"Інше"}>Інше</Option>
                        </Select>
                    </div>
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
                            {...createUserRegister('job_title',{required:false})}
                            onChange={(e) => createUserSetValue('job_title',e)}
                            value={createUserWatch('job_title')}
                            defaultValue={'Студент'}
                            >   
                            <Option value={"Студент"} label={"Студент"}>Студент</Option>
                            {/* <Option value={"Посада 2"} label={"Посада 2"}>Посада 2</Option> */}
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="createUserInput__label">Додаткова посада</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть додаткову посаду викладача'}
                            optionLabelProp="label"
                            {...createUserRegister('additional_job_title',{required:false})}
                            onChange={(e) => createUserSetValue('additional_job_title',e)}
                            value={createUserWatch('additional_job_title')}
                            >   
                            <Option value={"Додаткова Студент"} label={"Додаткова Студент"}>Додаткова Студент</Option>
                            <Option value={"Додаткова посада 2"} label={"Додаткова посада 2"}>Додаткова осада 2</Option>
                        </Select>
                    </div>
                </div>
            </div>
            {//@ts-ignore
            Object.keys(createUserFormErrors).map(key => !!createUserFormErrors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors[key]?.message}</p>)
            }
            {createUserErrorCode !== undefined && <p style={{width:'fit-content'}} className="signIn_errorMessage">{userErrorCodesToMessages[createUserErrorCode]}</p>}
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Зареєструвати"} disabled={createUserLoading}/>
            </div>
        </form>
        <div className="teachersSections_container">
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія інформаційних технологій</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                        <Link to={routes.editUser.replace(':id','1')} className="studentButton">Редагувати</Link>
                    </div>
                </div>
            </div>
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія іноземних мов</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія інформаційних технологій</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія інформаційних технологій</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}