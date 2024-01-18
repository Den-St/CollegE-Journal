import { useGetSupervisors } from './getSupervisors';
import { useEffect } from 'react';
import { SupervisorT } from './../types/supervisor';
import { useState } from 'react';
import { getToken } from './../helpers/auth';
import { endpoints } from './../consts/endpoints';
import { ChangeGroupT, GroupT } from './../types/group';
import { useForm } from "react-hook-form";
import { CreateUserT } from "../types/user";
import axiosConfig from '../axiosConfig';
import { useUserStore } from '../store/userStore';
import { validGroupPrefixes } from '../consts/validGroupPrefixes';

export const useChangeGroupInfo = (group?:GroupT) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<ChangeGroupT>();
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;
    const [chosenSupervisorId,setChosenSupervisorId] = useState<string | null>(null);
    const [incorrectGroupName,setIncorrectGroupName] = useState(false);
    console.log(chosenSupervisorId, group?.group_supervisor);
    useEffect(() => {
        if(group?.group_supervisor?.user_id){
            setChosenSupervisorId(group.group_supervisor.user_id);
        }
    },[group]);

    const onChangeGroupInfo = async (data:ChangeGroupT) => {
        if(chosenSupervisorId === group?.group_supervisor?.user_id && group?.group_full_name === data.group_full_name) return;
        data.group_full_name = data.group_full_name.trim() || group?.group_full_name.trim() || '';
        if(data.group_full_name.length !== 4 && data.group_full_name.length !== 5) {
            setIncorrectGroupName(true);
            return;
        }
        const oneLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1] === '-' && !isNaN(+data.group_full_name[2]) && !isNaN(+data.group_full_name[3]) && +data.group_full_name[2] > 0 && +data.group_full_name[2] < 5 && +data.group_full_name[3] > 0 && +data.group_full_name[3] < 5 && validGroupPrefixes.includes(data.group_full_name[0]);
        if(data.group_full_name.length === 4 && !oneLetterNameCondition){
            setIncorrectGroupName(true);
            return;
        }
        const doubleLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1].match(/^[а-я]/u) && data.group_full_name[2] === '-' && !isNaN(+data.group_full_name[3]) && !isNaN(+data.group_full_name[4]) && +data.group_full_name[3] > 0 && +data.group_full_name[3] < 5 && +data.group_full_name[4] > 0 && +data.group_full_name[4] < 5 && validGroupPrefixes.includes(data.group_full_name[0] + data.group_full_name[1]);
        if(data.group_full_name.length === 5 && !doubleLetterNameCondition){
            setIncorrectGroupName(true);
            return;
        }
        try{
            const res = await axiosConfig.post(endpoints.changeGroup,{group_full_name:data.group_full_name,group_id:group?.group_id,group_supervisor:chosenSupervisorId || group?.group_supervisor?.user_id},{headers:{Authorization:localToken || cookieToken}});
        }catch(err){
            console.error(err);
        }
    }
    const onChooseSupervisor = (id:string | null) => {
        setChosenSupervisorId(id);
    }

    return {incorrectGroupName,onChangeGroupInfo,changeGroupRegister:register,changeGroupHangeSubmit:handleSubmit,changeGroupSetValue:setValue,onChooseSupervisor,chosenSupervisorId};
}