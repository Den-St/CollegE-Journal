import { create } from 'zustand'
import { GroupT } from '../types/group';

type State = {
    groups:GroupT[];
}

type Actions = {
    setGroups:(group:GroupT[]) => void,
}
type StoreType = State & Actions;

export const useTeachersGroupsStore = create<StoreType>((set) => ({
    groups:[],
    setGroups:(groups)  => set((state) => ({...state,groups:groups})),
}));