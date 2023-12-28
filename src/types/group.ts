export type GroupT = {
    group_id:string
    group_full_name:string
}

export type CreateGroupT = {
    group_full_name:string
}

export type ChangeGroupT = {
    group_id:string
    group_full_name:string
    group_supervisor:string
}