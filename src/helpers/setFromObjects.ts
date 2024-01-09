export const setFromSubjects = (subjects:{
    _id: string;
    subject_full_name: string;
}[]) => {
    const set:{
        _id: string;
        subject_full_name: string;
    }[] = [];
    subjects.forEach((subject) => {
        if(set.some(_subject => _subject._id === subject._id)) return;
        set.push(subject);
    });

    return set;
}