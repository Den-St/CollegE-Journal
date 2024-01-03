import "./editGroupStyles.scss";
import { Select } from "antd";
import { useCreateUser } from "../../hooks/createUser"
import { useThemeStore } from "../../store/themeStore";
import { useChangeGroupInfo } from "../../hooks/changeGroupInfo";
import { NoMatch } from "../NoMatch";
import { Link, } from "react-router-dom";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useGetGroup } from "../../hooks/getGroup";
const {Option} = Select;

const errorCodesToMessages:Record<number,string> = {
    0:'Користувач з такою поштовою адресою вже існує'
}

export const EditGroup = () => {
    const theme = useThemeStore().theme;
    const {group,groupLoading} = useGetGroup();
    const {handleSubmit,createUserRegister,onCreateUser,createUserSetValue,createUserErrorCode,createUserWatch} = useCreateUser(group);
    const {onChangeGroupInfo,changeGroupRegister,changeGroupHangeSubmit,changeGroupSetValue} = useChangeGroupInfo();
    
    if(!groupLoading && !group) return <NoMatch is404={false} title={'Такої групи не було знайдено.'}/>

    return <div className={`editGroupMain_container ${theme}`}>
        <h1 className="editGroupHeader">Змінення групи</h1>
        <form className="createGroup_form" 
        onSubmit={changeGroupHangeSubmit(onChangeGroupInfo)}
        >
            <div className="createUserFormSelects__container createGroupFormSelects__container">
                <div className="editGroupSelect__container">
                    <label className="createUserInput__label">Спеціальність та курс</label>
                    <input placeholder="Введіть назву групи" defaultValue={group?.group_full_name || ''} className="createUser__input" autoComplete="off" {...changeGroupRegister('group_full_name',{required:true})}/>
                </div>
                <div className="createUserSelect__container createGroupCuratorSelect__container">
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
                </div>
            </div>
            <input autoComplete="off"  type={'submit'} className="createUser__button" value={'Змінити'}/>
        </form>
        <h1 className="createUserTitle">Створення аккаунту</h1>
        <form className="createUserForm" onSubmit={handleSubmit(onCreateUser)}>
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input autoComplete="off"  {...createUserRegister('full_name',{required:true})} className="createUser__input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <input autoComplete="off" {...createUserRegister('mailbox_address',{required:true})} type={'email'} className="createUser__input" placeholder='Введіть пошту студента'/>
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
                            onChange={(e) => createUserSetValue('education_form',e)}
                            value={createUserWatch('education_form')}
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
                            // {...createUserRegister('education_type',{required:true})}
                            onChange={(e) => createUserSetValue('education_type',e)}
                            value={createUserWatch('education_type')}
                            >   
                            <Option value={"Бюджет"} label={"Бюджет"}>Бюджет</Option>
                            <Option value={"Контракт"} label={"Контракт"}>Контракт</Option>
                        </Select>
                    </div>
                </div>
            </div>
            {createUserErrorCode !== undefined && <p style={{width:'fit-content'}} className="signIn_errorMessage">{errorCodesToMessages[createUserErrorCode]}</p>}
            <div className="createUserButtons__container">
                <input autoComplete="off" type={"submit"} className="createUser__button" value={"Зареєструвати"}/>
            </div>
        </form>
        <section className="studentList__container">
            <div className="studentItems__container" style={{'justifyContent':'space-between'}}>
                {group?.group_students?.map(student => 
                    <div id={student.user_id || ''} className="student__container">
                        <div className="student__info">
                            <img className="studentList__avatar" src={student?.avatar || defaultAvatar} alt=""/>
                            <p className="studentName">{student?.full_name}</p>
                        </div>
                        <Link className="studentButton" to="#">Перейти</Link>
                    </div>
                )}
            </div>
        </section>
    </div>
}