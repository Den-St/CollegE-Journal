import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { getToken } from "../helpers/auth";
import { useAdminGroupsStore } from "../store/adminGroupsStore";
import { useUserStore } from "../store/userStore";
import { GroupT } from "../types/group";

export const useGetAdminGroups = () => {
    // const [groups,setGroups] = useState<GroupT[]>([]);
    const setGroups = useAdminGroupsStore().setGroups;
    const groups = useAdminGroupsStore().groups;
    const [groupesByGrade,setGroupsByGrage] = useState<Record<string,GroupT[]>>();
    const [loading,setLoading] = useState(false);
    const localToken = getToken();
    const cookieToken = useUserStore().user.token;
    
    const fetchGroups = async () => {
        if(groups.length) return;
        setLoading(true);
        try{
            const res = await axiosConfig.get(endpoints.getGroups,{headers:{Authorization:localToken || cookieToken}});
            setGroups(res.data as GroupT[]);
            //@ts-ignore
            setGroupsByGrage(Object.groupBy(res.data,({group_full_name}) => group_full_name.split('-')[1][0]));
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        //@ts-ignore
        setGroupsByGrage(Object.groupBy(groups,({group_full_name}) => group_full_name.split('-')[1][0]));
    },[groups]);
    
    useEffect(() => {fetchGroups()},[]);

    return {groups,refetchGroups:fetchGroups,groupsLoading:loading,groupesByGrade};
}