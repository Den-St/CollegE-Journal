import { DatePicker, message, Select } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { StarSvg } from "../../assets/svgs/starSvg"
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { emailPattern } from "../../consts/emailPattern";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useGetUserProfile } from "../../hooks/getUserProfile";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import { EditUserT, UserT } from "../../types/user";
import { UserProfileT } from "../../types/userProfile";
import '../MyProfile/studentProfile.scss';
const {Option} = Select;

const useEditUser = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors},
    } = useForm<EditUserT>();
    const token = useUserStore().user.token;
    const user_id = useParams().id;
    const [user,setUser] = useState<UserProfileT>();
    
    const onEdit = async (data:EditUserT) => {
        try{
            const res = await axiosConfig.put(endpoints.editUser,{...data,user_id},{headers:{Authorization:token}});
        }catch(err){
            console.log(err);
        }
    }

    const fetch = async () => {
        try{
            const res = await axiosConfig.post(endpoints.getUser,{user_id},{headers:{Authorization:token}});
            setUser(res.data.data);
            Object.keys(res.data.data).forEach((key) => {
                //@ts-ignore
                if(Object.keys(watch()).includes(key)) setValue(key, res.data.data[key] || null);
            });
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetch();
    }, [])
  
    return {onEdit,register,handleSubmit,setValue,watch,reset,errors,user};
}

export const EditUser = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const navigate = useNavigate();
    const userId = useParams().id;
    const from = useSearchParams()[0].get('from');
    const {onEdit,register,handleSubmit,setValue,watch,reset,errors,user} = useEditUser();

    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        <section className='studentProfileMain__container'>
            <div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
                {!!userId && <LinkBack title="Профіль" route={!from ? routes.userProfile.replace(':id',userId) : routes.userProfile.replace(':id',userId) + '?from=' + from}/>}
                <div className='studentProfileLeft__container'>
                    <div className='studentProfileInfo__container'>
                        <div style={{'display':'flex','flexDirection':'column',gap:'15px','alignItems':'center'}}>
                        <img className='studentProfile_img' src={
                            user?.avatar || 
                            defaultAvatar
                        }/>
                        <button onClick={() => setValue('avatar',null)} className="primary_button" style={{'fontFamily':'Alegreya Sans'}}>Видалити</button>
                        </div>
                        <div className='studentProfileTextInfo__container'>
                            <p className='studentProfile__name'>
                                {user?.full_name}
                                Призвіще Ім'я По батькові
                                {/* {user?.security_level !== securityLevels.admin &&  <StarSvg/>} */}
                                
                            </p>
                            {/* <p className='studentProfile__email'>{
                            user?.mailbox_address || 
                            `mail@gmail.com`}</p> */}
                            {
                            !!user?.user_group?.group_full_name && 
                            mySecurityLevel !== securityLevels.admin 
                            ? <Link to={routes.pickJournalSubject} className='studentProfile__group'>
                                {user?.user_group?.group_full_name || `Група-00`}
                                </Link> 
                            : <Link to={routes.pickJournalSubject 
                                + 
                                `?group_id=${user?.user_group?.group_id}`
                                } className='studentProfile__group'>
                                {user?.user_group?.group_full_name || `Група-00`}
                            </Link>}
                            <p className='studentProfile__bio'>{user?.interests}</p>
                            <button onClick={() => setValue('interests','')} className="primary_button" style={{'fontFamily':'Alegreya Sans'}}>Стерти інтереси</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <form className="createUserForm" 
        onSubmit={handleSubmit(onEdit)}
        >
            <input style={{'display':'none'}} {...register('avatar')}/>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="select_label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  
                    {...register('full_name',{required:{value:true,message:'Введіть ПІБ студента!'},minLength:{value:10,message:'ПІБ студента занадто коротке!'},maxLength:{value:40,message:'ПІБ студента занадто велике!'},pattern:{value:/^[а-яА-Я\s\-\і\ґ\ї]*$/,message:'Некорректне ПІБ!'}})} 
                    className="form_input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="select_label">Пошта студента</label>
                    <input autoComplete="off" 
                    {...register('mailbox_address',{required:true,pattern:{value:emailPattern,message:'Не корректний email!'}})} 
                    type={'email'} className="form_input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserEmailInput__container">
                    <label className="select_label">Інтереси</label>
                    <input autoComplete="off" 
                    {...register('interests')}
                    className="form_input" placeholder='Введіть інтереси студента'/>
                </div>
                <div className="createUserSelect__container" style={{width:'55%'}}>
                    <label className="select_label">Посада</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть посаду студента'}
                            optionLabelProp="label"
                            {...register('job_title',{required:{value:true,message:'Введіть посаду студента'}})}
                            onChange={(e) => setValue('job_title',e)}
                            value={watch('job_title')}
                            >   
                            <Option value={"Студент"} label={"Студент"}>Студент</Option>
                            <Option value={"Староста"} label={"Староста"}>Староста</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserEmailInput__container">
                    <label className="select_label">Дата народження</label>
                    {/* <input autoComplete="off" 
                    type={'date'}
                    {...register('birth_date',{required:{value:true,message:'Введіть дату народження'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                    className="form_input" placeholder='Введіть дату народження'/> */}
                    <DatePicker
                    placeholder="Введіть дату народження"
                    className="form_input"
                    format={'DD.MM.YYYY'}
                    style={{'visibility':'visible'}}
                    {...register('birth_date',{required:{value:true,message:'Введіть дату народження'},
                    // pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}
                    })}
                    onChange={(e) => setValue('birth_date',e?.toDate().toLocaleDateString() || '')} />
                </div>
                <div className="createUserEmailInput__container">
                    <label className="select_label">Дата вступу</label>
                    {/* <input autoComplete="off" 
                    type={'date'}
                    {...register('admission_date',{required:{value:true,message:'Введіть дату вступу'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата вступу некорректна!'}})}
                    className="form_input" placeholder='Введіть дату вступу'/> */}
                    <DatePicker
                    placeholder="Введіть дату вступу"
                    className="form_input"
                    format={'DD.MM.YYYY'}
                    style={{'visibility':'visible'}}
                    {...register('admission_date',{required:{value:true,message:'Введіть дату вступу'},
                    // pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата вступу некорректна!'}
                    })}
                    onChange={(e) => setValue('admission_date',e?.toDate().toLocaleDateString() || '')} />
                </div>
                <div className="createUserSelect__container">
                    <label className="select_label">Місцезнаходження</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть 1 варіант'}
                            optionLabelProp="label"
                            {...register('location',{required:{value:true,message:'Оберіть місцезнаходження'}})}
                            onChange={(e) => setValue('location',e)}
                            value={watch('location')}
                            >   
                            <Option value={"В Україні"} label={"В Україні"}>В Україні</Option>
                            <Option value={"За кордоном"} label={"За кордоном"}>За кордоном</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Форма навчання</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть форму навчання'}
                            optionLabelProp="label"
                            {...register('education_form',{required:{value:true,message:'Оберіть форму навчання'}})}
                            onChange={(e) => setValue('education_form',e)}
                            value={watch('education_form')}
                            >   
                            <Option value={"Очно"} label={"Очно"}>Очно</Option>
                            <Option value={"Заочно"} label={"Заочно"}>Заочно</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Бюджет/Контракт</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть тип навчання'}
                            optionLabelProp="label"
                            {...register('education_type',{required:{value:true,message:'Оберіть тип навчання'}})}
                            onChange={(e) => setValue('education_type',e)}
                            value={watch('education_type')}
                            >   
                            <Option value={"Бюджет"} label={"Бюджет"}>Бюджет</Option>
                            <Option value={"Контракт"} label={"Контракт"}>Контракт</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Отримання стипендії</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть 1 варіант'}
                            optionLabelProp="label"
                            {...register('is_on_scholarships',{required:{value:true,message:'Оберіть чи отримує студент стипендію'}})}
                            onChange={(e) => setValue('is_on_scholarships',e)}
                            value={watch('is_on_scholarships')}
                            >
                            <Option value={1} label={"Так"}>Так</Option>
                            <Option value={0} label={"Ні"}>Ні</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserFormInputs__container">
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Телефонний номер студента</label>
                    <input autoComplete="off"
                    {...register('phone_number',{required:{value:true,message:'Введіть телефонний номер'}})}
                    className="form_input" placeholder='Телефонний номер студента'/>
                </div>
                <div className="createUserSelect__container" style={{width:'32%'}}>
                    <label className="select_label">Телефонний номер батьків</label>
                    <input autoComplete="off"
                    {...register('parents_phone_number',{required:{value:true,message:'Введіть телефонний номер батьків'}})}
                    className="form_input" placeholder='Телефонний номер батьків'/>
                </div>
            </div>
            {//@ts-ignore
            Object.keys(errors).map(key => !!errors[key]?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{errors[key]?.message}</p>)
            }
            {/* {!!createUserFormErrors.full_name?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.full_name?.message}</p>}
            {!!createUserFormErrors.mailbox_address?.message && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrors.mailbox_address?.message}</p>}
            {!!createUserFormErrorMessage && <p style={{width:'fit-content'}} className="signIn_errorMessage">{createUserFormErrorMessage}</p>} */}
            {/* {createUserErrorCode !== undefined && <p style={{width:'fit-content'}} className="signIn_errorMessage">{userErrorCodesToMessages[createUserErrorCode]}</p>} */}
            <div className="createUserButtons__container">
                <input 
                // disabled={createUserDisabled} 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" value={"Змінити"} 
                // disabled={createUserLoading}
                />
                <input 
                autoComplete="off" type={"submit"} className="createUser__button primary_button" style={{'width':'unset'}} value={"Видалити випадково створений запис"} 
                />
            </div>
        </form>
    </div>
}