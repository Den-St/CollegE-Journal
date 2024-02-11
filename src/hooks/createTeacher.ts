import { GroupT } from './../types/group';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useUserStore } from "../store/userStore";
import { CreateUserT, UserT } from "../types/user";
import { useGetAdminGroups } from "./getGroups";

export const useCreateTeacher = (group?:GroupT) => {
    // const {groups} = useGetGroups();
    const groupId = useParams().id;
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;
    const [createUserErrorCode,setCreateUserErrorCode] = useState<number>();
    const [createUserFormErrorMessage,setErrorMessage] = useState('');
    const [createUserLoading,setCreateUserLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<CreateUserT>();

    const onCreateUser = async (data:CreateUserT) => {
        if(!data.education_form) {
            setErrorMessage('Оберіть форму навчання!')
            return;
        }
        if(!data.education_type){
            setErrorMessage('Оберіть тип навчання!')
            return;
        }
        if(!data.full_name.includes(' ')){
            setErrorMessage('Некорректно введене ПІБ!')
            return;
        }

        try{
            setCreateUserLoading(true);
            const res = await axiosConfig.post(endpoints.addUser,{...data,user_type:'student',group_id:groupId,full_name:data.full_name.trim()},{headers:{Authorization:localToken || cookieToken}});
            group?.group_students?.push({full_name:data.full_name,avatar:'',mailbox_address:data.mailbox_address,student_id:res.data.user_password});
            setCreateUserErrorCode(undefined);
            reset();
            setValue('education_form',null);
            setValue('education_type',null);
            setErrorMessage('');
        }catch(err){
            //@ts-ignore
            const errorStatus = (err as AxiosError).response?.data?.status;
            setCreateUserErrorCode(errorStatus);
            console.error(err as AxiosError);
        }finally{
            setCreateUserLoading(false)
        }
    }   

    return {createUserLoading,onCreateUser,createUserRegister:register,handleSubmit,createUserSetValue:setValue,createUserErrorCode,createUserWatch:watch,createUserFormErrors:errors,createUserFormErrorMessage};
}
