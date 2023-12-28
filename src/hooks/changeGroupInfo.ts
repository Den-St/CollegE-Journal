import { endpoints } from './../consts/endpoints';
import { ChangeGroupT } from './../types/group';
import { useForm } from "react-hook-form";
import { CreateUserT } from "../types/user";
import axiosConfig from '../axiosConfig';

export const useChangeGroupInfo = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<ChangeGroupT>();

    const onChangeGroupInfo = async (data:ChangeGroupT) => {
        try{
            const res = await axiosConfig.put(endpoints.changeGroup,data);
        }catch(err){
            console.error(err);
        }
    }

    return {onChangeGroupInfo,register,handleSubmit,setValue};
}