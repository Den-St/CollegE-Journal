import { Carousel, Spin } from "antd";
import { Link } from "react-router-dom";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { routes } from "../../consts/routes";
import { useStudentSubjects } from "../../hooks/studentSubjects";
import { NoMatch } from "../NoMatch";
import './subjectsStyles.scss';

export const StudentSubjects = () => {
    const {journalSubjects,loading} = useStudentSubjects();

    if(loading) return <Spin/>
    if(!journalSubjects?.subjects.length) return <NoMatch is404={false} title={"Предметів не знайдено"}/>

    return <section className="subjectsMainContainer">
        <h2 className="subjectsMainTitle">Предмети</h2>
        <div className="subjectsContainer">
            {journalSubjects?.subjects.map((subject,i) => 
                <Link  
                to={'#'}
                // to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject.subject_id}&month=${lastMonth + 1}`}
                className={`homeTasks_subject`}>
                    {subject.subject_full_name}
                </Link>
            )}
        </div>
        <Carousel className='subjects_carousel' dots slidesToShow={1}>
            {journalSubjects?.subjects.map((subject,i) => 
                <Link 
                to={'#'}
                // to={routes.journal + `?group_id=${pickedGroupId}&subject_id=${subject.subject_id}&month=${lastMonth + 1}`}
                 className={`homeTasks_subject`}>
                    {subject.subject_full_name}
                </Link>
            )}
        </Carousel>
    </section>
}