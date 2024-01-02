import { getToken } from './../helpers/auth';
import { endpoints } from './../consts/endpoints';
import { ChangeGroupT } from './../types/group';
import { useForm } from "react-hook-form";
import { CreateUserT } from "../types/user";
import axiosConfig from '../axiosConfig';
import { useUserStore } from '../store/userStore';

export const useChangeGroupInfo = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<ChangeGroupT>();
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;

    const onChangeGroupInfo = async (data:ChangeGroupT) => {
        try{
            const res = await axiosConfig.put(endpoints.changeGroup,data,{headers:{Authorization:localToken || cookieToken}});
        }catch(err){
            console.error(err);
        }
    }

    return {onChangeGroupInfo,changeGroupRegister:register,changeGroupHangeSubmit:handleSubmit,changeGroupSetValue:setValue};
}