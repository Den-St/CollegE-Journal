import { MonthAttesationsTable } from './../components/Journal/MonthAttestations/MonthAttestationsTable';
import { JournalAttestationT } from './../types/journalAttestation';
import { MonthAttesationsTableAttestationsT, MonthAttestationsFilltersT, MonthAttestationsTableT } from './../types/mothAttestationTable';
import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosConfig from "../axiosConfig";
import { endpoints } from "../consts/endpoints";
import { routes } from "../consts/routes";
import { getToken } from "../helpers/auth";
import { getMondaysAndSaturdays } from "../helpers/getModaysAndSaturdays";
import { getStartAndEnd } from "../helpers/getStartAndEndOfWeek";
import { useUserStore } from "../store/userStore";
import { AbsenceTableT, AbsenceTableFilltersT } from "../types/absenceTable";
import _debounce from 'lodash/debounce';

type StudentMonthAttestationTableT = {
    attestation_list: [
      {
        active:boolean
        end_date: number
        month:string
        start_date:number
      }
    ],
    columns: [
      {
        students: [
          {
            grade: string
            student_id: string
          }
        ],
        subject_name: string
        subject_system: number
        subject_teacher: string
      }
    ],
    group_name: string
    student_list: [
      {
        full_name: string
        student_id: string
      }
    ]
}
type StudentMonthAttestationsTableFilltersT = {
    month:string
}

export const useGetStudentMonthAttesationsTable = () => {
    const navigate = useNavigate();
    const [table,setTable] = useState<StudentMonthAttestationTableT>();
    const [loading,setLoading] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [attestations,setAttestations] = useState<MonthAttesationsTableAttestationsT[]>();
   
    const [fillters,setFillters] = useState<StudentMonthAttestationsTableFilltersT>({
        month:""
    });

    const token = useUserStore().user.token || getToken();
    const fetch = async (_fillters?:StudentMonthAttestationsTableFilltersT) => {
        setLoading(true);
        const month = _fillters?.month || fillters.month;
        try{
            const res = !month 
            ? await axiosConfig.post(endpoints.studentMonthAttestations,{start:-1,end:-1},{headers:{Authorization:token}})
            : await axiosConfig.post(endpoints.studentMonthAttestations,{start:attestations?.find(att => att.month === _fillters?.month)?.start_date || -1,end:attestations?.find(att => att.month === _fillters?.month)?.end_date || -1},{headers:{Authorization:token}});

            setTable(res.data.data);
            if(!month) setAttestations(res.data.data?.attestation_list);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
    const onChangeFillters = (month:string) => {
        setFillters(prev => ({ ...prev,"month":month}));

        const newAtts = attestations?.map(att => att.month === month ? {...att,active:true} : {...att,active:false});
        setAttestations(newAtts);
        fetch({'month':month,});
    }   

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    
    //     window.history.replaceState({}, '', routes.monthAttestations);
    //     // navigate(routes.absenceTable+`?group_id=${fillters.group_id}&offset=${fillters.offset}`);
    // },[fillters]);

    return {table,loading,fillters,navigate,onChangeFillters,attestations}
}