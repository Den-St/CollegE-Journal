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
import { JournalColumnT, StudentJournalT } from '../types/studentJournal';

export const useStudentJournal = () => {
    const [journal,setJournal] = useState<StudentJournalT>();
    const [columnByMonth,setColumnsByMonth] = useState<JournalColumnT[][]>([[]]);
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [fillters,setFillters] = useState<{subject_id:string,month:number}>({
        subject_id:searchParams.get('subject_id') || '',
        month: +(searchParams.get('month') || new Date().getMonth)
    });

    const localToken = useUserStore().user.token;

    const fetch = async (_fillters?:{subject_id:string,month:number}) => {
        if(!fillters.subject_id) return;
        setLoading(true);
        try{
            const res = await axiosConfig.post(endpoints.studentJournal,{journal_id:_fillters?.subject_id || fillters.subject_id,month:-1,year:-1},{headers:{Authorization:localToken}});
            setJournal(res.data);
            const _columnsByDate:JournalColumnT[][] = [[]];
            console.log(res.data.columns)
            for(let i = 1;i < res.data.columns.length;i++){
                if(res.data.columns[i].date.split('.')[1].slice(0,2) === res.data.columns[i - 1].date.split('.')[1].slice(0,2)){
                    _columnsByDate[_columnsByDate.length - 1].push(res.data.columns[i]);
                }else{
                    _columnsByDate.push([res.data.columns[i]]);
                }
            }
            setColumnsByMonth(_columnsByDate);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    },[])

    const onChangeFillters = (fieldName: 'subject_id' | 'month',value:string | number) => {
        setFillters(prev => ({...prev,[fieldName]:value}));
        fetch({...fillters,[fieldName]:value});
        // setSearchParams({[fieldName]:value});
    }

    return {loading,journal,fillters,onChangeFillters,columnByMonth};
}