import { createContext, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    const [redirect, setRedirect] = useState(null)
    return (
    <UserContext.Provider value={{user, setUser, redirect, setRedirect}}>
        {children}
    </UserContext.Provider>
    )
}