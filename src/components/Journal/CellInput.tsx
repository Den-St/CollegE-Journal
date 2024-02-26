import React from "react"
import axiosConfig from "../../axiosConfig"
import { CellValueToColor } from "../../consts/cellVaueToColor"
import { endpoints } from "../../consts/endpoints"

type Props = {
    defaultValue?:string,
    onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string
    },
    token:string,
    rowIndex:number,
    columnIndex:number
}
const isValid = (value:string) => {
    if(value === "") return true;
    if(value === ".") return true;
    if(!isNaN(+value) && +value > 0 && +value <= 100) return true;
    if(isNaN(+value)){
        if(value.length === 1 && value[0].toLowerCase() === 'н') return true;
        // if(value.length === 2 && value[1] === '/') return true;
        // if(value.length === 3 && value[2] === 'а') return true;
    }
    return false;
}
const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(!isValid(e.target.value)){
        e.preventDefault();
        e.stopPropagation();
        e.target.value = e.target.value.slice(0,e.target.value.length - 1);
        return;
    }
};
export const getColorByValue = (value:string) => {
    if(value !== "" && +value <= 12 && +value > 6) return "#2DEF40";
    if(value !== "" && +value < 60) return "#ED3434";
    if(+value >= 60) return "#2DEF40";
    if(value === "н" || value === "Н") return "#EFB42D";
    if(!value) return "white";
    return "white";
}
const onBlur = async (e:React.FocusEvent<HTMLInputElement>,onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string,
        rowIndex:number,
        columnIndex:number
    },token:string) => {
    if(!isValid(e.target.value)) return;
    try{
        await axiosConfig.post(endpoints.journalEditCell,{...onBlurData,value:e.target.value},{headers:{Authorization:token}});
        const input = document.getElementById(onBlurData.rowIndex + ',' + onBlurData.columnIndex);
        if(input) {
            input.style.color = getColorByValue(e.target.value);
            input.style.caretColor = "white";
        }
    }catch(err){
        console.error(err);
    }
}
export const CellInput:React.FC<Props> = ({defaultValue,onBlurData,token,rowIndex,columnIndex}) => {
    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' || e.key === 'ArrowDown'){
            document.getElementById((rowIndex + 1) + ',' + columnIndex)?.focus();
            return;
        }
        if(e.key === 'ArrowUp'){
            document.getElementById((rowIndex - 1) + ',' + columnIndex)?.focus();
        }
    }

    return <input id={rowIndex + ',' + columnIndex} onKeyDown={onKeyDown} style={{caretColor:'white',color:getColorByValue(defaultValue || ""),}} onBlur={(e) => onBlur(e,{...onBlurData,rowIndex,columnIndex},token)} onChange={onChange} className='journalRowItemCenterValue__input__text' defaultValue={defaultValue}/>
}