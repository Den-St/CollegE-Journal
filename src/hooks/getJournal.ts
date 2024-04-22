import { useSearchParams } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';
import { TeacherJournalT } from '../types/teacherJournal';

export const useGetTeacherJournal = () => {
    const [journal,setJournal] = useState<TeacherJournalT>();
    const [loading,setLoading] = useState(false);
    const [attestations,setAttestations] = useState<{
        active:boolean,
        end:number,
        start:number,
        name:string
    }[]>();
    const groupId = useSearchParams()[0].get('group_id');
    const [fillters,setFillters] = useState<{group_id:string,subject_id:string}>({
        group_id:groupId || '',
        subject_id:useSearchParams()[0].get('subject_id') || '',
    });
    const token = useUserStore().user.token || getToken();
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();

    const fetch = async (_fillters?:{group_id:string,subject_id:string,month:string | undefined}) => {
        if(!fillters.subject_id && !_fillters?.subject_id) return;
        setLoading(true);
        try{
            const res = (!!_fillters?.subject_id && _fillters?.subject_id !== fillters.subject_id) 
            ? await axiosConfig.post(endpoints.journal,{end:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,start:-1},{headers:{Authorization:token}}) 
            : await axiosConfig.post(endpoints.journal,{end:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.end || -1),journal_id:_fillters?.subject_id || fillters?.subject_id,start:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.start || -1)},{headers:{Authorization:token}});
            
            if(_fillters?.subject_id !== fillters.subject_id) setAttestations(res.data.attestations);
            if(!!res.data.attestations?.length && !_fillters) setAttestations(res.data.attestations);
            setJournal(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[])

    const onChangeFillters = (fieldName:'group_id' | 'subject_id' | 'month',value:string | number | undefined) => {
        setFillters(prev => ({...prev,[fieldName]:value}));

        if(fieldName === 'month'){
            const newAtts = attestations?.map(att => att.name === value ? {...att,active:true} : {...att,active:false});
            setAttestations(newAtts);
            fetch({'group_id':fillters.group_id,'subject_id':fillters.subject_id,'month':(value || '').toString()});
        }else{
            fetch({'group_id':fillters.group_id,'subject_id':fillters.subject_id,'month':attestations?.find(att => att.active)?.name || '',[fieldName]:value});
        }

    }

    const isDisabledByDate = (dateString:string) => {
        if(!+dateString.includes('\n') || +dateString.split('\n')?.[1].split('.')[1] > currentMonth) {
            return true;
        }
        if(+dateString.split('\n')?.[1].split('.')[1] === currentMonth && +dateString.split('\n')[1].split('.')[0] > currentDate){
            return true;
        }
        return false;
    }
    const onChangeLessonType = async (column_id:string,lesson_type:string) => {
        try{
            await axiosConfig.post(endpoints.journalEditCellType,{column_id,lesson_type,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
            const lessonTypeP = document.getElementById(column_id);
            if(lessonTypeP?.innerText){
                lessonTypeP.innerText = lesson_type;
            }
        }catch(err){    
            console.error(err);
        }
    }
    const onBlurChangeLessonTopic = async (column_id:string,lesson_topic:string) => {
        try{
            await axiosConfig.post(endpoints.journalEditCellTopic,{column_id,lesson_topic,subject_id:fillters.subject_id,journal_id:journal?.journal_id},{headers:{Authorization:token}});
        }catch(err){
            console.error(err);
        }
    }

    return {loading,journal,fillters,onChangeFillters,token,isDisabledByDate,onChangeLessonType,onBlurChangeLessonTopic,currentMonth,attestations};
}