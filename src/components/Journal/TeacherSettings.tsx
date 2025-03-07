import { Collapse, CollapseProps, DatePicker, Modal, Select } from "antd"
import { useState } from "react";
import { useJournalTeacherSettings } from "../../hooks/journalTeacher";
import './teacherSettingsModalStyles.scss';
const {Option} = Select;

export const useTeacherSettingsModal = () => {
    const [isOnTeacherSettings,setOnTeacherSettings] = useState(false);
    const onOpenTeacherSettings = () => {
        setOnTeacherSettings(true);
    }
    const onCloseTeacherSettings = () => {
        setOnTeacherSettings(false);
    }
    return {onOpenTeacherSettings,onCloseTeacherSettings,isOnTeacherSettings};
}

const CustomIcon = ({ rotated }: { rotated?: boolean }) => (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" style={{ transform: rotated ? '' : 'rotate(90deg)' }}>
      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
    </svg>
  );

type Props = {
    open:boolean,
    onClose:() => void,
    journalId:string

}
export const TeacherSettingsModal:React.FC<Props> = ({onClose,open,journalId}) => {
    const {teachers,loading,onAddTeacher,onShiftTeacher,setAddTeacher,addTeacher,setShiftTeacher,shiftTeacher} = useJournalTeacherSettings(journalId);
    
    const items: CollapseProps['items'] = [
        {
          key: 'add',
          label: <h1 className="header">Додати викладача</h1>,
          children:<div className="createUserSelect__container">
            <label className="select_label">Викладач</label>
            <div className="select_wrapper" style={{'width':'50%','maxWidth':'473px'}}>
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть викладача'}
                    optionLabelProp="label"
                    loading={loading}
                    onChange={(val) => setAddTeacher(val)}
                    value={addTeacher}
                    suffixIcon={<CustomIcon />}
                    >  
                    {teachers?.map(teacher => <Option value={teacher.user_id} key={teacher.user_id} label={teacher.full_name}>{teacher.full_name}</Option>)} 
                </Select>
            </div>
        <button onClick={onAddTeacher} disabled={loading} className={'primary_button'}>Зберегти зміни</button>
        </div>
        },
        {
          key: 'change',
          label: <h1 className="header">Змінити викладача</h1>,
          children: 
            <div className="createUserSelect__container">
            <label className="select_label">Викладач</label>
            <div className="select_wrapper" style={{'width':'31%'}}>
                <Select
                    className="createUserSelect"
                    placeholder={'Оберіть викладача'}
                    optionLabelProp="label"
                    loading={loading}
                    onChange={(val) => setShiftTeacher(val)}
                    value={shiftTeacher}
                    >  
                        {teachers?.map(teacher => <Option value={teacher.user_id} key={teacher.user_id} label={teacher.full_name}>{teacher.full_name}</Option>)} 
                </Select>
            </div>
            <button onClick={onShiftTeacher} disabled={loading} className={'primary_button'}>Зберегти зміни</button>
        </div>
        },
        {
          key: 'temporary',
          label: <h1 className="header">Тимчасова заміна</h1>,
          children: 
          <div style={{'display':'flex','flexDirection':'column',gap:'20px'}}>  
          <div style={{'display':'flex','gap':'30px',}}>
            <div className="createUserSelect__container" style={{'width':'30%'}}>
                <label className="select_label">Викладач</label>
                <div className="select_wrapper">
                    <Select
                        className="createUserSelect"
                        placeholder={'Оберіть викладача'}
                        optionLabelProp="label"
                        // onChange={setCourseNumber}
                        // value={courseNumber}
                        // {...createUserRegister('department',{required:true})}
                        // onChange={(e) => createUserSetValue('department',e)}
                        // value={createUserWatch('department')}
                        >  
                        {/* {courseNumbers.map(course => <Option value={course} label={course}>{course}</Option>)}  */}
                    </Select>
                </div>
            </div>
            <div className="createUserSelect__container" style={{'width':'30%'}}>
                <label className="select_label">Дата початку заміни</label>
                <DatePicker
                    allowClear={false}
                    placeholder="Оберіть дату початку семестру"
                    className="form_input"
                    // format={customDateFormat}
                    style={{'visibility':'visible'}}
                    // value={dayjs(watch('semester_start'))}
                    // {...register('semester_start',{required:{value:true,message:'Оберіть дату народження'},
                    // })}
                    // onChange={(e) => setValue('semester_start',e?.toDate() || null)} 
                    />
            </div>
            <div className="createUserSelect__container" style={{'width':'30%'}}>
                <label className="select_label">Дата кінця заміни</label>
                <DatePicker
                    allowClear={false}
                    placeholder="Оберіть дату кінця заміни"
                    className="form_input"
                    // format={customDateFormat}
                    style={{'visibility':'visible'}}
                    // value={dayjs(watch('semester_start'))}
                    // {...register('semester_start',{required:{value:true,message:'Оберіть дату народження'},
                    // })}
                    // onChange={(e) => setValue('semester_start',e?.toDate() || null)} 
                    />
            </div>
        </div>
        <button onClick={onAddTeacher} disabled={loading} className={'primary_button'}>Зберегти зміни</button>
        </div>,
        },
      ];

      const expandIcon = (panelProps: { isActive?: boolean }) => <CustomIcon rotated={panelProps.isActive} />;

    return <Modal centered rootClassName="teacherSettingsModal" footer={false} open={open} onCancel={onClose}>
        <h1 className="header">Налаштування викладачів</h1>
        <Collapse className="teacherSettingsModalCollapse" expandIcon={expandIcon} expandIconPosition="end" defaultActiveKey={['add']} ghost items={items} />
    </Modal>
}