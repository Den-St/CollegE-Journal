export type UserT = {
    user_id:string | null;
    full_name:string,
    mailbox_adress:string,
    token:string,
    avatar: string,
    grades_per_month: number | null
    grades_per_week: number | null
    homeworks_per_month:number | null
    homeworks_per_week:number | null
    news_per_month:number | null
    news_per_week:number | null
    visit_per_day:number | null
    visit_per_month:number | null
    visit_per_week:number | null,
    security_level:number | null
}

export type GroupUserT = {
    user_id:string | null;
    full_name:string,
    mailbox_adress:string,
    avatar: string,
}
export type CreateUserT = {
    mailbox_address:string,
    full_name:string
    education_form:string | null 
    education_type:string | null
}