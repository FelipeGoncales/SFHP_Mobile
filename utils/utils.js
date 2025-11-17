// Função para remover caracteres não numéricos
function getNumber(val) {
    return val.replace(/\D/g, '');
}

// Função para limitar caractéres
function formatNomeFixo(nome, maxLenght) {
    // Obtém o nome novo
    let nomeNovo = nome.toUpperCase();

    if (nomeNovo.length > maxLenght) {
        nomeNovo = nomeNovo.substring(0, maxLenght) + '...';
    }

    return nomeNovo;
}

export { getNumber, formatNomeFixo };