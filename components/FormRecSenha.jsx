import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from "react-native";
import colors from "../design/colors";
import { useState, useContext } from "react";
import {useNavigation} from "@react-navigation/native";
import {EmailRecSenhaContext} from "../context/emailRecSenhaContext";
import {CpfPacienteContext} from "../context/CpfPacienteContext";
import urlAPI from "../config/urlAPI";
import { getNumber } from "../utils/utils";

function FormRecSenha() {

    // Definindo o estado local para armazenar o código que o usuário irá inserir.
    const [codigo, setCodigo] = useState("");

    // Hook do React Navigation para navegação entre telas.
    const navigation = useNavigation();

    // Contextos utilizados para chamar o email e o CPF do paciente.
    const { emailRecSenha, setEmailRecSenha } = useContext(EmailRecSenhaContext);
    const { cpfPaciente, setCpfPaciente } = useContext(CpfPacienteContext);

    // Função para voltar à tela de login, limpando os valores.
    function voltarLogin() {
        // Limpa o estado do email e do CPF no contexto, ou seja, reseta esses dados.
        setEmailRecSenha('');
        setCpfPaciente('');

        // Navega de volta para a tela de Login.
        return navigation.navigate('Login')
    }

    // Função que é chamada quando o formulário de recuperação de senha é submetido.
    async function onHandleSubmit() {
        // Verifica se o código foi preenchido. Se não, exibe um alerta para o paciente.
        if (!codigo) {
            return Alert.alert('Informe o código!');
        }

        try {
            // Faz a requisição para o backend, validando o código informado.
            const response = await fetch(`${urlAPI}/validar_codigo?cpf=${getNumber(cpfPaciente)}&codigo=${codigo}`, {
                method: "POST",
            });

            // Converte a resposta da API para JSON.
            const data = await response.json();

            // Se a resposta for bem-sucedida (código de status HTTP 2xx), navega para a tela de alteração de senha.
            if (response.ok) {
                navigation.navigate("ChangePassword");
            } else {
                // Se a resposta não for bem-sucedida, exibe o erro retornado pela API.
                Alert.alert(data.error);
            }

        } catch (err) {
            // Caso haja um erro inesperado (como problemas de conexão), exibe uma mensagem de erro.
            console.log(err)
            Alert.alert("Erro", "Não foi possível conectar ao servidor");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Código enviado para {emailRecSenha}</Text>

            <Text style={styles.desc}>Informe o código enviado por e-mail para criar uma nova senha.</Text>

            <TextInput
                style={styles.input}
                placeholder="Código"
                keyboardType="numeric"
                value={codigo}
                onChangeText={setCodigo}
                maxLength={6}
            />

            <TouchableOpacity style={styles.btn} onPress={onHandleSubmit}>
                <Text style={styles.btnText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnCancelar} onPress={voltarLogin}>
                <Text style={styles.btnTextCancelar}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: colors.blueDark,
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center"
    },
    desc: {
        color: colors.grayDark,
        fontSize: 13,
        textAlign: "center"
    },
    container: {
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 35,
        backgroundColor: colors.white,
        borderRadius: 20,
        width: '85%'
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 7,
        padding: 14,
        marginBottom: 15,
        width: '100%'
    },
    btn: {
        backgroundColor: colors.blueDark,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    btnText: {
        color: colors.white,
        fontWeight: 700,
    },
    btnCancelar: {
        backgroundColor: colors.gray200,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    btnTextCancelar: {
        color: colors.blueDark,
        fontWeight: 700,
    },
});

export default FormRecSenha;