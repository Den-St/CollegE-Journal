export type StudentJournalSubjectsT = {
    journal_id:string,
    subjects:{
        subject_full_name:string,
        subject_short_name:string,
        journal_id:string,
        teacher:string
    }[]
}