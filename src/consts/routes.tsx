import { Navigate, Route, Routes } from "react-router-dom";
import { EditProfile } from "../components/EditProfile";
import { Journal } from "../components/Journal";
import { StudentJournal } from "../components/Journal/StudentJournal";
import { SecurityLevelGuard } from "../components/SecurityLevelGuard";
import { TeacherSubjects } from "../components/PickJournalSubjects/TeacherSubjects";
import { StudentSubjects } from "../components/PickJournalSubjects/StudentSubjects";
import { HomePage, HomeTask, HomeTasks, SignIn, Registration, MissedClasses, MyProfile, Students, TeacherProfile, Rating, Groups, SendHomeTask, AdminPanel, StudyMaterials, EditGroup, CreateHomeTask, CreateStudyMaterials, CreateUser, FAQ, NoMatch, Schedule, StudyMaterialsCheckTeacher, TeacherJournal } from "../pages";
import { securityLevels } from "./securityLevels";
import { PickJournalSubjects } from "../components/PickJournalSubjects";
import { CreateTeacher } from "../components/CreateTeacher";
import { UserProfile } from "../components/UserProfile";
import { EditUser } from "../components/EditUser";
import { Teachers } from "../components/Teachers";

export const navRoutes = {
}

export const routes = {
    signIn:"/sign-in",
    homePage:'/',
    profile:'/profile/:id',
    homeTasks:'/home-tasks',
    homeTask:'/home-task/:id',
    students:'/students',
    teacherProfile:'/teacher-profile/:id',
    schedule:'/schedule',
    missedClasses:'/missed-classes/:studentId',
    rating:'/rating',
    groups:'/groups',
    createHomeTask:'/create-home-task',
    sendHomeTask:'/send-home-task',
    createStudyMaterials:'/create-study-materials',
    adminPanel:'/admin-panel',
    studyMaterials:'/study-materials',
    studyMaterialsCheckTeacher:'/study-materials-check-teacher',
    scheduleCreate:'/schedule-create',
    faq:'/faq',
    createUser:'/create-user',
    editGroup:`/edit-group/:id`,
    pickJournalSubject:'/pick-journal-subject',
    myProfile:'/my-profile',
    editProfile:'/edit-profile',
    journal:'/journal',
    createTeacher:'/create-teacher',
    userProfile:'/user-profile/:id',
    editUser:'/edit-user/:id',
    teachers:'/teachers'
} as const;
export const headerRoutes = {
    studentProfile:'/student-profile/:id',
    homeTasks:'/home-tasks',
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
    signIn:''
} as const;

// const securityLevelToRoutes:Record<number,{link:string,title:string,page:JSX.Element}[]> = {
//     [securityLevels.unauthorized]:[
//         {
//             link:routes.homePage,
//             title:'Головна',
//             page:<HomePage/>
//         },
//         {
//             link:headerRoutes.faq,
//             title:'FAQ',
//             page:<FAQ/>
//         },
//         {
//             link:routes.signIn,
//             title:'Вхід',
//             page:<SignIn/>
//         },
      
//     ],
//     [securityLevels.student]:[
//         {
//             link:routes.homeTask,
//             title:'Домашнє завдання',
//             page:<HomeTask/>
//         },
//         {
//             link:routes.homeTask,
//             title:'Домашні завдання',
//             page:<HomeTasks/>
//         },
//     ],
//     [securityLevels.admin]:[
//         {
//             link:headerRoutes.adminPanel,
//             title:'Адмін-панель',
//             page:<AdminPanel/>
//         },
//         {
//             link:routes.editGroup,
//             title:'Редагування группи',
//             page:<EditGroup/>
//         },
//     ]
// };

const securityLevelToRoutes:Record<number,string[]> = {
    [securityLevels.unauthorized]:[
        routes.homePage,
        headerRoutes.faq,
        routes.signIn,
        
    ],
    [securityLevels.student]:[
        routes.homeTask,
        routes.homeTask,
    ],
    [securityLevels.admin]:[
        headerRoutes.adminPanel,
        routes.editGroup,
    ]
};
export const PublicRoutes = [
    <Route key={routes.signIn} element={<SignIn/>} path={routes.signIn}/>,   
    <Route key={routes.homePage} element={<HomePage/>} path={routes.homePage}/>,   
    <Route key={routes.myProfile} element={<SecurityLevelGuard blockedForAdmin securityLevel={securityLevels.student}><MyProfile/></SecurityLevelGuard>} path={routes.myProfile}/>,  
    <Route key={routes.userProfile} element={<SecurityLevelGuard securityLevel={securityLevels.student}><UserProfile/></SecurityLevelGuard>} path={routes.userProfile}/>,  
    <Route key={routes.homeTasks} element={<HomeTasks/>} path={routes.homeTasks}/>,
    <Route key={routes.homeTask} element={<HomeTask/>} path={routes.homeTask}/>,
    <Route key={routes.students} element={<Students/>} path={routes.students}/>,
    <Route key={routes.teacherProfile} element={<TeacherProfile/>} path={routes.teacherProfile}/>,
    <Route key={routes.schedule} element={<Schedule/>} path={routes.schedule}/>,
    <Route key={routes.missedClasses} element={<MissedClasses/>} path={routes.missedClasses}/>,
    <Route key={routes.rating} element={<Rating/>} path={routes.rating}/>,
    <Route key={routes.groups} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.teacher}><Groups/></SecurityLevelGuard>} path={routes.groups}/>,    
    <Route key={routes.journal} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><Journal/></SecurityLevelGuard>} path={routes.journal}/>,
    <Route key={routes.createHomeTask} element={<CreateHomeTask/>} path={routes.createHomeTask}/>,
    <Route key={routes.sendHomeTask} element={<SendHomeTask/>} path={routes.sendHomeTask}/>,
    <Route key={routes.createStudyMaterials} element={<CreateStudyMaterials/>} path={routes.createStudyMaterials}/>,
    <Route key={routes.adminPanel} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><AdminPanel/></SecurityLevelGuard>} path={routes.adminPanel}/>,
    <Route key={routes.studyMaterials} element={<StudyMaterials/>} path={routes.studyMaterials}/>,
    <Route key={routes.studyMaterialsCheckTeacher} element={<StudyMaterialsCheckTeacher/>} path={routes.studyMaterialsCheckTeacher}/>,
    <Route key={routes.pickJournalSubject} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.student}><PickJournalSubjects/></SecurityLevelGuard>} path={routes.pickJournalSubject}/>,
    <Route key={routes.editProfile} element={<SecurityLevelGuard blockedForAdmin securityLevel={securityLevels.student}><EditProfile/></SecurityLevelGuard>} path={routes.editProfile}/>,
    <Route key={routes.teachers} element={<Teachers/>} path={routes.teachers}/>,
    // <Route key={routes.scheduleCreate} element={<ScheduleCreate/>} path={routes.scheduleCreate}/>,
    <Route key={routes.faq} element={<FAQ/>} path={routes.faq}/>,
    <Route key={routes.editGroup} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><EditGroup/></SecurityLevelGuard>} path={routes.editGroup}/>,
    <Route key={routes.editUser} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><EditUser/></SecurityLevelGuard>} path={routes.editUser}/>,
    <Route key={routes.createTeacher} element={<SecurityLevelGuard isActiveRequired securityLevel={securityLevels.admin}><CreateTeacher/></SecurityLevelGuard>} path={routes.createTeacher}/>,
    <Route key={'*'} element={<NoMatch title="Не вдалося знайти сторінку" description="Спробуйте перезайти на сайт або повторіть спробу пізніше." is404/>} path={'*'}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}