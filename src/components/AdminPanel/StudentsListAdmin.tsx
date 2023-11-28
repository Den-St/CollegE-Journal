import { Select } from "antd";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useThemeController } from "../../hooks/themeController"
const {Option,} = Select;

export const StudentsListAdmin = () => {
    const theme = useThemeController().theme;
    
    return <div className={`adminStudentListContainer ${theme}`}>
        <section className="studentTitle__container">
            <h1 className="studentTitle">Список студентів</h1>
            <div className="studentFilltersAdminPanel__container">
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Група</p><FilterIconSvg/>
                    </div>} 
                    >
                        <Option value={'random hashtag'} label={'random hashtag '}>random hashtag  <FilterIconSvg/></Option>
                        <Option value={'random hashtag1'} label={'random hashtag1'}>random hashtag1 <FilterIconSvg/></Option>
                        <Option value={'random hashtag2'} label={'random hashtag2'}>random hashtag2 <FilterIconSvg/></Option>
                        <Option value={'random hashtag3'} label={'random hashtag3'}>random hashtag3 <FilterIconSvg/></Option>
                        <Option value={'random hashtag4'} label={'random hashtag4'}>random hashtag4  <FilterIconSvg/></Option>
                    </Select>
                </div>
                <div className="adminPanelStudentList_conrollersContainer">
                    <button className="adminPanelStudentList_add">Додати</button>
                    <button className="adminPanelStudentList_save">Зберити</button>
                </div>
            </div>
        </section>
        <form className="createGroup_form">
            <div className="createUserFormSelects__container createGroupFormSelects__container">
                <div className="createUserSelect__container createGroupSelect__container">
                    <label className="createUserInput__label">Спеціальність та курс</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть группу'}
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
                <div className="createUserSelect__container createGroupCuratorSelect__container">
                    <label className="createUserInput__label">Куратор</label>
                    <div className="createStudyMaterialsSelect__wrapper">
                        <Select
                            className="createUserSelect"
                            placeholder={'Оберіть куратора'}
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
            <button className="createUser__button">Зареєструвати</button>
        </form>
        <section className="studentList__container">
            <div className="studentItems__container">
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
                <div className="student__container">
                    <div className="student__info">
                        <img className="studentList__avatar" src={defaultAvatar} alt=""/>
                        <p className="studentName">Прізвище І.Б.</p>
                    </div>
                    <Link className="studentButton" to="#">Перейти</Link>
                </div>
            </div>
        </section>
    </div>
}