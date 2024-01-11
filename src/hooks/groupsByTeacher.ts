import { JournalGroupT } from './../types/journalGroup';
import { useEffect } from 'react';
import { endpoints } from './../consts/endpoints';
import { getToken } from './../helpers/auth';
import { useUserStore } from './../store/userStore';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { GroupT } from '../types/group';
import { useTeachersGroupsStore } from '../store/teachersGroupsStore';

export const useGroupsByTeacher = () => {
    const [loading,setLoading] = useState(false);
    // const [groups,setGroups] = useState<GroupT[]>([]);
    const groups = useTeachersGroupsStore().groups;
    const setGroups = useTeachersGroupsStore().setGroups;

    const teacher_id = useUserStore().user.user_id;
    const localToken = useUserStore().user.token;
    const cookieToken = getToken();
    const [groupesByGrade,setGroupsByGrage] = useState<Record<string,JournalGroupT[]>>();

    const fetch = async () => {
        if(groups.length) return;
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.userGroups,{headers:{Authorization:localToken || cookieToken}});
            setGroups(res.data);
            console.log(res.data);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }  
    console.log('groups',groups);
    useEffect(() => {
        fetch();
    },[]);
    
    useEffect(() => {
        if(!groups.length) return;
        //@ts-ignore
        setGroupsByGrage(Object.groupBy(groups,({journal_group_full_name}) => journal_group_full_name.split('-')[1][0]));
    },[groups]);

    return {loading,groups,groupesByGrade}
}