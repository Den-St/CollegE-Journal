import { GroupT } from './../types/group';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { routes } from "../consts/routes";
import { getToken } from "../helpers/auth";
import { useGroupsStore } from "../store/groupsStore";
import { useUserStore } from "../store/userStore";
import { CreateGroupT } from "../types/group";

export const useCreateGroupForm = (refetchGroups:() => void) => {
    const navigate = useNavigate();
    const [createGroupModalOpened,setCreateGroupModalOpened] = useState(false);
    const [errorCode,setErrorCode] = useState<number>();
    const addGroup = useGroupsStore().addGroup;

    const onOpenCreateGroupModal = () => {
        setCreateGroupModalOpened(true);
    }
    const onCloseCreateGroupModal = () => {
        setCreateGroupModalOpened(false);
    }
    const {
        register,
        handleSubmit,
    } = useForm<CreateGroupT>();
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;

    const onCreateGroup = async (data:CreateGroupT) => {
        data.group_full_name = data.group_full_name.trim();
        if(data.group_full_name.length !== 4 && data.group_full_name.length !== 5) {
            setErrorCode(-1);
            return;
        }
        const oneLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1] === '-' && !isNaN(+data.group_full_name[2]) && !isNaN(+data.group_full_name[3]) && +data.group_full_name[2] > 0 && +data.group_full_name[2] < 5 && +data.group_full_name[3] > 0 && +data.group_full_name[3] < 5;
        if(data.group_full_name.length === 4 && !oneLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        const doubleLetterNameCondition = data.group_full_name[0].match(/^[А-Я]/u) && data.group_full_name[1].match(/^[а-я]/u) && data.group_full_name[2] === '-' && !isNaN(+data.group_full_name[3]) && !isNaN(+data.group_full_name[4]) && +data.group_full_name[3] > 0 && +data.group_full_name[3] < 5 && +data.group_full_name[4] > 0 && +data.group_full_name[4] < 5;
        if(data.group_full_name.length === 5 && !doubleLetterNameCondition){
            setErrorCode(-1);
            return;
        }
        try{
            const res = await axiosConfig.post(endpoints.createGroup,data,{headers:{'Authorization':localToken || cookieToken}});
            onCloseCreateGroupModal();
            // refetchGroups();
            console.log('res',res.data);
            if(res.status === 201) {
                setErrorCode(undefined);
                addGroup({group_id:res.data.inserted_id,group_full_name:data.group_full_name});
                navigate(routes.editGroup.replace(':id',res.data.inserted_id))
            }else{
                setErrorCode(res.data.status)
            }
        }catch(err){
            setErrorCode(0);
            console.error(err);
        }
    }
    return {createGroupModalOpened,onCloseCreateGroupModal,onOpenCreateGroupModal,handleSubmit,register,onCreateGroup,errorCode};
}
