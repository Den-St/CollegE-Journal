import { Select } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { StarSvg } from "../../assets/svgs/starSvg"
import { defaultAvatar } from "../../consts/defaultAvatar"
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import '../MyProfile/studentProfile.scss';
const {Option} = Select;

export const EditUser = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const navigate = useNavigate();
    const userId = useParams().id;
    const from = useSearchParams()[0].get('from');

    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        <section className='studentProfileMain__container'>
            <div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
                {!!userId && <h2 className="subjectsMainTitle"><Link to={!from ? routes.userProfile.replace(':id',userId) : routes.userProfile.replace(':id',userId) + '?from=' + from} className={'leftArrowButton'}><LeftArrowSvg/></Link>Профіль</h2>}
                <div className='studentProfileLeft__container'>
                    <div className='studentProfileInfo__container'>
                        <img className='studentProfile_img' src={
                            // user.avatar || 
                            defaultAvatar
                        }/>
                        <div className='studentProfileTextInfo__container'>
                            <p className='studentProfile__name'>
                                {/* {user.full_name} */}
                                Призвіще Ім'я По батькові
                                {/* {user.security_level !== securityLevels.admin &&  <StarSvg/>*/}
                                
                            </p>
                            <p className='studentProfile__email'>{
                            // user.mailbox_address || 
                            `mail@gmail.com`}</p>
                            <p className='studentProfile__bio'>Інтереси можуть бути розписані у декілька строк. Нехай займаються чим хотять</p>
                            {
                            // !!user?.user_group?.group_full_name && 
                            mySecurityLevel !== securityLevels.admin 
                            ? <Link to={routes.pickJournalSubject} className='studentProfile__group'>
                                {/* {user?.user_group?.group_full_name} */}
                                Група-00
                                </Link> 
                            : <Link to={routes.pickJournalSubject 
                                // + 
                                // `?group_id=${user?.user_group?.group_id}
                                } className='studentProfile__group'>
                                {/* {user?.user_group?.group_full_name} */}
                                Група-00
                            </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <form className="createUserForm" 
        // onSubmit={handleSubmit(onCreateUser)}
        >
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  
                    // {...createUserRegister('full_name',{required:{value:true,message:'Введіть ПІБ студента!'},minLength:{value:10,message:'ПІБ студента занадто коротке!'},maxLength:{value:40,message:'ПІБ студента занадто велике!'},pattern:{value:/^[а-яА-Я\s\-\і\ґ\ї]*$/,message:'Некорректне ПІБ!'}})} 
                    className="createUser__input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})} 
                    type={'email'} className="createUser__input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Інтереси</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})}
                      className="createUser__input" placeholder='Введіть інтереси студента'/>
                </div>
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="createUserInput__label">Посада</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть посаду студента'}
                            optionLabelProp="label"
                            // {...createUserRegister('education_type',{required:true})}
                            // onChange={(e) => createUserSetValue('education_type',e)}
                            // value={createUserWatch('education_type')}
                            >   
                            <Option value={"Студент"} label={"Студент"}>Студент</Option>
                            <Option value={"Посада 2"} label={"Посада 2"}>Посада 2</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Дата народження</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})}
                    className="createUser__input" placeholder='Введіть дату народження'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Дата вступу</label>
                    <input autoComplete="off" 
                    // {...createUserRegister('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})}
                    className="createUser__input" placeholder='Введіть дату вступу'/>
                </div>
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Місцезнаходження</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть 1 варіант'}
                            optionLabelProp="label"
                            // {...createUserRegister('education_type',{required:true})}
                            // onChange={(e) => createUserSetValue('education_type',e)}
                            // value={createUserWatch('education_type')}
                            >   
                            <Option value={"В Україні"} label={"В Україні"}>В Україні</Option>
                            <Option value={"За кордоном"} label={"За кордоном"}>За кордоном</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="createUserInput__label">Форма навчання</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть форму навчання'}
                            optionLabelProp="label"
                            // onChange={(e) => createUserSetValue('education_form',e)}
                            // value={createUserWatch('education_form')}
                            >   
                            <Option value={"Очно"} label={"Очно"}>Очно</Option>
                            <Option value={"Заочно"} label={"Заочно"}>Заочно</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="createUserInput__label">Бюджет/Контракт</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть тип'}
                            optionLabelProp="label"
                            // {...createUserRegister('education_type',{required:true})}
                            // onChange={(e) => createUserSetValue('education_type',e)}
                            // value={createUserWatch('education_type')}
                            >   
                            <Option value={"Бюджет"} label={"Бюджет"}>Бюджет</Option>
                            <Option value={"Контракт"} label={"Контракт"}>Контракт</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="createUserInput__label">Отримання стипендії</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть 1 варіант'}
                            optionLabelProp="label"
                            // {...createUserRegister('education_type',{required:true})}
                            // onChange={(e) => createUserSetValue('education_type',e)}
                            // value={createUserWatch('education_type')}
                            >   
                            <Option value={"Так"} label={"Так"}>Так</Option>
                            <Option value={"Ні"} label={"Ні"}>Ні</Option>
                        </Select>
                    </div>
                </div>
            </div>
            {/* <div className="createUserFormSelects__container"> */}
            {/* </div> */}
            {/* {//@ts-ignore
            Object.keys(createUserFormErrors).map(key => !!createUserFormErrors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors[key]?.message}</p>)
            } */}
            {/* {!!createUserFormErrors.full_name?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.full_name?.message}</p>}
            {!!createUserFormErrors.mailbox_address?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.mailbox_address?.message}</p>}
            {!!createUserFormErrorMessage && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrorMessage}</p>} */}
            {/* {createUserErrorCode !== undefined && <p style={{width:'fit-content'}} className="signIn_errorMessage">{userErrorCodesToMessages[createUserErrorCode]}</p>} */}
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Зареєструвати"} 
                // disabled={createUserLoading}
                />
            </div>
        </form>
    </div>
}