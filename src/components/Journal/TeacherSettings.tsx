import { Collapse, CollapseProps, DatePicker, Modal, Select } from "antd"
import { useState } from "react";
import './teacherSettingsModalStyles.scss';

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
const items: CollapseProps['items'] = [
    {
      key: 'add',
      label: <h1 className="header">Додати викладача</h1>,
      children:<div className="createUserSelect__container">
        <label className="select_label">Викладач</label>
        <div className="select_wrapper" style={{'width':'31%'}}>
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
    </div>,
    },
    {
      key: 'change',
      label: <h1 className="header">Змінити викладача</h1>,
      children: <div className="createUserSelect__container">
      <label className="select_label">Викладач</label>
      <div className="select_wrapper" style={{'width':'31%'}}>
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
  </div>,
    },
    {
      key: 'temporary',
      label: <h1 className="header">Тимчасова викладача</h1>,
      children: 
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
    </div>,
    },
  ];
type Props = {
    open:boolean
    onClose:() => void
}
export const TeacherSettingsModal:React.FC<Props> = ({onClose,open}) => {
    return <Modal rootClassName="teacherSettingsModal" footer={false} open={open} onCancel={onClose}>
        <Collapse className="teacherSettingsModalCollapse" expandIconPosition="end" defaultActiveKey={['add']} ghost items={items} />
        <input type={'submit'} style={{'marginLeft':'15px'}} className={'primary_button'} value={'Зберегти налаштування'}/>
    </Modal>
}