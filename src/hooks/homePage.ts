import { useState, useEffect } from "react";
import { HomePageDataT } from "../types/homePageData";

const fetchHomePageData = async () =>{
    return await fetch('https://54.37.74.248:5000/api/main-page', {
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
        "Content-Type": "application/json",
        },
    }).then(res => res.json());
}

export const useHomePage = () => {
    const [homePageData,setHomePageData] = useState<HomePageDataT>();
    const [loading,setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const res = await fetchHomePageData() as HomePageDataT;
        console.log('res',res);
        setHomePageData(res);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    },[]); 

    return {loading,homePageData};
}