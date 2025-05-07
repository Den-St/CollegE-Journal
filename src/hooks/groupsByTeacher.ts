import { securityLevels } from './../consts/securityLevels';
import { JournalGroupT } from './../types/journalGroup';
import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import { useUserStore } from './../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { useTeachersGroupsStore } from '../store/teachersGroupsStore';
import {myGroupBy} from './../helpers/groupBy';
import { set } from 'date-fns';

export const useGroupsByTeacher = () => {
    const [loading,setLoading] = useState(false);
    // const [groups,setGroups] = useState<GroupT[]>([]);
    const groups = useTeachersGroupsStore().groups;
    const prevSemester = useTeachersGroupsStore().semester;
    const setGroups = useTeachersGroupsStore().setGroups;
    const setPrevSemester = useTeachersGroupsStore().setSemester;

    const [semester, setSemester] = useState(prevSemester || 2);

    const security_level = useUserStore().user.security_level;
    const localToken = useUserStore().user.token;
    const [groupesByGrade,setGroupsByGrade] = useState<Record<string,JournalGroupT[]>>();
    const fetch = async (_semester?: number) => {
        setLoading(true);
        setPrevSemester(_semester || semester);
        try{
            const res = await axiosConfig.get(endpoints.userGroups+`?previous_semester=${(_semester || semester) !== 2}`,{headers:{Authorization:localToken}});
            setGroups(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    const onChangeSemester = (value:number) => {
        setSemester(value);
        fetch(value);
    }
    const cashed_fetch = async () => {
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.userGroups+`?previous_semester=${prevSemester !== 2}`,{headers:{Authorization:localToken}});
            setGroups(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(!localToken || !security_level || security_level < securityLevels.teacher) return;
        if(prevSemester === null) {fetch()}
        else if(!groups.length) {
            cashed_fetch();
        }
    },[]);
    
    useEffect(() => {
        if(!groups.length) return;
        //@ts-ignore
        setGroupsByGrade(myGroupBy(groups,({journal_group_full_name}) => journal_group_full_name.split('-')?.[1]?.[0]));
    },[groups]);

    return {loading,groups,groupesByGrade, semester, onChangeSemester}
}