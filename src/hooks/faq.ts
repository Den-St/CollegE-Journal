import { useEffect } from 'react';
import { useState } from 'react';
import axiosConfig from '../axiosConfig';
import { FaqType } from '../types/faq';

export const useFaq = () => {
    const [faqItems,setFaqItems] = useState<FaqType[]>([]);
    const [loading,setLoading] = useState(false);

    const fetchFaq = async () => {
        try{
            setLoading(true);
            const res = await (await axiosConfig.get('faq')).data as {questions:FaqType[]};
            console.log(res);
            setFaqItems(res.questions);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchFaq();
    },[]);

    return {faqItems,loading};
}