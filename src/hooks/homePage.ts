import { useState, useEffect } from "react";
import { HomePageDataT } from "../types/homePageData";

const fetchHomePageData = async () =>{
    return await fetch('https://54.37.74.248:5000/api/main-page').then(res => res.json());
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