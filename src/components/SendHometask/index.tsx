import { PaperClip } from "../../assets/svgs/paperClip";
import { defaultAvatar } from "../../consts/defaultAvatar";
import "./sendHomeTask.scss";
import {Input} from 'antd';
import { useThemeStore } from "../../store/themeStore";
const {TextArea} = Input;

export const SendHomeTask = () => {
    const theme = useThemeStore().theme;
    return <div className={`sendHomeTaskMain__container ${theme}`}>
        <h1 className="sendHomeTaskMain__title">
            Домашнє завдання
        </h1>
        <section className="sendHomeTaskHomeTask__container">
            <div className="sendHomeTaskHomeTaskTopInfo__container">
                <p className="sendHomeTaskHomeTaskTitle">VPN ч.2</p>
                <p className="sendHomeTaskHomeTaskDate">23.09.2023</p>
            </div>
            <div className="sendHomeTaskHomeTaskText__container">
                <p className="sendHomeTaskHomeTaskText">
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію про проведення конференцій та семінарів, анонси важливих подій та оголошення.
                    Електронний щоденник дозволяє вчителям швидко та зручно вносити інформацію про оцінки, пропущені заняття та інші важливі події в житті коледжу, а  учням - дізнаватися про ці події негайно.
                    На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію про проведення конференцій та семінарів, анонси важливих подій та оголошення.
                    Електронний щоденник дозволяє вчителям швидко та зручно вносити інформацію про оцінки, пропущені заняття та інші важливі події в житті коледжу, а  учням - дізнаватися про ці події негайно.
                </p>
            </div>
            <div className="sendHomeTaskHomeTaskAttachedInfo__container">
                <div className="sendHomeTaskHomeTaskAttachedFiles__container">
                    <div className="sendHomeTaskHomeTaskAttachedFileItem">
                        <PaperClip/>
                        <div className="sendHomeTaskHomeTaskAttachedFileItemInfo__container">
                            <span className="sendHomeTaskHomeTaskAttachedFileItemName">Назва файлу</span>
                            <span className="sendHomeTaskHomeTaskAttachedFileItemFormat">PDF</span>
                        </div>
                    </div>
                </div>
                <div className="sendHomeTaskHomeTaskAttachedLinks__container">
                    <div className="sendHomeTaskHomeTaskAttachedLinkItem">
                        <PaperClip/>
                        <div className="sendHomeTaskHomeTaskAttachedLinkItemInfo__container">
                            <span className="sendHomeTaskHomeTaskAttachedLinkItemName">Назва сторінки</span>
                            <span className="sendHomeTaskHomeTaskAttachedLinkItemUrl">google.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sendHomeTaskHomeTaskAttachFileInput__container">
                <div className="sendHomeTaskHomeTaskAttachFileInput__styled">Завантажити файл</div>
                <input className="sendHomeTaskHomeTaskAttachFile__input"/>
            </div>
        </section>
        <div className="sendHomeTaskBottom__container">
            <section className="sendHomeTaskComments__section">
                <h2 className="sendHomeTaskCommentsTitle">Коментарі</h2>
                <div className="sendHomeTaskComments__container">
                    <div className="sendHomeTaskCommentItem__container">
                        <div className="sendHomeTaskCommentInput__container">
                            <TextArea autoSize placeholder="Коментар для викладача"/>
                        </div>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                    <div className="sendHomeTaskCommentItem__container">
                        <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                    <div className="sendHomeTaskCommentItem__container">
                        <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                    <div className="sendHomeTaskCommentItem__container">
                        <p className="sendHomeTaskComment__text">На сторінках електронного журналу можна знайти матеріали про академічні досягнення студентів, нові навчальні програми та проекти, які проводяться в коледжі. Також журнал містить розклад занять, інформацію</p>
                        <img className="sendHomeTaskComment__avatar" src={defaultAvatar}/>
                    </div>
                </div>
            </section>
            <section className="sendHomeTaskOther__container">
                <h2 className="sendHomeTaskOther__title">Інші завдання викладача</h2>
                 <div className="sendHomeTaskOtherTasks__container">
                    <div className="sendHomeTaskOtherTaskItem__container">
                        <img className="sendHomeTaskOtherTaskItem__avatar" src={defaultAvatar}/>
                        <div className="sendHomeTaskOtherTaskItemText__container">
                            <p className="sendHomeTaskOtherTaskItemText">Технологія Token Ring ч.2</p>
                            <p className="sendHomeTaskOtherTaskItemDate">29 Травня</p>
                        </div>
                    </div>
                    <div className="sendHomeTaskOtherTaskItem__container">
                        <img className="sendHomeTaskOtherTaskItem__avatar" src={defaultAvatar}/>
                        <div className="sendHomeTaskOtherTaskItemText__container">
                            <p className="sendHomeTaskOtherTaskItemText">Технологія Token Ring ч.2</p>
                            <p className="sendHomeTaskOtherTaskItemDate">29 Травня</p>
                        </div>
                    </div>
                    <div className="sendHomeTaskOtherTaskItem__container">
                        <img className="sendHomeTaskOtherTaskItem__avatar" src={defaultAvatar}/>
                        <div className="sendHomeTaskOtherTaskItemText__container">
                            <p className="sendHomeTaskOtherTaskItemText">Технологія Token Ring ч.2</p>
                            <p className="sendHomeTaskOtherTaskItemDate">29 Травня</p>
                        </div>
                    </div>
                 </div>
            </section>
        </div>
    </div>
}