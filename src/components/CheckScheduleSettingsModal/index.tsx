import { Modal, Select } from "antd"
import { UploadSvg } from "../../assets/svgs/uploadSvg"
const {Option} = Select;

type Props = {
    setCourseNumber:(n:number) => void,
    courseNumber:number,
    courseNumbers:number[]
}
const currYear = new Date().getFullYear();

export const CheckScheduleSettingsModal:React.FC<Props> = ({setCourseNumber,courseNumber,courseNumbers}) => {
    return <Modal>
        <form className="scheduleSettingsForm">
            <div style={{width:'100%'}}><h1 className="header">Налаштування розкладу</h1></div>
            <div className="createUserSelect__container">
                <label className="select_label">Курс навчання</label>
                <div className="createStudyMaterialsSelect__wrapper">
                    <Select
                        defaultValue={1}
                        className="createUserSelect"
                        placeholder={'Оберіть курс навчання'}
                        optionLabelProp="label"
                        onChange={setCourseNumber}
                        value={courseNumber}
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        {courseNumbers.map(course => <Option value={course} label={course}>{course}</Option>)} 
                    </Select>
                </div>
            </div>
            {!!courseNumber && <>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">Рік навчання</label>
                <div className="createStudyMaterialsSelect__wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть рік навчання'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={(currYear-1)+'-'+(currYear)} label={(currYear-1)+'-'+(currYear)}>{(currYear-1)+'-'+(currYear)}</Option>
                        <Option value={(currYear)+'-'+(currYear+1)} label={(currYear)+'-'+(currYear+1)}>{(currYear)+'-'+(currYear+1)}</Option>
                    </Select>
                </div>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">Семестр</label>
                <div className="createStudyMaterialsSelect__wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть семестр навчання'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={1} label={1}>{1}</Option>
                        <Option value={2} label={2}>{2}</Option>
                    </Select>
                </div>
            </div>
            <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>З; Кн; Кб;</span></h2>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата початку розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Введіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Введіть дату початку  семестру'/>
            </div>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата закінчення розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Введіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Введіть дату закінчення семестру'/>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">К-сть тижнів для відпрацювання</label>
                <div className="createStudyMaterialsSelect__wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть кількість тижнів'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={1} label={1}>{1}</Option>
                        <Option value={2} label={2}>{2}</Option>
                        <Option value={3} label={3}>{3}</Option>
                    </Select>
                </div>
            </div>
            <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>Тр; То;</span></h2>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата початку розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Введіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Введіть дату початку  семестру'/>
            </div>
            <div className="createUserEmailInput__container" style={{width:'30%'}}>
                <label className="select_label">Дата закінчення розкладу</label>
                <input autoComplete="off" 
                // {...createUserRegister('birth_date',{required:{value:true,message:'Введіть дату народження!'},pattern:{value:/\d{1,2}\.\d{1,2}\.\d{2,4}/,message:'Дата народження некорректна!'}})}
                className="form_input" placeholder='Введіть дату закінчення семестру'/>
            </div>
            <div className="createUserSelect__container" style={{width:'30%'}}>
                <label className="select_label">К-сть тижнів для відпрацювання</label>
                <div className="createStudyMaterialsSelect__wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть кількість тижнів'}
                        optionLabelProp="label"
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        <Option value={1} label={1}>{1}</Option>
                        <Option value={2} label={2}>{2}</Option>
                        <Option value={3} label={3}>{3}</Option>
                    </Select>
                </div>
            </div>
            <div style={{width:'100%'}}>
                <input type={'submit'} value={'Зберегти'} className={"primary_button"}/>
            </div>
            <div style={{'display':'flex',gap:'30px'}}>
                <div className="adminPanelScheduleSettingsInput__container">
                    <input  autoComplete="off" accept=".xml,.xlsm,.xlsx" className="adminPanelScheduleSettingsInput" type={'file'}/>
                    <div className="adminPanelScheduleSettingsInput__cover">
                        <UploadSvg/>
                        <div className="adminPanelScheduleSettingsInputCoverText_container">
                            <h1 className="adminPanelScheduleSettingsInputCoverTitle">
                                Імпортувати Файл
                            </h1>
                            <p className="adminPanelScheduleSettingsInputCoverText">
                                XML, XLSM, XLSX
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </form>
    </Modal>
}