function formatCPF(input, setInput) {

    // Pega só os números do input
    let value = input.replace(/\D/g, '');

    if (value.length > 11) {
        return true
    }

    // Máscara base
    let formatted = '___.___.___-__';

    console.log('for')

    // Preenche a máscara com os números
    for (let i = 0; i < value.length && i < 11; i++) {
        formatted = formatted.replace('_', value[i]);
    }

    console.log(formatted);

    return setInput(formatted);
}


export { formatCPF };