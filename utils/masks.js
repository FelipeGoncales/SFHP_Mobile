function formatCPF(input, setInput) {
    if (input === undefined || input === null) return;

    // Remove tudo que não for número
    let value = input.replace(/\D/g, '');

    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);

    // Monta a máscara dinamicamente
    let formatted = value;
    if (value.length > 9) {
        formatted = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
        formatted = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
        formatted = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    // Só atualiza se o valor realmente mudou
    setInput((prev) => (prev !== formatted ? formatted : prev));
}

function formatTelefone(input, setInput) {
    if (!input) return;

    let value = input.replace(/\D/g, "");

    // Limite (11 dígitos)
    if (value.length > 11) value = value.slice(0, 11);

    let formatted = value;

    if (value.length > 6) {
        formatted = value.replace(
            /(\d{2})(\d{5})(\d{1,4})/,
            "($1) $2-$3"
        );
    } else if (value.length > 2) {
        formatted = value.replace(
            /(\d{2})(\d{1,5})/,
            "($1) $2"
        );
    } else if (value.length > 0) {
        formatted = value.replace(
            /(\d{1,2})/,
            "($1"
        );
    }

    setInput(prev => (prev !== formatted ? formatted : prev));
}

function formatDataNascimento(input, setInput) {
    if (!input) {
        // Permite deixar vazio sem colocar "0"
        setInput("");
        return;
    }

    // Remove tudo que não for número
    let value = input.replace(/\D/g, "");

    // Limita a 8 dígitos (DDMMAAAA)
    if (value.length > 8) value = value.slice(0, 8);

    let day = value.substring(0, 2);
    let month = value.substring(2, 4);
    let year = value.substring(4, 8);

    // Impede dia > 31
    if (day && parseInt(day) > 31) day = "31";

    // Impede mês > 12
    if (month && parseInt(month) > 12) month = "12";

    // Monta a data formatada dinamicamente
    let formatted = day;
    if (month) formatted += "/" + month;
    if (year) formatted += "/" + year;

    // Validação final quando completar 10 caracteres
    if (formatted.length === 10) {
        const dd = parseInt(day);
        const mm = parseInt(month);
        const yyyy = parseInt(year);

        const today = new Date();
        const selected = new Date(yyyy, mm - 1, dd);

        // Data inexistente (ex.: 31/02/2020)
        if (
            selected.getFullYear() !== yyyy ||
            selected.getMonth() + 1 !== mm ||
            selected.getDate() !== dd
        ) {
            return; // Não atualiza (mantém a última válida)
        }

        // Impede datas futuras
        if (selected > today) {
            return;
        }

        // Impede ano absurdamente antigo (ex.: 1500)
        if (yyyy < 1900) return;
    }

    setInput(formatted);
}

function formatSUS(value, setState) {
    if (!value) {
        setState("");
        return;
    }

    let numeric = value.replace(/\D/g, "");
    numeric = numeric.substring(0, 15);

    if (numeric.length <= 3) {
        numeric = numeric.replace(/(\d{1,3})/, "$1");
    }
    else if (numeric.length <= 7) {
        numeric = numeric.replace(/(\d{3})(\d{1,4})/, "$1 $2");
    }
    else if (numeric.length <= 11) {
        numeric = numeric.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1 $2 $3");
    }
    else {
        numeric = numeric.replace(/(\d{3})(\d{4})(\d{4})(\d{1,4})/, "$1 $2 $3 $4");
    }

    setState(numeric);
}

export { formatCPF, formatTelefone, formatDataNascimento, formatSUS };