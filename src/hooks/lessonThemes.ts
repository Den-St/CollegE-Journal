export const useLessonThemes = () => {
    const onFocusHoverLessonThemes = (_i:number) => {
        const allLessonThemesContainers = document.querySelectorAll<HTMLElement>(".journalLessonThemeItem__container")
        const lessonThemeContainer = document.getElementById(`ltc_${_i}`);
        if(!lessonThemeContainer) return;
        for(let i = 0;i < allLessonThemesContainers?.length;i++){
            if(i !== _i) allLessonThemesContainers[i].classList.add("lesson_theme_disable_hover")
        }

        lessonThemeContainer.style.borderLeft = "5px solid var(--primary-orange) !important"
    }

    const onBlurHoverLessonThemes = (_i:number) => {
        const allLessonThemesContainers = document.querySelectorAll<HTMLElement>(".journalLessonThemeItem__container")
        const lessonThemeContainer = document.getElementById(`ltc_${_i}`);
        if(!lessonThemeContainer) return;
        for(let i = 0;i < allLessonThemesContainers?.length;i++){
            allLessonThemesContainers[i].classList.remove("lesson_theme_disable_hover")
        }
        lessonThemeContainer.style.borderLeft = ""
    }
    const keysToMoves:Record<string,(i:number) => void> = {
        'Enter':(i:number) => document.getElementById(`lti_${i+1}`)?.focus(),
        'ArrowDown':(i:number) => document.getElementById(`lti_${i+1}`)?.focus(),
        'ArrowUp':(i:number) => document.getElementById(`lti_${i-1}`)?.focus(),
    }
    const onChangeLessonTheme = (e:React.KeyboardEvent<HTMLInputElement>,_i:number) => {
        keysToMoves[e.key]?.(_i);
    }

    return {onFocusHoverLessonThemes,onBlurHoverLessonThemes,onChangeLessonTheme}
}