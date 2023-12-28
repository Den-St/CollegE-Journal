import "./editGroupStyles.scss";
import { Select } from "antd";
import { useCreateUser } from "../../hooks/createUser"
import { useThemeStore } from "../../store/themeStore";
import { useChangeGroupInfo } from "../../hooks/changeGroupInfo";
const {Option} = Select;

export const EditGroup = () => {
    const theme = useThemeStore().theme;
    const {handleSubmit,register,onCreateUser,setValue,groups} = useCreateUser();
    const {} = useChangeGroupInfo();
    
    return <div className={`editGroupMain_container ${theme}`}>
        <h1>Змінення групи</h1>
        <form className="createGroup_form" 
        // onSubmit={handleSubmit(onCreateGroup)}
        >
            <div className="createUserFormSelects__container createGroupFormSelects__container">
                <div className="createUserSelect__container createGroupSelect__container">
                    <label className="createUserInput__label">Спеціальність та курс</label>
                    {/* <input {...register('group_full_name',{required:true})}/> */}
                </div>
                {/* <div className="createUserSelect__container createGroupCuratorSelect__container">
                    <label className="createUserInput__label">Куратор</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть куратора'}
                            optionLabelProp="label"
                            >   
                            <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                        </Select>
                    </div>
                </div> */}
            </div>
            <input type={'submit'} className="createUser__button" value={'Зареєструвати'}/>
        </form>
        <h1 className="createUserTitle">Створення аккаунту</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input {...register('full_name',{required:true})} className="createUser__input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <input {...register('mailbox_address',{required:true})} className="createUser__input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormSelects__container">
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
                <input type={"submit"} className="createUser__button" value={"Зареєструвати"}/>
            </div>
        </form>
    </div>
}