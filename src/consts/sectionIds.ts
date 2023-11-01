export type sectionType = {id:string,distanceBottom:number,title:string,distanceTop:number};
export type sectionsKeys = keyof typeof sectionIds;

export const sectionIds:Record<'start' | 'news' | 'info' | 'about',sectionType> = {
    start:{
        id:'#start',
        distanceTop:0,
        distanceBottom:400,
        title:"Старт"
    },
    news:{
        id:'#news',
        distanceTop:400,
        distanceBottom:1005,
        title:"Новини"
    },
    info:{
        id:'#info',
        distanceTop:1005,
        distanceBottom:1720,
        title:"Журнал"
    },
    about:{
        id:'#about',
        distanceTop:1720,
        distanceBottom:2550,
        title:"Про Нас"
    }
}