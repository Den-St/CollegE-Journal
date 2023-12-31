import { Select, Spin } from "antd";
import { Link } from "react-router-dom";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { groupCoursesNumbers } from "../../consts/groupsCoursesNumbers";
import { routes } from "../../consts/routes";
import { useGroupsByTeacher } from "../../hooks/groupsByTeacher";
import { useThemeStore } from "../../store/themeStore"
import { NoMatch } from "../NoMatch";
import './groupsStyles.scss';
const {Option} = Select;

export const Groups = () => {
    const theme = useThemeStore().theme;
    const {loading,groups,groupesByGrade} = useGroupsByTeacher();

    return <div className={`groupsMain__container ${theme}`}>
        {/* <section className="groupsTop__container">
            <h1 className="groupTitle">Список груп</h1>
            <div className="groupsFillters__container">
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div className="fillterPlaceholder_container">
                        <p className="fillter_placeholder">Рік</p> <FilterIconSvg/>
                    </div>}
                    className="fillter_select"
                    allowClear
                    >
                        <Option value={'2020'} label={'2020'}>2020 <FilterIconSvg/></Option>
                        <Option value={'2021'} label={'2021'}>2021 <FilterIconSvg/></Option>
                        <Option value={'2022'} label={'2022'}>2022 <FilterIconSvg/></Option>
                        <Option value={'2023'} label={'2023'}>2023 <FilterIconSvg/></Option>
                    </Select>
                </div>
                <div className="adminPanelStudentList_fillterContainer fillter_container">
                    <Select 
                    placeholder={<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px'}}>
                        <p className="fillter_placeholder">Спеціальність</p><FilterIconSvg/>
                    </div>} 
                    className="fillter_select"
                    allowClear

                    >
                        <Option value={'Математика1'} label={'Математика1'}>Математика1 <FilterIconSvg/></Option>
                        <Option value={'Математика2'} label={'Математика2'}>Математика2 <FilterIconSvg/></Option>
                        <Option value={'Математика3'} label={'Математика3'}>Математика3 <FilterIconSvg/></Option>
                        <Option value={'Математика4'} label={'Математика4'}>Математика4 <FilterIconSvg/></Option>
                    </Select>
                </div>
            </div>
        </section> */}
        <section className="groupsCourses__container">
            {
                !loading ? !!groupesByGrade ? Object.keys(groupesByGrade).map(key => 
                    <div className="groupsCourseItem__container">
                        <h2 className="groupsCourseItem__title">{groupCoursesNumbers[+key]}</h2>
                        <div className="groupCourseItemGroups__container">
                            {groupesByGrade[key].map(group => 
                                <Link to={routes.pickJournalSubject + `?group_id=${group.group_id}`} className="groupItem__container">
                                    {group.group_full_name}
                                </Link>
                            )}
                        </div>
                    </div>   
                ) : <NoMatch is404={false} title={'У вас немає груп'}/> : <Spin/>
            }
        </section>
    </div>
}