import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { CreateUserT } from "../types/user";
import { useGetGroups } from "./getGroups";

export const useCreateUser = () => {
    // const {groups} = useGetGroups();
    const groupId = useParams().id;
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;
    const [createUserErrorCode,setCreateUserErrorCode] = useState<number>();
    console.log(createUserErrorCode);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset
    } = useForm<CreateUserT>();

    const onCreateUser = async (data:CreateUserT) => {
        console.log(data);
        if(!data.education_form || !data.education_type) return;
        try{
            const res = await axiosConfig.post(endpoints.addUser,{...data,user_type:'student',group_id:groupId},{headers:{Authorization:localToken || cookieToken}});
            setCreateUserErrorCode(undefined);
            reset();
            setValue('education_form','');
            setValue('education_type','');
        }catch(err){
            //@ts-ignore
            const errorStatus = (err as AxiosError).response?.data?.status;
            setCreateUserErrorCode(errorStatus);
            console.error(err as AxiosError);
        }
    }   

    return {onCreateUser,createUserRegister:register,handleSubmit,createUserSetValue:setValue,createUserErrorCode};
}
