import { GroupUserT } from './user';
export type JournalGroupT = {
    _id:string,
    can_edit:{
        _id: string,
        subject_full_name: string
    }[],
    can_view:{
        _id: string,
        subject_full_name: string
    }[],
    journal_group: string,
    journal_group_full_name: string,
    group_students:GroupUserT[]
}