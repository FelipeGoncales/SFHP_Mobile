import {StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image} from "react-native";
import colors from "../design/colors";
import { useState, useContext } from "react";
import {useNavigation} from "@react-navigation/native";
import {EmailRecSenhaContext} from "../context/emailRecSenhaContext";
import {CpfPacienteContext} from "../context/CpfPacienteContext";
import urlAPI from "../config/urlAPI";
import { getNumber } from "../utils/utils";
import eyeSlash from "../assets/eye-slash.png";
import eye from "../assets/eye.png";

function FormRecSenha() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation();

    // Variáveis do context
    const { setEmailRecSenha } = useContext(EmailRecSenhaContext);
    const { cpfPaciente, setCpfPaciente } = useContext(CpfPacienteContext);

    // Função para voltar
    function voltarLogin() {
        // Limpa os valores do email e do cpf
        setEmailRecSenha('');
        setCpfPaciente('');

        return navigation.navigate('Login')
    }

    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    function onShowConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    // Função para envio do formulário
    async function onHandleSubmit() {
        // Retorna caso não tenha informado o código
        if (!password || !confirmPassword) {
            return Alert.alert('Informe ambas as senhas');
        }

        try {
            // Gera o código de verificação
            const response = await fetch(`${urlAPI}/alterar_senha?cpf=${getNumber(cpfPaciente)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "senha": password,
                    "confirmarSenha": confirmPassword
                })
            });

            // Obtém a resposta
            const data = await response.json();

            if (response.ok) {
                // Exibe mensagem de sucesso
                Alert.alert(data.success);

                // Navega para trocar a senha
                navigation.navigate("Login");
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
            <Text style={styles.title}>Código validado!</Text>

            <Text style={styles.desc}>Cadastre e confirme sua nova senha.</Text>

            <View style={styles.inputPasswordView}>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={onShowPassword}>
                    <Image
                        style={styles.showPassword}
                        source={showPassword ? eyeSlash : eye}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputPasswordView}>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={onShowConfirmPassword}>
                    <Image
                        style={styles.showPassword}
                        source={showConfirmPassword ? eyeSlash : eye}
                    />
                </TouchableOpacity>
            </View>

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
        gap: 12,
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
    },inputPasswordView: {
        width: '100%',
        position: "relative"
    },
    showPassword: {
        width: 25,
        height: 25,
        position: "absolute",
        right: 15,
        transform: "translateY('-51%')"
    },
});

export default FormRecSenha;