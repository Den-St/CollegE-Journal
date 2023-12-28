import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { CreateUserT } from "../types/user";
import { useGetGroups } from "./getGroups";

export const useCreateUser = () => {
    const {groups} = useGetGroups();
    const groupId = useParams().id;
    console.log(groupId)
    const onCreateUser = async (data:CreateUserT) => {
        console.log(data);
        try{
            const res = await axiosConfig.post(endpoints.addUser,{...data,user_type:'student',group_id:groupId});
            console.log(res.status);
            console.log(res.data);
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
