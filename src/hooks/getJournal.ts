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
    const journalId = useTeachersGroupsStore().groups.find(group => group.journal_group === groupId)?.journal_id;
    const [fillters,setFillters] = useState<{group_id:string,subject_id:string,month:number}>({
        group_id:groupId || '',
        subject_id:useSearchParams()[0].get('subject_id') || '',
        month: +(useSearchParams()[0].get('month') || new Date().getMonth)
    });
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;

    const fetch = async (_fillters?:{group_id:string,subject_id:string,month:number}) => {
        if(!journalId) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.journal,{subject_id:_fillters?.subject_id || fillters?.subject_id,journal_id:journalId},{headers:{Authorization:localToken || cookieToken}});
            setJournal(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[journalId,])

    const onChangeFillters = (fieldName:'group_id' | 'subject_id' | 'month',value:string | number) => {
        setFillters(prev => ({...prev,[fieldName]:value}));
        fetch({...fillters,[fieldName]:value});
    }

    return {loading,journal,fillters,onChangeFillters};
}