import {createContext, useState } from "react";

export const MediaContext = createContext();

export const MediaDetailProvider = ({children}) => {

    const [mediaDetail,setMediaDetail] = useState(null)

    return <MediaContext.Provider value={{ 
        mediaDetail,
        setMediaDetail
     }}>
        {children}
    </MediaContext.Provider>
}