export const setFromSubjects = (subjects:{
    subject_id: string;
    subject_full_name: string;
}[]) => {
    const set:{
        subject_id: string;
        subject_full_name: string;
    }[] = [];
    subjects.forEach((subject) => {
        if(set.some(_subject => _subject.subject_id === subject.subject_id)) return;
        set.push(subject);
    });

    return set;
}