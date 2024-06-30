import { Checkbox, DatePicker, Modal, Select, Steps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { customDateFormat } from "../../helpers/dateFormat";
import { CheckScheduleSettingsModal } from "../CheckScheduleSettingsModal";
import { CheckScheduleModal } from "./CheckScheduleModal";
import "./semesterSettingsStyles.scss";
        
const {Option} = Select;

const courseNumbers = [1,2,3,4];
const currYear = new Date().getFullYear();
const stepsItems = [
    {
        title:'1 Курс',
    },
    {
        title:'2 Курс',
    },
    {
        title:'3 Курс',
    },
    {
        title:'4 Курс',
    },

]
type SemesterSettingsT = {
    semester_start:Date | null,
    semester_end:Date | null,
    temporary:boolean
}
const useSemesterSettings = () => {
    const [courseNumber,setCourseNumber] = useState<number | null>(null);
    const [onCheckSettingsModal,setOnCheckSettingsModal] = useState(false);
    const [onCheckScheduleModal,setOnCheckScheduleModal] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{errors}
    } = useForm<SemesterSettingsT>();
    const onImportFile = () => {
        setOnCheckScheduleModal(true);

        setOnCheckSettingsModal(false);
    }
    const onSaveSettings = (data:SemesterSettingsT) => {

    }
    return {onCheckScheduleModal,onImportFile,setOnCheckScheduleModal,onSaveSettings,register,watch,handleSubmit,setValue,courseNumber,setCourseNumber,onCheckSettingsModal,setOnCheckSettingsModal};
}

export const SemesterSettings = () => {
    const {onCheckScheduleModal,onImportFile,setOnCheckScheduleModal,onSaveSettings,register,watch,handleSubmit,setValue,courseNumber,setCourseNumber,onCheckSettingsModal,setOnCheckSettingsModal} = useSemesterSettings();

    return <>
    <form className="scheduleSettingsForm" onSubmit={handleSubmit(onSaveSettings)}>
        <div style={{width:'100%'}}><h1 className="header">Налаштування розкладу</h1></div>
        <div className="createUserSelect__container" style={{width:courseNumber ? '30%' : ''}}>
            <label className="select_label">Курс навчання</label>
            <div className="select_wrapper">
                <Select
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
            <div className="select_wrapper">
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
            <div className="select_wrapper">
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
        <Steps
            current={courseNumber - 1}
            items={stepsItems}
        />
        <h2 className="subSubHeader" style={{width:'100%'}}>Спеціальність - <span style={{color:'var(--primary-orange)'}}>З; Кн; Кб;</span></h2>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата початку розкладу</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату початку семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                // value={dayjs(watch('semester_start'))}
                {...register('semester_start',{required:{value:true,message:'Оберіть дату народження'},
                })}
                onChange={(e) => setValue('semester_start',e?.toDate() || null)} />
        </div>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата закінчення семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату закінчення семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                // value={dayjs(watch('semester_end'))}
                {...register('semester_end',{required:{value:true,message:'Оберіть дату закінчення семестру'},
                })}
                onChange={(e) => setValue('semester_end',e?.toDate() || null)} />
        </div>
        <div className="createUserSelect__container" style={{width:'30%'}}>
            <label className="select_label">К-сть тижнів для відпрацювання</label>
            <div className="select_wrapper">
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
            <label className="select_label">Дата початку семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату початку семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                // value={dayjs(watch('semester_start'))}
                {...register('semester_start',{required:{value:true,message:'Оберіть дату народження'},
                })}
                onChange={(e) => setValue('semester_start',e?.toDate() || null)} />
        </div>
        <div className="createUserEmailInput__container" style={{width:'30%'}}>
            <label className="select_label">Дата закінчення семестру</label>
            <DatePicker
                allowClear={false}
                placeholder="Оберіть дату закінчення семестру"
                className="form_input"
                format={customDateFormat}
                style={{'visibility':'visible'}}
                // value={dayjs(watch('semester_end'))}
                {...register('semester_end',{required:{value:true,message:'Оберіть дату закінчення семестру'},
                })}
                onChange={(e) => setValue('semester_end',e?.toDate() || null)} />
        </div>
        <div className="createUserSelect__container" style={{width:'30%'}}>
            <label className="select_label">К-сть тижнів для відпрацювання</label>
            <div className="select_wrapper">
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
        <div style={{width:'100%',display:'flex',gap:'30px',alignItems:'center',}}>
            <input type={'submit'} value={'Зберегти налаштування'} style={{'width':'unset',padding:'10px 15px'}} className={"primary_button"}/>
            <Checkbox onChange={(value) => setValue('temporary',value.target.value)}>Тимчасовий розклад</Checkbox>
        </div>
        <div style={{'display':'flex',gap:'30px'}}>
            {/* <div className="adminPanelScheduleSettingsInput__container">
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
            </div> */}
            <span onClick={() => setOnCheckSettingsModal(true)} style={{width:'unset',padding:'0 20px'}} className={"primary_button"}>Завантажити розклад</span>
        </div>
        </>}
    </form>
    <Modal footer={false} rootClassName="semesterSettings_confirm_modal" open={onCheckSettingsModal}>
        <CheckScheduleSettingsModal 
        onImportFile={onImportFile}
        setCourseNumber={setCourseNumber} courseNumber={1} courseNumbers={courseNumbers}/>
    </Modal>
    <Modal footer={false} rootClassName="semesterSettings_confirm_modal" open={onCheckScheduleModal}>
        <CheckScheduleModal onClose={() => setOnCheckScheduleModal}/>
    </Modal>
    </>
}