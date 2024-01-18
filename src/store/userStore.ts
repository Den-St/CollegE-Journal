import { create } from 'zustand'
import { UserT } from '../types/user';

type State = {
    user:UserT;
}

type Actions = {
    signIn:(userData:UserT) => void,
    signOut:() => void;
    setToken:(token:string) => void,
    setAvatar:(avatar:string) => void
}
type StoreType = State & Actions;

export const useUserStore = create<StoreType>((set) => ({
    user:{
        user_id:'',
        full_name:'',
        mailbox_address:'',
        token:'',
        avatar: '',
        grades_per_month: null,
        grades_per_week: null,
        homeworks_per_month:null,
        homeworks_per_week:null,
        news_per_month:null,
        news_per_week:null,
        visit_per_day:null,
        visit_per_month:null,
        visit_per_week:null,
        security_level:0,
        group_fullname:'',
        is_active:false
    },
    signIn: (userData) => set((state) => ({ ...state,...userData,user:{...state.user,...userData} })),
    signOut: () => set(() => ({
        user:{
            user_id:'',
            full_name:'',
            mailbox_address:'',
            token:'',
            avatar: '',
            grades_per_month: null,
            grades_per_week: null,
            homeworks_per_month:null,
            homeworks_per_week:null,
            news_per_month:null,
            news_per_week:null,
            visit_per_day:null,
            visit_per_month:null,
            visit_per_week:null,
            security_level:0,
            group_fullname:'',
            is_active:false
        }
    })),
    setToken: (token:string) => set((state) => ({
        user:{...state.user,token}
    })), 
    setAvatar: (avatar:string) => set((state) => ({
        user:{...state.user,avatar}
    }))
}));