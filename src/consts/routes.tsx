import { Route, Routes } from "react-router-dom";
import { Schedule } from "../components/Schedule";
import { HomePage, HomeTask, HomeTasks, SignIn, Registration, MissedClasses, StudentProfile, Students, TeacherProfile, Rating } from "../pages";

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
};

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.signIn} element={<SignIn/>} path={routes.signIn}/>,
    <Route key={routes.homePage} element={<HomePage/>} path={routes.homePage}/>,
    <Route key={routes.studentProfile} element={<StudentProfile/>} path={routes.studentProfile}/>,
    <Route key={routes.homeTasks} element={<HomeTasks/>} path={routes.homeTasks}/>,
    <Route key={routes.homeTask} element={<HomeTask/>} path={routes.homeTask}/>,
    <Route key={routes.students} element={<Students/>} path={routes.students}/>,
    <Route key={routes.teacherProfile} element={<TeacherProfile/>} path={routes.teacherProfile}/>,
    <Route key={routes.schedule} element={<Schedule/>} path={routes.schedule}/>,
    <Route key={routes.missedClasses} element={<MissedClasses/>} path={routes.missedClasses}/>,
    <Route key={routes.rating} element={<Rating/>} path={routes.rating}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}