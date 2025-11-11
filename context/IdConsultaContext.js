import { createContext, useState } from "react";

export const IdConsultaContext = createContext();

export function IdConsultaProvider({ children }) {
    const [idConsulta, setIdConsulta] = useState('');

    return (
        <IdConsultaContext.Provider value={ { idConsulta: idConsulta, setIdConsulta: setIdConsulta } }>
            {children}
        </IdConsultaContext.Provider>
    );
}
