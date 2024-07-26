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
    const [attestations,setAttestations] = useState<{
        active:boolean,
        end:number,
        start:number,
        name:string
    }[]>();
    const [fillters,setFillters] = useState<{subject_id:string,month:number | null,onlyAdds:boolean}>({
        subject_id:searchParams.get('subject_id') || '',
        month: searchParams.get('month') !== 'null' ? +(searchParams.get('month') || new Date().getMonth) : null,
        onlyAdds:false
    });

    const token = useUserStore().user.token;
    const getColumnsByDate = (res:any) => {
        console.log('res',res);
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
    const fetch = async (_fillters?:{subject_id:string,month:string | undefined,onlyAdds:boolean}) => {
        if(!fillters.subject_id) return;
        setLoading(true);
        try{
            const res = (!!_fillters?.subject_id && _fillters?.subject_id !== fillters.subject_id) 
            ? await axiosConfig.post(endpoints.studentJournal,{end:-1,journal_id:_fillters?.subject_id || fillters?.subject_id,start:-1,attestations:(_fillters.onlyAdds || fillters.onlyAdds) ? 1 : 0},{headers:{Authorization:token}}) 
            : await axiosConfig.post(endpoints.studentJournal,{end:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.end || -1),journal_id:_fillters?.subject_id || fillters?.subject_id,start:(_fillters && !_fillters?.month) ? 0 : (attestations?.find(att => att.name === _fillters?.month)?.start || -1),attestations:(_fillters?.onlyAdds || fillters.onlyAdds) ? 1 : 0},{headers:{Authorization:token}});
            
            if(_fillters?.subject_id !== fillters.subject_id) setAttestations(res.data.attestations);
            if(!!res.data.attestations?.length && !_fillters) setAttestations(res.data.attestations);
            setJournal(res.data);
            if(_fillters?.month === '') {
                getColumnsByDate(res);
            }
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    },[]);

    const onChangeFillters = (fieldName:'group_id' | 'subject_id' | 'month',value:string | number | undefined) => {
        setFillters(prev => ({...prev,[fieldName]:value}));

        if(fieldName === 'month'){
            const newAtts = attestations?.map(att => att.name === value ? {...att,active:true} : {...att,active:false});
            setAttestations(newAtts);
            fetch({'subject_id':fillters.subject_id,'month':(value || '').toString(),onlyAdds:fillters['onlyAdds']});
        }else{
            fetch({'subject_id':fillters.subject_id,'month':attestations?.find(att => att.active)?.name || '',onlyAdds:fillters['onlyAdds'],[fieldName]:value});
        }

    }

    return {loading,journal,fillters,onChangeFillters,columnByMonth,attestations};
}