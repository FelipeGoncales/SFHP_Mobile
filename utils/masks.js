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

export { formatCPF };