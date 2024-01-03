import { create } from 'zustand'
import { GroupT } from '../types/group';

type State = {
    groups:GroupT[];
}

type Actions = {
    setGroups:(group:GroupT[]) => void,
    addGroup:(group:GroupT) => void
}
type StoreType = State & Actions;

export const useGroupsStore = create<StoreType>((set) => ({
    groups:[],
    setGroups:(groups)  => set((state) => ({...state,groups:groups})),
    addGroup:(group)  => set((state) => ({...state,groups:[...state.groups,group]})),
}));