import { DatePicker, DatePickerProps, message, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LinkBack } from "../../assets/components/LinkBack/LinkBack";
import { LeftArrowSvg } from "../../assets/svgs/leftArrowSvg";
import { StarSvg } from "../../assets/svgs/starSvg"
import axiosConfig from "../../axiosConfig";
import { defaultAvatar } from "../../consts/defaultAvatar"
import { emailPattern } from "../../consts/emailPattern";
import { endpoints } from "../../consts/endpoints";
import { routes } from "../../consts/routes";
import { securityLevels } from "../../consts/securityLevels";
import { namePattern } from "../../helpers/namePattern";
import { useGetUserProfile } from "../../hooks/getUserProfile";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import { EditUserStudentT, EditUserTeacherT, UserT } from "../../types/user";
import { UserProfileT } from "../../types/userProfile";
import { Loader } from "../Loader/Loader";
import '../MyProfile/studentProfile.scss';
import { EditStudentForm } from "./EditStudentForm";
import { EditTeacherForm } from "./EditTeacherForm";
const {Option} = Select;

export const EditUser = () => {
    const theme = useThemeStore().theme;
    const mySecurityLevel = useUserStore().user.security_level;
    const {user,loading} = useGetUserProfile();

    return <div className={`studentProfile__container ${theme}`} style={{'alignItems':'flex-start',paddingLeft:mySecurityLevel !== securityLevels.admin ? '200px' : '7%'}}>
        {loading ? <Loader/> : user && (user?.user_type === "teacher" ? 
        <EditTeacherForm user={user}/>
        :
        <EditStudentForm user={user}/>)
        }
    </div>
}


