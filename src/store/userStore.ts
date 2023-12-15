import { create } from 'zustand'
import { themeType } from '../types/themeType';
import { UserT } from '../types/user';

type State = {
    user:UserT;
}

type Actions = {
    signIn:(userData:UserT) => void
}
type StoreType = State & Actions;

export const useUserStore = create<StoreType>((set) => ({
    user:{
        name:'',
        mailbox_adress:'',
    },
    signIn: (userData) => set((state) => ({ ...state,...userData })),
}));