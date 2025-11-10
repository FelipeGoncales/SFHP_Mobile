import { createContext, useState } from "react";

export const EmailRecSenhaContext = createContext();

export function EmailRecSenhaProvider({ children }) {
    const [emailRecSenha, setEmailRecSenha] = useState('');

    return (
        <EmailRecSenhaContext.Provider value={ { emailRecSenha: emailRecSenha, setEmailRecSenha: setEmailRecSenha } }>
            {children}
        </EmailRecSenhaContext.Provider>
    );
}