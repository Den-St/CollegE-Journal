import { Select } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosConfig from "../../axiosConfig";
import { endpoints } from "../../consts/endpoints";
import { useCreateUser } from "../../hooks/createUser";
import { useThemeStore } from "../../store/themeStore"
import { GroupT } from "../../types/group";
import { CreateUserT } from "../../types/user";
import './createUser.scss';
const {Option} = Select;

export const CreateUser = () => {
    const theme = useThemeStore().theme;
    const {onCreateUser,handleSubmit,createUserRegister,createUserSetValue} = useCreateUser();

    return <div className={`createUser__main ${theme}`}>
        <h1 className="createUserTitle">Створення аккаунту</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="select_label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  {...createUserRegister('full_name',{required:true})} className="form_input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="select_label">Пошта студента</label>
                    <input autoComplete="off"  {...createUserRegister('mailbox_address',{required:true})} className="form_input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormSelects__container">
                <div className="createUserSelect__container">
                    <label className="select_label">Група студента</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        {/* <Select
                            className="createUserSelect"
                            placeholder={'Оберіть групу'}
                            optionLabelProp="label"
                            onChange={(e) => createUserSetValue('group_id',e)}
                            >   
                            {groups.map(group => <Option value={group.group_id} label={group.group_full_name}>{group.group_full_name}</Option>)}
                        </Select> */}
                    </div>
                </div>
                <div className="createUserSelect__container">
                    <label className="select_label">Форма навчання</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть форму навчання'}
                            optionLabelProp="label"
                            onChange={(e) => createUserSetValue('education_form',e)}
                            >   
                            <Option value={"Очно"} label={"Очно"}>Очно</Option>
                            <Option value={"Дистанційно"} label={"Дистанційно"}>Дистанційно</Option>
                        </Select>
                        
                    </div>
                </div>
                <div className="createUserSelect__container">
                    <label className="select_label">Бюджет/Контракт</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть тип'}
                            optionLabelProp="label"
                            onChange={(e) => createUserSetValue('education_type',e)}
                            >   
                            <Option value={"Бюджет"} label={"Бюджет"}>Бюджет</Option>
                            <Option value={"Контракт"} label={"Контракт"}>Контракт</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserButtons__container">
                <input autoComplete="off"  type={"submit"} className="createUser__button primary_button"  value={"Зареєструвати"}/>
                <button className="createUser__button">Наступний</button>
            </div>
        </form>
    </div>
}