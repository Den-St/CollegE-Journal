import { FocusEventHandler, useState } from "react"
import axiosConfig from "../../axiosConfig"
import { endpoints } from "../../consts/endpoints"

type Props = {
    disabled:boolean,
    defaultValue?:string,
    onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string
    },
    token:string
}

export const CellInput:React.FC<Props> = ({defaultValue,disabled,onBlurData,token}) => {
    // const [error,setError] = useState();
    const isValid = (value:string) => {
        if(value === "") return true;
        if(!isNaN(+value) && +value > 0 && +value <= 100) return true;
        if(isNaN(+value)){
            if(value.length === 1 && value[0] === 'н') return true;
            if(value.length === 2 && value[1] === '/') return true;
            if(value.length === 3 && value[2] === 'а') return true;
        }
        return false;
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(!isValid(e.target.value)){
            e.preventDefault();
            e.stopPropagation();
            e.target.value = "";
            return;
        }
    };
    const onBlur = async (e:React.FocusEvent<HTMLInputElement>) => {
        if(!isValid(e.target.value)) return;
        try{
            const res = await axiosConfig.post(endpoints.journalEditCell,{...onBlurData,value:e.target.value},{headers:{Authorization:token}});
        }catch(err){
            console.error(err);
        }
    }
    return <input disabled={disabled} onBlur={onBlur} onChange={onChange} className='journalRowItemCenterValue__input__text' defaultValue={defaultValue}/>
}