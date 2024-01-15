import { useThemeStore } from "../../store/themeStore";
import "./passwordInfoStyles.scss";

export const PasswordInfo = () => {
    const theme = useThemeStore().theme;

    return <div className={`passwordInfo_container ${theme}`}>
        <h2 className="passwordInfo_header">Яким має бути пароль?</h2>
        <ul className="passwordInfo_list">
            <li className="passwordInfo_listItem">Мінімальна довжина 8 символів</li>
            <li className="passwordInfo_listItem">Максимальна довжина 30 символів</li>
            <li className="passwordInfo_listItem">Має містити лише літери англійського алфавіту, хоча б одну велику літеру </li>
            <li className="passwordInfo_listItem">Має містити спеціальні символи(!@#$%^&*) та цифри</li>
        </ul>
    </div>
}