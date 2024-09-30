import React from "react"
import axiosConfig from "../../axiosConfig"
import { endpoints } from "../../consts/endpoints"

type Props = {
    defaultValue?:string,
    className:string,
    onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string,
        subject_system:number
    },
    token:string,
    rowIndex:number,
    columnIndex:number,
    date:string,
    onMouseUp:() => void,
    onMouseMove:(e:React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
    studentIndex:number
}
const isValid = (value:string) => {
    if(value === "") return true;
    if(value === ".") return true;
    if(!isNaN(+value) && +value > 0 && +value <= 100) return true;
    if(isNaN(+value)){
        if(value.length === 1 && value[0]?.toLowerCase() === 'н' || value.length === 2 && value[1] === '/' || value.length === 3 && value[2]?.toLowerCase() === 'а') {
            value = value.toUpperCase();
            return true;
        }
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
export const getColorByValue = (value:string,system:number) => {
    if(!value) return "white";
    if(system === 100){
        if(+value < 60) return "#ED3434";
        if(+value >= 74) return "#2DEF40";
        if(+value >= 60 && +value <= 73) return "white";
    }else{
        if(+value <= 12 && +value > 6) return "#2DEF40";
        if(+value < 6) return "#ED3434";
    }
    if(value?.toLowerCase() === "н") return "#EFB42D";
    if(value?.toLowerCase() === "н/a") return "#ED3434";
    return "white";
}



export const CellInput:React.FC<Props> = ({defaultValue,className,onBlurData,token,rowIndex,columnIndex,date,onMouseUp,onMouseMove,studentIndex}) => {
    const keysToMoves:Record<string,() => void> = {
        'Enter':() => document.getElementById((rowIndex + 1) + ',' + columnIndex)?.focus(),
        'ArrowDown':() => document.getElementById((rowIndex + 1) + ',' + columnIndex)?.focus(),
        'ArrowUp':() => document.getElementById((rowIndex - 1) + ',' + columnIndex)?.focus(),
        'ArrowRight':() => document.getElementById((rowIndex) + ',' + (columnIndex + 1))?.focus(),
        'ArrowLeft':() => document.getElementById((rowIndex) + ',' + (columnIndex - 1))?.focus()
    }
    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        keysToMoves[e.key]?.();
    }
    const onFocus = () => {
        const columnSelect = document.getElementById('columnSelect_'+(columnIndex+1).toString());
        const columnDate = document.getElementById('columnDate_'+(columnIndex+1).toString());
        const student = document.getElementById('student_'+studentIndex);
        if(!columnDate || !student || !columnSelect) return;
        columnDate.style.border = "1px solid #EFB42D";
        columnSelect.style.border = "1px solid #EFB42D";
        student.style.border = "1px solid #EFB42D";
    }
    const onBlur = async (e:React.FocusEvent<HTMLInputElement>,onBlurData:{
        journal_id: string,
        subject_id: string,
        column_id: string,
        student_id:string,
        rowIndex:number,
        columnIndex:number,
        subject_system:number
    },token:string,) => {
    const columnSelect = document.getElementById('columnSelect_'+(columnIndex+1).toString());
    const columnDate = document.getElementById('columnDate_'+(columnIndex+1).toString());
    const student = document.getElementById('student_'+studentIndex);
    if(!columnDate || !student || !columnSelect) return;
    columnSelect.style.border = "1px solid transparent";
    columnDate.style.border = "1px solid transparent";
    student.style.border = "1px solid transparent";
    
    if(!isValid(e.target.value)) return;
    try{
        await axiosConfig.post(endpoints.journalEditCell,{...onBlurData,value:e.target.value},{headers:{Authorization:token}});
        const input = document.getElementById(onBlurData.rowIndex + ',' + onBlurData.columnIndex);
        if(input) {
            input.style.color = getColorByValue(e.target.value,onBlurData.subject_system);
            input.style.caretColor = "white";
        }
    }catch(err){
        console.error(err);
    }
}
    return <input onFocus={onFocus} onMouseMove={onMouseMove} onMouseDown={onMouseUp} id={rowIndex + ',' + columnIndex} onKeyDown={onKeyDown} style={{caretColor:'white',color:getColorByValue(defaultValue || "",onBlurData.subject_system),}} onBlur={(e) => onBlur(e,{...onBlurData,rowIndex,columnIndex},token,)} onChange={onChange} className={`journalRowItemCenterValue__input__text ${className}`} defaultValue={defaultValue}/>
}