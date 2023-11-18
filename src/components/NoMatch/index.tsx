import { NoMatchRobot } from "../../assets/svgs/noMatchRobot"
import { useThemeStore } from "../../store/themeStore";
import './noMatchStyles.scss';

export const NoMatch = () => {
    const theme = useThemeStore().theme;

    return <main className={`noMatch__container ${theme}`}>
        <div className="noMatchImages__container">
            <NoMatchRobot/>
            <span className="noMatch__404">404</span>
        </div>
        <h1 className="noMatchImages__title">Не вдалося знайти сторінку</h1>
        <p className="noMatchImages__description">Спробуйте перезайти на сайт або повторіть спробу пізніше.</p>
    </main>
}