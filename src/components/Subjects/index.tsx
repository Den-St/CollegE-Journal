import { Link } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { routes } from "../../consts/routes";
import { useTeachersGroupsStore } from "../../store/teachersGroupsStore"
import { NoMatch } from "../NoMatch";

export const Subjects = () => {
    const pickedGroupId = useParams().group_id;
    const group = useTeachersGroupsStore().groups.find(group => group.group_id === pickedGroupId);
    const subjects = [{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:false},];
    const lastMonth = new Date().getMonth();
    console.log(lastMonth);
    if(!group) return <NoMatch is404={false} title={"Групи не знайдено"}/>

    return <section className="homeTaskSubjects_main">
        <h2 className="homeTaskSubjects_title">Предмети</h2>
        <div className="homeTaskSubjects_container">
        {subjects.map((subject,i) => <Link to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject}&month=${lastMonth}`} className={`homeTasks_subject ${!subject.isActive && 'inactive'}`}>{subject.name}{i === 2 && <div className="newTask"/>}</Link>)}
        </div>
    </section>
}