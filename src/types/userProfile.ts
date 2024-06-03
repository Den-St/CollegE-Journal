export type UserProfileT = {
    admission_date: number | null,
    avatar: string | null,
    birth_date: number | null,
    deduction_date: string | null,
    education_form: string | null,
    education_type: string | null,
    english: "Підгрупа А" | "Підгрупа Б" | null,
    english_additional: boolean | null,
    full_name: string | null,
    germany: boolean | null,
    interests: string | null,
    is_on_scholarships: string | null,
    location: string | null,
    mailbox_address: string | null,
    parents_phone_number: string | null,
    phisicaledu: 'Основна' | 'Додаткова' | null,
    phone_number: string | null,
    user_group: {
        group_full_name: string | null,
        group_id: string | null
    } | null,
    user_type:'student' | 'teacher'
}