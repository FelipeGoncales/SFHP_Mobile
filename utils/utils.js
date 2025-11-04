// Função para remover caracteres não numéricos
function getNumber(val) {
    return val.replace(/\D/g, '');
}

export { getNumber };