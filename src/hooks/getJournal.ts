import { useSearchParams } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useTeachersGroupsStore } from '../store/teachersGroupsStore';
import { TeacherJournalT } from '../types/teacherJournal';

export const useGetTeacherJournal = () => {
    const [journal,setJournal] = useState<TeacherJournalT>();
    const [loading,setLoading] = useState(false);
    const groupId = useSearchParams()[0].get('group_id');
    // const journalId = useTeachersGroupsStore().groups.find(group => group.journal_group === groupId)?.journal_id;
    const [fillters,setFillters] = useState<{group_id:string,subject_id:string,month:number}>({
        group_id:groupId || '',
        subject_id:useSearchParams()[0].get('subject_id') || '',
        month: +(useSearchParams()[0].get('month') || new Date().getMonth)
    });
    const token = useUserStore().user.token || getToken();
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();

    const fetch = async (_fillters?:{group_id:string,subject_id:string,month:number}) => {
        if(!fillters.subject_id && !_fillters?.subject_id) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.journal,{year:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,month:-1},{headers:{Authorization:token}});
            setJournal(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[])

    const onChangeFillters = (fieldName:'group_id' | 'subject_id' | 'month',value:string | number) => {
        setFillters(prev => ({...prev,[fieldName]:value}));
        fetch({...fillters,[fieldName]:value});
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

    return {loading,journal,fillters,onChangeFillters,token,isDisabledByDate,onChangeLessonType,onBlurChangeLessonTopic,currentMonth};
}