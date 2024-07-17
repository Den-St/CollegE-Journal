import { forwardRef } from "react"
import { TeacherJournalT } from "../../types/teacherJournal"
import "./printFormStyles.scss"

type Props = {
    journal?:TeacherJournalT,
    subjectName:string
}

export const PrintForm = forwardRef<HTMLDivElement,Props>(({journal,subjectName},props) => {
    const limitColumns = Array.from(Array(20).keys());
    const numberOfJournalPages = !!journal?.columns.length && Array.from(Array(Math.ceil(journal?.columns.length/20)).keys());
    const limitLessons = Array.from(Array(16).keys());
    const numberOfLessonsPages = !!journal?.columns.length && Array.from(Array(Math.round(journal?.columns.length/16)).keys());

    return <div className="printForm_container" ref={props}>
        {!!numberOfJournalPages && numberOfJournalPages.map(pageNumber => 
            <div className="printForm_page" key={pageNumber}>
                <div>
                    <h1 className="printForm_header">ДЕРЖАВНИЙ УНІВЕРСИТЕТ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І</h1>
                    <h1 className="printForm_header">ЗВ’ЯЗКУ</h1>
                    <h1 className="printForm_subheader">ВІДОКРЕМЛЕНИЙ СТРУКТУРНИЙ  ПІДРОЗДІЛ</h1>
                    <h1 className="printForm_subheader">«ФАХОВИЙ КОЛЕДЖ ЗВ’ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_subheader">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ’ЯЗКУ»</h1>
                </div>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">{subjectName}</span>
                    <span className="printForm_subsubheader">ПІБ Викладача</span>
                </div>
                <section className='printFormJournal__container'>
                    <div className='printFormJournal_top'>
                        <div className='printFormJournal_top_left'>
                        </div>
                        <div className='printFormJournal_top_dates'>
                            {limitColumns.map(columnNumber => !!journal?.columns[columnNumber + (20*pageNumber)] &&
                                <div className="printFormJournal_top_dates_date" key={journal.columns[columnNumber+(20*pageNumber)].column_id}>
                                    <p>{journal.columns[columnNumber +(20*pageNumber)].date.includes('\n') ? (journal.columns[columnNumber + (20*pageNumber)].date.split('\n')[1].split('.')[0]+`/`+journal.columns[columnNumber + (20*pageNumber)].date.split('\n')[1].split('.')[1]) : journal.columns[columnNumber + (20*pageNumber)].date || journal.columns[columnNumber + (20*pageNumber)].lesson_type}</p>
                                </div>
                            )}
                            {/* {journal?.columns.map(column => 
                                <div className="printFormJournal_top_dates_date" key={column.column_id}>
                                    <p>{column.date.includes('\n') ? (column.date.split('\n')[1].split('.')[0]+`/`+column.date.split('\n')[1].split('.')[1]) : column.date}</p>
                                </div>
                            )} */}
                        </div>
                    </div>
                    <div className='printFormJournal__main'>
                        <div className={`printFormJournal__students`}>
                                {journal?.students.map(student =>
                                    <div key={student.student_id} className={`printFormJournal__student`}>
                                        <p className="printFormJournal_studentName">{student.index}.{student.full_name}</p>
                                    </div>
                                )}
                        </div>
                        <div className="printFormJournal__marks_section">
                            {journal?.students.map((student,i) => 
                                <div  className="printFormJournal__marks" key={student.student_id}>
                                    {limitColumns.map(columnNumber => !!journal?.columns[columnNumber + (20*pageNumber)] &&
                                            <p className="printFormJournal__mark">{journal?.columns[columnNumber + (20*pageNumber)].cells.find(cell => cell.index === student.index)?.value}</p>
                                    )}
                                    {/* 
                                    {journal.columns.map((column,j) =>
                                        <p className="printFormJournal__mark">{column.cells.find(cell => cell.index === student.index)?.value}</p>
                                    )} */}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">ПІБ Викладача</span>
                    <span className="printForm_subsubheader">Підпис<span> _______________</span></span>
                </div>
            </div>
        )}
        {!!numberOfLessonsPages && numberOfLessonsPages.map(pageNumber =>
            <div className="printForm_page" key={pageNumber}>
                <div>
                    <h1 className="printForm_header">ДЕРЖАВНИЙ УНІВЕРСИТЕТ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І</h1>
                    <h1 className="printForm_header">ЗВ’ЯЗКУ</h1>
                    <h1 className="printForm_subheader">ВІДОКРЕМЛЕНИЙ СТРУКТУРНИЙ  ПІДРОЗДІЛ</h1>
                    <h1 className="printForm_subheader">«ФАХОВИЙ КОЛЕДЖ ЗВ’ЯЗКУ ТА ІНФОРМАТИЗАЦІЇ</h1>
                    <h1 className="printForm_subheader">ДЕРЖАВНОГО УНІВЕРСИТЕТУ ІНТЕЛЕКТУАЛЬНИХ ТЕХНОЛОГІЙ І ЗВ’ЯЗКУ»</h1>
                </div>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">{subjectName}</span>
                    <span className="printForm_subsubheader">ПІБ Викладача</span>
                </div>
                <div className="printFormLessons_main">
                    <div className="printFormLessons_top">
                        <div className="printFormLessons_top_type">Тип заняття</div>
                        <div className="printFormLessons_top_date">Дата проведення</div>
                        <div className="printFormLessons_top_theme">Тема заняття</div>
                        <div className="printFormLessons_top_task">Завдання</div>
                    </div>
                    <div className="printFormLessons_lessons">
                        {limitLessons.map(columnNumber => !!journal?.columns[columnNumber + (16*pageNumber)] &&
                            <div key={journal?.columns[columnNumber + (16*pageNumber)].column_id} className="printFormLessons_lesson">
                                <div className="printFormLessons_top_type">{journal?.columns[columnNumber + (16*pageNumber)].lesson_type}</div>
                                <div className="printFormLessons_top_date">{journal?.columns[columnNumber + (16*pageNumber)].date}</div>
                                <div className="printFormLessons_top_theme">{journal?.columns[columnNumber + (16*pageNumber)].lesson_topic}</div>
                                <div className="printFormLessons_top_task">Завдання</div>
                            </div>)}
                        {/* {journal?.columns.map(column => 
                            <div key={column.column_id} className="printFormLessons_lesson">
                                <div className="printFormLessons_top_type">{column.lesson_type}</div>
                                <div className="printFormLessons_top_date">{column.date}</div>
                                <div className="printFormLessons_top_theme">{column.lesson_topic}</div>
                                <div className="printFormLessons_top_task">Завдання</div>
                            </div>
                        )} */}
                    </div>
                </div>
                <div style={{'width':'100%','display':'flex','justifyContent':'space-between'}}>
                    <span className="printForm_subsubheader">ПІБ Викладача</span>
                    <span className="printForm_subsubheader">Підпис<span> _______________</span></span>
                </div>
            </div>
        )}
    </div>
});