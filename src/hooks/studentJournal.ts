import { useNavigate, useNavigation } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [journal,setJournal] = useState<StudentJournalT>();
    const [columnByMonth,setColumnsByMonth] = useState<JournalColumnT[][]>([[]]);
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [fillters,setFillters] = useState<{subject_id:string,month:number | null}>({
        subject_id:searchParams.get('subject_id') || '',
        month: searchParams.get('month') !== 'null' ? +(searchParams.get('month') || new Date().getMonth) : null
    });

    const localToken = useUserStore().user.token;
    const getColumnsByDate = (res:any) => {
        const _columnsByDate:JournalColumnT[][] = [[res.data.columns[0]]];
        for(let i = 1;i < res.data.columns.length;i++){
            if(res.data.columns[i].date.split('.')?.[1]?.slice(0,2) === res.data.columns[i - 1].date.split('.')?.[1]?.slice(0,2) || !res.data.columns[i].date.includes('\n')){
                _columnsByDate[_columnsByDate.length - 1].push(res.data.columns[i]);
            }else{
                _columnsByDate.push([res.data.columns[i]]);
            }
        }
        setColumnsByMonth(_columnsByDate);
    }
    const fetch = async (_fillters?:{subject_id:string,month:number | null}) => {
        if(!fillters.subject_id) return;
        setLoading(true);
        try{
            console.log('fetch');
            const res = await axiosConfig.post(endpoints.studentJournal,{journal_id:_fillters?.subject_id || fillters.subject_id,month:-1,year:-1},{headers:{Authorization:localToken}});
            setJournal(res.data);
            if(_fillters?.month === null) {
                getColumnsByDate(res);
            }
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch(fillters);
    },[])

    const onChangeFillters = (fieldName: 'subject_id' | 'month',value:string | number | null) => {
        const localFillters = {...fillters,[fieldName]:value || null}
        setFillters(prev => ({...prev,[fieldName]:value}));
        // fetch({...fillters,[fieldName]:value || null});
        navigate(`/journal?subject_id=${localFillters.subject_id}&month=${localFillters.month}`)
        
        // setSearchParams({[fieldName]:value});
    }

    return {loading,journal,fillters,onChangeFillters,columnByMonth};
}