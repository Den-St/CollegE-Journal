import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { routes } from "../../consts/routes";
import { useGroupsByTeacher } from "../../hooks/groupsByTeacher";
import { useTeachersGroupsStore } from "../../store/teachersGroupsStore"
import { NoMatch } from "../NoMatch";
import './subjectsStyles.scss';

export const Subjects = () => {
    const {loading} = useGroupsByTeacher();
    const pickedGroupId = useSearchParams()[0].get('group_id');
    const [searchParams,setSearchParams] = useSearchParams();
    const group = useTeachersGroupsStore().groups.find(group => group._id === pickedGroupId);
    console.log(pickedGroupId,group);
    // const subjects = [{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:false},];
    const lastMonth = new Date().getMonth();
    console.log(lastMonth);

    if(loading) return <Spin/>
    if(!group) return <NoMatch is404={false} title={"Групи не знайдено"}/>

    return <section className="subjectsMainContainer">
        <h2 className="subjectsMainTitle">Предмети</h2>
        <div className="subjectsContainer">
        {group.can_edit.map((subject,i) => 
            <Link to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject._id}&month=${lastMonth + 1}`} className={`homeTasks_subject`}>{subject.subject_full_name}
            {/* {i === 2 && <div className="newTask"/>} */}
            </Link>
        )}
        {/* {subjects.map((subject,i) => <Link to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject}&month=${lastMonth}`} className={`homeTasks_subject ${!subject.isActive && 'inactive'}`}>{subject.name}{i === 2 && <div className="newTask"/>}</Link>)} */}
        </div>
    </section>
}