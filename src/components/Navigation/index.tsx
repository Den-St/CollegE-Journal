import classNames from "classnames";
import { useState } from "react";
import { HeaderNavLinks } from "../Header/HeaderNavLinks";

export const Navigation = () => {
    const [isOpened,setIsOpened] = useState(false);
    const onToggleIsOpened = () => {
        setIsOpened(prev => !prev)
    }
    
    return <div 
        className={`flex flex-col items-center pt-5 pb-5 bg-thirdDark transition-all duration-200
        text-white border-b-1 border-b-gray 
        ${classNames({"w-[250px]":isOpened,"w-[70px]":!isOpened})} h-screen`}
    >
        <button onClick={onToggleIsOpened} className="bg-white p-5 text-primaryDark">open</button>
        <HeaderNavLinks/>
    </div>
}