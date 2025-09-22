import { createContext, useState } from "react";

export const TokenContext = createContext();

export function TokenProvider({ children }) {  
    const [token, setToken] = useState('');

    return (
        <TokenContext.Provider value={{token: token, setToken: setToken}}>
            {children}
        </TokenContext.Provider>
    )
}