import { Modal, Select, Spin } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { getToken } from "../../helpers/auth";
import { useGetGroups } from "../../hooks/getGroups";
import { useThemeController } from "../../hooks/themeController"
import { useUserStore } from "../../store/userStore";
import { CreateGroupT, GroupT } from "../../types/group";
const {Option,} = Select;

const useCreateGroupForm = (refetchGroups:() => void) => {
    const navigate = useNavigate();
    const [createGroupModalOpened,setCreateGroupModalOpened] = useState(false);
    const [errorCode,setErrorCode] = useState<number>();
    const onOpenCreateGroupModal = () => {
        setCreateGroupModalOpened(true);
    }
    const onCloseCreateGroupModal = () => {
        setCreateGroupModalOpened(false);
    }
    const {
        register,
        handleSubmit,
    } = useForm<CreateGroupT>();
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;

    const onCreateGroup = async (data:CreateGroupT) => {
        data.group_full_name = data.group_full_name.trim();
        if(data.group_full_name.length !== 4 && data.group_full_name.length !== 5) {
            setErrorCode(-1);
            return;
        }
        const oneLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1] === '-' && !isNaN(+data.group_full_name[2]) && !isNaN(+data.group_full_name[3]);
        if(data.group_full_name.length === 4 && !oneLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        const doubleLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1].match(/^[а-я]/u) && data.group_full_name[2] === '-' && !isNaN(+data.group_full_name[3]) && !isNaN(+data.group_full_name[4]);
        if(data.group_full_name.length === 5 && !doubleLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        try{
            const res = await axiosConfig.post(endpoints.createGroup,data,{headers:{'Authorization':localToken || cookieToken}});
            onCloseCreateGroupModal();
            refetchGroups();
            if(res.status === 201) {
                setErrorCode(undefined);
                navigate(routes.editGroup.replace(':id',res.data.inserted_id))
            }else{
                setErrorCode(res.data.status)
            }
        }catch(err){
            setErrorCode(0);
            console.error(err);
        }
    }
    return {createGroupModalOpened,onCloseCreateGroupModal,onOpenCreateGroupModal,handleSubmit,register,onCreateGroup,errorCode};
}

const errorCodes:Record<number,string> = {
    [-1]:'Некоректна назва групи',
    0:'Група з такою назвою вже існує'
}
const groupCoursesNumbers:Record<number,string> = {
    1:'Перший курс',
    2:'Другий курс',
    3:'Третій курс',
    4:'Четвертий курс',
}
export const StudentsListAdmin = () => {
    const theme = useThemeController().theme;
    const {groups,refetchGroups,groupsLoading,groupesByGrade} = useGetGroups();
    const {createGroupModalOpened,onCloseCreateGroupModal,onOpenCreateGroupModal,handleSubmit,register,onCreateGroup,errorCode} = useCreateGroupForm(refetchGroups);

    return <div className={`adminStudentListContainer ${theme}`}>
        <section className="studentTitle__container">
            {/* <h1 className="studentTitle">Список студентів</h1> */}
            <div className="studentFilltersAdminPanel__container">
                {/* <div className="adminPanelStudentList_fillterContainer fillter_container">
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
                </div> */}
                <div className="adminPanelStudentList_conrollersContainer">
                    <button className="adminPanelStudentList_add" onClick={onOpenCreateGroupModal}>Додати</button>
                    {/* <button className="adminPanelStudentList_save">Зберити</button> */}
                </div>
            </div>
        </section>
        <Modal open={createGroupModalOpened} onCancel={onCloseCreateGroupModal} footer={false}>
            <form className="createGroup_form" onSubmit={handleSubmit(onCreateGroup)}>
                <div className="createUserFormSelects__container createGroupFormSelects__container">
                    <div className="createUserSelect__container createGroupSelect__container">
                        <label className="createUserInput__label">Спеціальність та курс</label>
                        {/* <div className="createStudyMaterialsSelect__wrapper">
                            <Select
                                className="createUserSelect"
                                placeholder={'Оберіть группу'}
                                optionLabelProp="label"
                                >   
                                <Option value={'random hashtag'} label={'random hashtag'}>'random hashtag'</Option>
                            </Select>
                        </div> */}
                        <input placeholder="Назва групи" autoComplete="off" {...register('group_full_name',{required:true})} className="createUser__input"/>
                        <p>{errorCode !== undefined && errorCodes[errorCode]}</p>
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
                                <Option value={'random hashtag1'} label={'random hashtag1'}>'random hashtag1'</Option>
                                <Option value={'random hashtag2'} label={'random hashtag2'}>'random hashtag2'</Option>
                                <Option value={'random hashtag3'} label={'random hashtag3'}>'random hashtag3'</Option>
                                <Option value={'random hashtag4'} label={'random hashtag4'}>'random hashtag4'</Option>
                            </Select>
                        </div>
                    </div> */}
                </div>
                <input autoComplete="off"  type={'submit'} className="createUser__button" value={'Зареєструвати'}/>
            </form>
        </Modal>
        <section className="groupsCourses__container">
            {!groupsLoading && !!groupesByGrade ? Object.keys(groupesByGrade).map(key => 
                <div className="groupsCourseItem__container">
                    <h2 className="groupsCourseItem__title">{groupCoursesNumbers[+key]}</h2>
                    <div className="groupCourseItemGroups__container">
                        {groupesByGrade?.[key].map((group:GroupT) => 
                            <Link to={routes.editGroup.replace(':id',group.group_id)} className="groupItem__container">
                                {group.group_full_name}
                            </Link>
                        )}
                    </div>
                </div>
            ) : <Spin/>}
        </section>
        {/* <section className="studentList__container">
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
        </section> */}
    </div>
}