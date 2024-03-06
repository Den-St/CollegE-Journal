import { Carousel, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../consts/routes";
import { useStudentSubjects } from "../../hooks/studentSubjects";
import { Loader } from "../Loader/Loader";
import { NoMatch } from "../NoMatch";
import './subjectsStyles.scss';

export const StudentSubjects = () => {
    const {journalSubjects,loading} = useStudentSubjects();
    const currentMonth = new Date().getMonth();
    
    useEffect(() => {
        document.title = "Обрати предмет"
    },[])
    if(loading) return <Loader/>
    if(!journalSubjects?.subjects.length) return <NoMatch is404={false} title={"Предметів не знайдено"}/>

    return <section className="subjectsMainContainer">
        <h2 className="subjectsMainTitle">Предмети</h2>
        <div className="subjectsContainer">
            {journalSubjects?.subjects.map((subject,i) => 
                <Link  
                to={routes.journal + `?&subject_id=${subject.journal_id}&month=${currentMonth + 1}`}
                key={subject.journal_id}
                className={`homeTasks_subject`}>
                    {subject.subject_full_name}
                </Link>
            )}
        </div>
        <Carousel className='subjects_carousel' dots slidesToShow={1}>
            {journalSubjects?.subjects.map((subject,i) => 
                <Link 
                to={routes.journal + `?&subject_id=${subject.journal_id}&month=${currentMonth + 1}`}
                key={subject.journal_id}
                className={`homeTasks_subject`}>
                    {subject.subject_full_name}
                </Link>
            )}
        </Carousel>
    </section>
}