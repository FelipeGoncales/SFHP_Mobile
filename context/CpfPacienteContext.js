import { createContext, useState } from "react";

export const CpfPacienteContext = createContext();

export function CpfPacienteProvider({ children }) {
    const [cpfPaciente, setCpfPaciente] = useState('');

    return (
        <CpfPacienteContext.Provider value={ { cpfPaciente: cpfPaciente, setCpfPaciente: setCpfPaciente } }>
            {children}
        </CpfPacienteContext.Provider>
    );
}
