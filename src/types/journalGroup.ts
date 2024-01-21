import { GroupUserT } from './user';
export type JournalGroupT = {
    can_edit:{
        subject_id: string,
        subject_full_name: string
    }[],
    can_view:{
        subject_id: string,
        subject_full_name: string
    }[],
    journal_group: string,
    group_full_name: string,
    group_students:GroupUserT[],
    journal_id:string,

}