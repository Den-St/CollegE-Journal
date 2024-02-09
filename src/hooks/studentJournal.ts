import { useSearchParams } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';
import { useTeachersGroupsStore } from '../store/teachersGroupsStore';
import { useStudentJournalSubjectsStore } from '../store/studentJournalSubjects';
import { StudentJournalT } from '../types/studentJournal';

export const useStudentJournal = () => {
    const [journal,setJournal] = useState<StudentJournalT>();
    const [loading,setLoading] = useState(false);
    const journalId = useStudentJournalSubjectsStore().journalSubjects?.journal_id;
    const [fillters,setFillters] = useState<{subject_id:string,month:number}>({
        subject_id:useSearchParams()[0].get('subject_id') || '',
        month: +(useSearchParams()[0].get('month') || new Date().getMonth)
    });
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;

    const fetch = async (_fillters?:{subject_id:string,month:number}) => {
        if(!journalId) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.studentJournal,{subject_id:_fillters?.subject_id || fillters?.subject_id,journal_id:journalId,month:-1},{headers:{Authorization:localToken || cookieToken}});
            setJournal(res.data);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[journalId,])

    const onChangeFillters = (fieldName: 'subject_id' | 'month',value:string | number) => {
        setFillters(prev => ({...prev,[fieldName]:value}));
        fetch({...fillters,[fieldName]:value});
    }

    return {loading,journal,fillters,onChangeFillters};
}