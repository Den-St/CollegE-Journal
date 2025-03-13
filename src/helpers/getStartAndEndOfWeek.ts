import { isMonday, isSaturday, nextSaturday, previousMonday, sub } from "date-fns";

export const getStartAndEnd = (offset:number,
    formatedModaysAndSaturdays:(Date | undefined)[]
    ) => {
    // const currentMonday = formatedModaysAndSaturdays?.[formatedModaysAndSaturdays.length-1+(offset*2 - 1)];
    // const currentSaturday = formatedModaysAndSaturdays?.[formatedModaysAndSaturdays.length-1+(offset*2)];

    const weekInPast = sub(new Date(),{"weeks":-offset});
    const closestMonday = isMonday(weekInPast) ? weekInPast : previousMonday(weekInPast);
    const closestSaturday = isSaturday(weekInPast) ? weekInPast : nextSaturday(weekInPast);
    closestMonday.setHours(6);
    closestSaturday.setHours(6);

    console.log("dayes",closestMonday,closestSaturday);

    return {start:Math.round((closestMonday?.getTime() || 0)/1000),end:Math.round((closestSaturday?.getTime() || 0)/1000)};
}
