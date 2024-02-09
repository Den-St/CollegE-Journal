import { Link } from "react-router-dom";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { useUserStore } from "../../store/userStore";
import "./teachersStyles.scss";

export const Teachers = () => {
    const mySecurityLevel = useUserStore().user.security_level || 0;

    return <div className="teachersMain_container">
        <div className="teachersHeader_container">
            <div className="teachersHeaderLeft_container">
                <h1 className="teachersHeader">Викладачі</h1>
                {mySecurityLevel >= securityLevels.teacher && <Link to={routes.groups} className={'teachersGoToGroups_link'}>Список груп</Link>}
            </div>
            <div className="teachersHeaderRight_container">
                {mySecurityLevel === securityLevels.admin && <>
                    <Link to={'#'} className="adminPanelStudentList_add primary_button">Видалити викладача</Link>
                    <Link to={routes.createTeacher} className="adminPanelStudentList_add primary_button">Додати викладача</Link>
                </>
                }
            </div>
        </div>
        <div className="teachersSections_container">
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія інформаційних технологій</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія іноземних мов</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія інформаційних технологій</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="teacherSectionItem_container">
                <h2 className="teacherSection_header">Циклова комісія інформаційних технологій</h2>
                <div className="teachers_container">
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                    <div className="teacherItem_container">
                        <img className="teacherAvatar" src={defaultAvatar}/>
                        <div className="teacherItemText_container">
                            <p className="teacherItem_name">Ігор Сорока Сергійович</p>
                            <p className="teacherItem_role">Викладач</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}