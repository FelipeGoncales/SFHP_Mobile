import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from "react-native";
import colors from "../design/colors";
import { useState, useContext } from "react";
import {useNavigation} from "@react-navigation/native";
import {EmailRecSenhaContext} from "../context/emailRecSenhaContext";
import {CpfPacienteContext} from "../context/CpfPacienteContext";
import urlAPI from "../config/urlAPI";
import { getNumber } from "../utils/utils";

function FormRecSenha() {

    const [codigo, setCodigo] = useState("");

    const navigation = useNavigation();

    // Variáveis do context
    const { emailRecSenha, setEmailRecSenha } = useContext(EmailRecSenhaContext);
    const { cpfPaciente, setCpfPaciente } = useContext(CpfPacienteContext);

    // Função para voltar
    function voltarLogin() {
        // Limpa os valores do email e do cpf
        setEmailRecSenha('');
        setCpfPaciente('');

        return navigation.navigate('Login')
    }

    // Função para envio do formulário
    async function onHandleSubmit() {
        // Retorna caso não tenha informado o código
        if (!codigo) {
            return Alert.alert('Informe o código!');
        }

        try {
            // Gera o código de verificação
            const response = await fetch(`${urlAPI}/validar_codigo?cpf=${getNumber(cpfPaciente)}&codigo=${codigo}`, {
                method: "POST",
            });

            // Obtém a resposta
            const data = await response.json();

            if (response.ok) {
                // Navega para trocar a senha
                navigation.navigate("ChangePassword");
            } else {
                // Alerta o erro
                Alert.alert(data.error);
            }
        } catch (err) {
            console.log(err)
            // Erro inesperado
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