import { StudentJournalSubjectsT } from './../types/studentJournalSubjects';
import { create } from 'zustand'
import { GroupT } from '../types/group';
import { JournalGroupT } from '../types/journalGroup';

type State = {
    journalSubjects:StudentJournalSubjectsT;
}

type Actions = {
    set:(journalSubjects:StudentJournalSubjectsT) => void,
}
type StoreType = State & Actions;

export const useStudentJournalSubjectsStore = create<StoreType>((set) => ({
    journalSubjects:{
        'journal_id':'',
        subjects:[]
    },
    set:(journalSubjects)  => set((state) => ({...state,journalSubjects:journalSubjects})),
}));