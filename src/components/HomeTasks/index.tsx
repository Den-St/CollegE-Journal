import { useThemeStore } from "../../store/themeStore";
import './homeTaskStyles.scss';
import {MoreOutlined} from "@ant-design/icons";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { FilterIconSvg } from "../../assets/svgs/filterIconSvg";
import { Select } from "antd";
const {Option} = Select;

export const HomeTasks = () => {
  const theme = useThemeStore().theme;
  const subjects = [{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:true},{name:'АПСК',isActive:true},{name:'РКСЗ',isActive:true},{name:'WEB-технології',isActive:true},{name:'ОБЗД',isActive:false},];

  return <div className={`homeTaskMain__container ${theme}`}>
    <section className="homeTaskSubjects_main">
      <h2 className="homeTaskSubjects_title">Предмети</h2>
      <div className="homeTaskSubjects_container">
        {subjects.map((subject,i) => <p className={`homeTasks_subject ${!subject.isActive && 'inactive'}`}>{subject.name}{i === 2 && <div className="newTask"/>}</p>)}
      </div>
    </section>
    <div className="homeTaskTop__container">
      <h1 className="homeTaskTitle">Домашнє завдання</h1>
      <div className="homeTaskFilters__container">
        <div className="homeTaskFilter__container">
          <Select className="homeTaskFilter__select" placeholder={'Группа'}>
            <Option value={'3-11'} label={'3-11'}>3-11</Option>
            <Option value={'3-21'} label={'3-21'}>3-21</Option>
            <Option value={'3-31'} label={'3-31'}>3-31</Option>
            <Option value={'3-13'} label={'3-41'}>3-41</Option>
            <Option value={'3-42'} label={'3-42'}>3-42</Option>
          </Select>
          {/* <p className="homeTaskFilter__name">Группа</p> */}
          <FilterIconSvg/>
        </div>
        <div className="homeTaskFilter__container">
          <p className="homeTaskFilter__name">Предмет</p>
          <FilterIconSvg/>
        </div>
        <div className="homeTaskFilter__container">
          <p className="homeTaskFilter__name">Завдання</p>
          <FilterIconSvg/>
        </div>
        <div className="homeTaskFilter__container">
          <p className="homeTaskFilter__name">Місяць</p>
          <FilterIconSvg/>
        </div>
        <div className="homeTaskFilter__container">
          <p className="homeTaskFilter__name">Сдача</p>
          <FilterIconSvg/>
        </div>
      </div>
    </div>
    <div className="homeTaskTasks__container">
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
        <div className="homeTaskItem__container">
          <div className="homeTaskItem">
            <img className="homeTaskItem__avatar" src={defaultAvatar}/>
            <div className="homeTaskItemText__container">
              <p className="homeTaskItem__text">Технологія токен рінг ч1Технологія токен рінг ч1</p>
              <p className="homeTaskItem__date">15 травня</p>
            </div>
            <MoreOutlined />
          </div>
          <div className="homeTaskDeadline__container">
            <p className="homeTaskDeadline__title">
              Срок сдачі
            </p>
            <p className="homeTaskDeadline__date">30 травня</p>
          </div>
          <div className="homeTaskCommentsItem__container">
            <p className="homeTaskCommentsItemNoComment">Комментар для викладача</p>
            <p className="homeTaskCommentsItemComment__container">
              <img className="homeTaskCommentItem__avatar" src={defaultAvatar}/>
              <p className="homeTaskCommentItem__text">Там треба зробити це, це і це. Приклад ось так, так і так</p>
            </p>
          </div>
        </div>
    </div>
  </div>
}
