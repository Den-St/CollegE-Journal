import { useEffect } from 'react';
import { useState } from 'react';
import { endpoints } from './../consts/endpoints';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from './../store/userStore';
import { StudentJournalSubjectsT } from '../types/studentJournalSubjects';

export const useStudentSubjects = () => {
    const localToken = useUserStore().user.token;
    const cookieToken = getToken();
    const [loading,setLoading] = useState(false);
    const [journalSubjects,setJournalSubjects] = useState<StudentJournalSubjectsT>();

    const fetch = async () => {
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.studentGroupSubjects,{headers:{Authorization:localToken || cookieToken}});
            console.log(res.data);
            setJournalSubjects(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetch();
    },[]);

    return {journalSubjects,loading};
}