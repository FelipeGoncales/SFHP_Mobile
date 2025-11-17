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

    // Estados locais para armazenar a nova senha e a confirmação da senha.
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Estados que controlam a exibição da senha (mostrar/ocultar).
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Hook de navegação (React Navigation).
    const navigation = useNavigation();

    // Importa funções do contexto para manipular o email e o CPF do paciente.
    const { setEmailRecSenha } = useContext(EmailRecSenhaContext);
    const { cpfPaciente, setCpfPaciente } = useContext(CpfPacienteContext);

    function voltarLogin() {
        // Limpa o email e o CPF armazenados no contexto.
        setEmailRecSenha('');
        setCpfPaciente('');

        // Volta para a tela de login.
        return navigation.navigate('Login')
    }

    // Alterna entre mostrar ou ocultar o campo de senha.
    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    // Alterna entre mostrar ou ocultar o campo de confirmação de senha.
    function onShowConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    // Função acionada ao enviar o formulário para alterar a senha.
    async function onHandleSubmit() {
        // Verifica se ambos os campos foram preenchidos.
        if (!password || !confirmPassword) {
            return Alert.alert('Informe as senhas!');
        }

        try {
            // Requisição para a API realizar a alteração de senha.
            const response = await fetch(`${urlAPI}/alterar_senha?cpf=${getNumber(cpfPaciente)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Envia a nova senha e a confirmação no corpo da requisição.
                body: JSON.stringify({
                    "senha": password,
                    "confirmarSenha": confirmPassword
                })
            });

            // Converte a resposta da API em JSON.
            const data = await response.json();

            if (response.ok) {
                // Exibe mensagem de sucesso retornada pelo backend.
                Alert.alert(data.success);
                // Redireciona de volta para a tela de login.
                navigation.navigate("Login");
            } else {
                // Exibe o erro retornado pela API.
                Alert.alert(data.error);
            }

        } catch (err) {
            // Captura erros inesperados.
            console.log(err)
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
                <View style={styles.divShowPassword}>
                    <TouchableOpacity onPress={onShowPassword}>
                        <Image
                            style={styles.showPassword}
                            source={showPassword ? eyeSlash : eye}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputPasswordView}>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <View style={styles.divShowPassword}>
                    <TouchableOpacity onPress={onShowConfirmPassword}>
                        <Image
                            style={styles.showPassword}
                            source={showConfirmPassword ? eyeSlash : eye}
                        />
                    </TouchableOpacity>
                </View>
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
    },
    inputPasswordView: {
        width: '100%',
        position: "relative"
    },
    divShowPassword: {
        position: "absolute",
        width: "100%",
    },
    showPassword: {
        width: 25,
        height: 25,
        position: "absolute",
        right: 15,
        transform: [{ translateY: 12.5 }],
        zIndex: 99999
    },
});

export default FormRecSenha;