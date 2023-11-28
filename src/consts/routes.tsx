import { Navigate, Route, Routes } from "react-router-dom";
import { CreateStudyMaterials } from "../components/CreateStudyMaterials";
import { CreateUser } from "../components/CreateUser";
import { FAQ } from "../components/FAQ";
import { CreateHomeTask } from "../components/HomeTask/createHomeTask";
import { NoMatch } from "../components/NoMatch";
import { Schedule } from "../components/Schedule";
import { ScheduleCreate } from "../components/ScheduleCreate";
import { StudyMaterialsCheckTeacher } from "../components/StudyMaterialsCheckTeacher";
import { HomePage, HomeTask, HomeTasks, SignIn, Registration, MissedClasses, StudentProfile, Students, TeacherProfile, Rating, Groups, Journal, SendHomeTask, AdminPanel, StudyMaterials } from "../pages";

export const navRoutes = {

}

export const routes = {
    registration:"/registration",
    signIn:"/sign-in",
    homePage:'/',
    studentProfile:'/student-profile/:id',
    homeTasks:'/home-tasks',
    homeTask:'/home-task/:id',
    students:'/students',
    teacherProfile:'/teacher-profile/:id',
    schedule:'/schedule',
    missedClasses:'/missed-classes/:studentId',
    rating:'/rating',
    groups:'/groups',
    journal:'/journal',
    createHomeTask:'/create-home-task',
    sendHomeTask:'/send-home-task',
    createStudyMaterials:'/create-study-materials',
    adminPanel:'/admin-panel',
    studyMaterials:'/study-materials',
    studyMaterialsCheckTeacher:'/study-materials-check-teacher',
    scheduleCreate:'/schedule-create',
    faq:'/faq',
    createUser:'/create-user',

};
export const headerRoutes = {
    studentProfile:'/student-profile/:id',
    homeTasks:'/home-tasks',
    homeTask:'/home-task/:id',
    students:'/students',
    teacherProfile:'/teacher-profile/:id',
    schedule:'/schedule',
    missedClasses:'/missed-classes/:studentId',
    rating:'/rating',
    groups:'/groups',
    journal:'/journal',
    createHomeTask:'/create-home-task',
    sendHomeTask:'/send-home-task',
    createStudyMaterials:'/create-study-materials',
    adminPanel:'/admin-panel',
    studyMaterials:'/study-materials',
    studyMaterialsCheckTeacher:'/study-materials-check-teacher',
    scheduleCreate:'/schedule-create',
    faq:'/faq',
    createUser:'/create-user',

};
const gitHubHomePageRoute = '/CollegE-Journal/';
const GitHubHomePage = () => {
    return <Navigate to='/'/>
}

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.signIn} element={<SignIn/>} path={routes.signIn}/>,                          //layout done
    <Route key={routes.homePage} element={<HomePage/>} path={routes.homePage}/>,                    //layout done
    <Route key={routes.studentProfile} element={<StudentProfile/>} path={routes.studentProfile}/>,  //layout done
    <Route key={routes.homeTasks} element={<HomeTasks/>} path={routes.homeTasks}/>,                 //layout done
    <Route key={routes.homeTask} element={<HomeTask/>} path={routes.homeTask}/>,          
    <Route key={routes.students} element={<Students/>} path={routes.students}/>,
    <Route key={routes.teacherProfile} element={<TeacherProfile/>} path={routes.teacherProfile}/>,
    <Route key={routes.schedule} element={<Schedule/>} path={routes.schedule}/>,
    <Route key={routes.missedClasses} element={<MissedClasses/>} path={routes.missedClasses}/>,
    <Route key={routes.rating} element={<Rating/>} path={routes.rating}/>,
    <Route key={routes.groups} element={<Groups/>} path={routes.groups}/>,                           //layout done
    <Route key={routes.journal} element={<Journal/>} path={routes.journal}/>,                       //layout done
    <Route key={routes.createHomeTask} element={<CreateHomeTask/>} path={routes.createHomeTask}/>,                       //layout done
    <Route key={routes.sendHomeTask} element={<SendHomeTask/>} path={routes.sendHomeTask}/>,                       //layout done
    <Route key={routes.createStudyMaterials} element={<CreateStudyMaterials/>} path={routes.createStudyMaterials}/>,                       //layout done
    <Route key={routes.adminPanel} element={<AdminPanel/>} path={routes.adminPanel}/>,                       //layout done
    <Route key={routes.studyMaterials} element={<StudyMaterials/>} path={routes.studyMaterials}/>,                       //layout done
    <Route key={routes.studyMaterialsCheckTeacher} element={<StudyMaterialsCheckTeacher/>} path={routes.studyMaterialsCheckTeacher}/>,                       //layout done
    <Route key={routes.scheduleCreate} element={<ScheduleCreate/>} path={routes.scheduleCreate}/>,                       //layout done
    <Route key={routes.faq} element={<FAQ/>} path={routes.faq}/>,                       //layout done
    <Route key={routes.createUser} element={<CreateUser/>} path={routes.createUser}/>,                       //layout done
    <Route key={'*'} element={<NoMatch/>} path={'*'}/>,                       //layout done
    
    <Route key={gitHubHomePageRoute} element={<GitHubHomePage/>} path={gitHubHomePageRoute}/>//reroute to home page from gitHub-pages
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}