export const securityLevels = {
    unauthorized:0,
    student:1,
    teacher:4,
    admin:5
}
export const securityLevelsToNames:Record<number,string> = {
    0:'',
    5:'Адміністратор'
}