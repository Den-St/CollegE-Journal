import { Select } from "antd";
import { useThemeStore } from "../../store/themeStore"
import './createUser.scss';
const {Option} = Select;

export const CreateUser = () => {
    const theme = useThemeStore().theme;

    return <main className={`createUser__main ${theme}`}>
        <h1 className="createUserTitle">Створення аккаунту</h1>
        <form className="createUserForm">
            <div className="createUserFormInputs__container">
                <div className="createUserNameInput__container">
                    <label className="createUserInput__label">Ім’я (ПІБ)</label>
                    <input className="createUser__input" placeholder='Введіть ПІБ студента'/>
                </div>
                <div className="createUserEmailInput__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <input className="createUser__input" placeholder='Введіть пошту студента'/>
                </div>
            </div>
            <div className="createUserFormSelects__container">
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть хеш-теги'}
                            mode="multiple"
                            optionLabelProp="label"
                            //onSearch={search}
                            >   
                            {/* {hashTags && hashTags.map(hashTag => 
                            <Option value={hashTag.name} label={hashTag.name}>
                            </Option>
                            )} */}
                            <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                            <Option value={'random hashtag1'} label={'random hashtag1'}>'random hashtag1'</Option>
                            <Option value={'random hashtag2'} label={'random hashtag2'}>'random hashtag2'</Option>
                            <Option value={'random hashtag3'} label={'random hashtag3'}>'random hashtag3'</Option>
                            <Option value={'random hashtag4'} label={'random hashtag4'}>'random hashtag4'</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть хеш-теги'}
                            mode="multiple"
                            optionLabelProp="label"
                            //onSearch={search}
                            >   
                            {/* {hashTags && hashTags.map(hashTag => 
                            <Option value={hashTag.name} label={hashTag.name}>
                            </Option>
                            )} */}
                            <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                            <Option value={'random hashtag1'} label={'random hashtag1'}>'random hashtag1'</Option>
                            <Option value={'random hashtag2'} label={'random hashtag2'}>'random hashtag2'</Option>
                            <Option value={'random hashtag3'} label={'random hashtag3'}>'random hashtag3'</Option>
                            <Option value={'random hashtag4'} label={'random hashtag4'}>'random hashtag4'</Option>
                        </Select>
                    </div>
                </div>
                <div className="createUserSelect__container">
                    <label className="createUserInput__label">Пошта студента</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть хеш-теги'}
                            mode="multiple"
                            optionLabelProp="label"
                            //onSearch={search}
                            >   
                            {/* {hashTags && hashTags.map(hashTag => 
                            <Option value={hashTag.name} label={hashTag.name}>
                            </Option>
                            )} */}
                            <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                            <Option value={'random hashtag1'} label={'random hashtag1'}>'random hashtag1'</Option>
                            <Option value={'random hashtag2'} label={'random hashtag2'}>'random hashtag2'</Option>
                            <Option value={'random hashtag3'} label={'random hashtag3'}>'random hashtag3'</Option>
                            <Option value={'random hashtag4'} label={'random hashtag4'}>'random hashtag4'</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="createUserButtons__container">
                <button className="createUser__button">Зареєструвати</button>
                <button className="createUser__button">Наступний</button>
            </div>
        </form>
    </main>
}