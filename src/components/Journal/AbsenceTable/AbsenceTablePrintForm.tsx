import { forwardRef } from "react";
import { AbsenceTableT } from "../../../types/absenceTable";
import "./../printFormStyles.scss"

type Props = {
    table:AbsenceTableT,
    groupName:string
}

export const AbsenceTablePrintForm = forwardRef<HTMLDivElement,Props>(({table,groupName},props) => {

    return <div className="printForm_container" ref={props} id={'printForm'}>
            <div className="printForm_page" style={{'gap':'20px'}}>
                <div>
                    <h1 className="printForm_header">ДЕРЖАВНИЙ УНІВЕРСИТЕТ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І</h1>
                    <h1 className="printForm_header">ЗВ’ЯЗКУ</h1>
                    <h1 className="printForm_subheader">ВІДОКРЕМЛЕНИЙ СТРУКТУРНИЙ  ПІДРОЗДІЛ</h1>
                    <h1 className="printForm_subheader">«ФАХОВИЙ КОЛЕДЖ ЗВ’ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_subheader">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ’ЯЗКУ»</h1>
                </div>
                <div style={{'width':'100%','display':'flex',gap:'130px'}}>
                    <div style={{'width':'160px','display':'flex','flexDirection':'column','gap':'5px'}}>
                        <span className="printForm_subsubheader">Староста</span>
                        <span className="printForm_subsubheader">{table.group_leader_data.phone_number}</span>
                    </div>
                    <div style={{'width':'160px','display':'flex','flexDirection':'column','gap':'5px'}}>
                        <span className="printForm_subsubheader">Кл. керівник</span>
                        <span className="printForm_subsubheader">{table.supervisor_data.phone_number}</span>
                    </div>
                </div>
                <span style={{'width':'100%','textAlign':'center'}} className="printForm_subsubheader">Табель обліку відвідування занять групи <b>{table.group_name}</b></span>
                <section className='printFormJournal__container'>
                    <div className='printFormJournal_top'>
                        <div className='printFormJournal_top_left' style={{'height':'18px'}}>
                            <span>№з/П</span>
                        </div>
                        <div className='printFormAbsence_top_student'>
                            <span>ПІБ студента/студентки</span>
                        </div>
                        <div className='printFormJournal_top_dates'>
                            {table.dates.map(date => 
                                <div className="printFormJournal_top_days_day" key={date}>
                                    {date}
                                </div>    
                            )}
                        </div>
                        <div className="printFormAbsence_top_total">
                            <span>Всього</span>
                        </div>
                    </div>
                    <div className='printFormJournal__main'>
                        <div className={`printFormJournal__students`}>
                                {table?.student_list.map((student,i) =>
                                    <div style={{'display':'flex'}} key={student.full_name+i}>
                                        <div className={`printFormJournal__studentNumber`}>
                                            {i+1}
                                        </div>
                                        <div className={`printFormJournal__student`}>
                                            <p className="printFormJournal_studentName">{i+1}.{student.full_name}</p>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <div className="printFormJournal__marks_section">
                            {table?.student_list.map((studentDays,i) => <div className="printFormJournal__marks">
                                {studentDays.columns.map(day => day.map(value => <p className="printFormJournal__mark" style={{'height':'18px','width':'12px'}}>{value}</p>))}
                            </div>)}
                        </div>
                        <div className="printFormJournal__totals_section">
                            {table?.student_list.map((student,i) => 
                                <p className="printFormAbsence_top_total">{student.total}</p>
                            )}
                        </div>
                    </div>
                </section>
                <section className="printFormAbsenceTable_bottom_container">
                    <div className="printFormAbsenceTable_teacher_container">
                        <div className="printFormAbsenceTable_teacherHeader_container">
                        ПІБ викладача
                        </div>
                        <div className="printFormAbsenceTable_teacherNames_container">
                            {table.teachers.map(teachers => <>{teachers.map(teacher => <div className="printFormAbsenceTable_teacherName_container">{teacher}</div>)}</>)}
                        </div>
                        <p className="printFormAbsence_teachers_end"></p>
                    </div>
                    <div className="printFormAbsenceTable_teacher_container">
                        <div className="printFormAbsenceTable_teacherHeader_container">
                        Дисципліна
                        </div>
                        <div className="printFormAbsenceTable_teacherNames_container">
                            {table.subjects.map(subjects => <>{subjects.map(subject => <div className="printFormAbsenceTable_teacherName_container">{subject}</div>)}</>)}
                        </div>
                        <p className="printFormAbsence_teachers_end"></p>
                    </div>
                </section>
            </div>
    </div>
});