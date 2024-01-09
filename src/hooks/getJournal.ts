import { useSearchParams } from 'react-router-dom';
import { endpoints } from './../consts/endpoints';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { getToken } from '../helpers/auth';
import { useUserStore } from '../store/userStore';

export const useGetJournal = () => {
    const [journal,setJournal] = useState();
    const [loading,setLoading] = useState(false);
    const [fillters,setFillters] = useState<{group_id:string,subject_id:string,month:number}>({
        group_id:useSearchParams()[0].get('group_id') || '',
        subject_id:useSearchParams()[0].get('subject_id') || '',
        month: +(useSearchParams()[0].get('month') || new Date().getMonth)
    });
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;

    const fetch = async (_fillters?:{group_id:string,subject_id:string,month:number}) => {
        setLoading(true);
        try{
            // const res = await axiosConfig.post(endpoints.journal,_fillters || fillters,{headers:{Authorization:localToken || cookieToken}});
            // setJournal(res.data);
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

    return {loading,journal,fillters,onChangeFillters};
}