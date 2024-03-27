export type StudentJournalT = {
    can_edit:0,
    student:{
        full_name:string,
        index:number
    },
    columns:JournalColumnT[]
}

export type JournalColumnT = {
    column_index: number;
    date: string;
    cells: {
        index: number;
        value: string;
    }[],
    lesson_type?:string | null
}