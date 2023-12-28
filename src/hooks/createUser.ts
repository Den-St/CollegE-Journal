import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { CreateUserT } from "../types/user";
import { useGetGroups } from "./getGroups";

export const useCreateUser = () => {
    const {groups} = useGetGroups();
    const groupId = useParams().id;
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;
    
    const onCreateUser = async (data:CreateUserT) => {
        console.log(data);
        try{
            const res = await axiosConfig.post(endpoints.addUser,{...data,user_type:'student',group_id:groupId},{headers:{Authorization:localToken || cookieToken}});
        }catch(err){
            console.error(err);
        }
    }   
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<CreateUserT>();
    return {onCreateUser,groups,register,handleSubmit,setValue};
}
