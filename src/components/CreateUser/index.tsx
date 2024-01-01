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
    const {groups,onCreateUser,handleSubmit,register,setValue} = useCreateUser();

    return <div className={`createUser__main ${theme}`}>
        <h1 className="createUserTitle">Створення аккаунту</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  {...register('full_name',{required:true})} className="createUser__input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <input autoComplete="off"  {...register('mailbox_address',{required:true})} className="createUser__input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormSelects__container">
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Група студента</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        {/* <Select
                            className="createUserSelect"
                            placeholder={'Оберіть групу'}
                            optionLabelProp="label"
                            onChange={(e) => setValue('group_id',e)}
                            >   
                            {groups.map(group => <Option value={group.group_id} label={group.group_full_name}>{group.group_full_name}</Option>)}
                        </Select> */}
                    </div>
                </div>
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Форма навчання</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть форму навчання'}
                            optionLabelProp="label"
                            onChange={(e) => setValue('education_form',e)}
                            >   
                            <Option value={"Очно"} label={"Очно"}>Очно</Option>
                            <Option value={"Заочно"} label={"Заочно"}>Заочно</Option>
                        </Select>
                        
                    </div>
                </div>
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Бюджет/Контракт</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть тип'}
                            optionLabelProp="label"
                            onChange={(e) => setValue('education_type',e)}
                            >   
                            <Option value={"Бюджет"} label={"Бюджет"}>Бюджет</Option>
                            <Option value={"Контракт"} label={"Контракт"}>Контракт</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserButtons__container">
                <input autoComplete="off"  type={"submit"} className="createUser__button" value={"Зареєструвати"}/>
                <button className="createUser__button">Наступний</button>
            </div>
        </form>
    </div>
}