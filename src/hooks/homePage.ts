import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { HomePageDataT } from "../types/homePageData";

const fetchHomePageData = async () =>{
    return await axiosConfig.get('main-page').then(res => res.data);
}

export const useHomePage = () => {
    const [homePageData,setHomePageData] = useState<HomePageDataT>();
    const [loading,setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try{
            const res = await fetchHomePageData() as HomePageDataT;
            setHomePageData(res);
        }catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        document.title = "Електроний журнал";
    },[]);
    
    useEffect(() => {
        fetchData();
    },[]); 

    return {loading,homePageData};
}