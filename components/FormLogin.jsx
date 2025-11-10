import { useContext, useState } from "react";
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";
import { useNavigation } from "@react-navigation/native";
import { TokenContext } from "../context/tokenContext";
import { EmailRecSenhaContext } from "../context/emailRecSenhaContext";
import { CpfPacienteContext } from "../context/CpfPacienteContext";
import { formatCPF } from "../utils/masks";
import { getNumber } from "../utils/utils";

// Import das imagens fixas
import eye from '../assets/eye.png';
import eyeSlash from '../assets/eye-slash.png';

function FormLogin() {
    // Variáveis state de CPF e senha
    const [CPF, setCPF] = useState("");
    const [password, setPassword] = useState("");

    // Variável de controle para mostrar ou não a senha
    const [showPassword, setShowPassword] = useState(false);

    // Hook useNavigation
    const navigation = useNavigation();

    // useState do token (context)
    const { setToken } = useContext(TokenContext);

    // useState do email para recuperação de senha
    const { setEmailRecSenha } = useContext(EmailRecSenhaContext);

    // useState do CPF para recuperação de senha
    const { setCpfPaciente } = useContext(CpfPacienteContext);

    // Função para alterar a visibilidade da senha
    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    // Função assíncrona para envio do formulário
    async function handleSubmit() {
        try {
            const response = await fetch(`${urlAPI}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cpf: getNumber(CPF), senha: password }),
            });

            // Obtém a resposta
            const data = await response.json();

            if (response.ok) {
                // Armazena o token
                setToken(data.token);

                // Navega para home
                navigation.navigate("Home");
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

    // Função para redirecionar para a página de recuperar senha
    async function redirectRecSenha() {
        // Retorna caso não tenha informado o CPF
        if (!CPF) {
            return Alert.alert('Informe o CPF!');
        }

        try {

            // Gera o código de verificação
            const response = await fetch(`${urlAPI}/gerar_codigo?cpf=${getNumber(CPF)}`, {
                method: "POST",
            });

            // Obtém a resposta
            const data = await response.json();

            if (response.ok) {
                // Armazena o endereço de email para recuperação de senha
                setEmailRecSenha(data.email);

                // Armazena o CPF do paciente
                setCpfPaciente(getNumber(CPF));

                // Navega para recuperação de senha
                navigation.navigate("RecSenha");
            } else {
                // Alerta o erro
                Alert.alert(data.error);
            }
        } catch (err) {
            // Erro inesperado
            Alert.alert("Erro", "Não foi possível conectar ao servidor");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar na conta</Text>

            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={CPF}
                onChangeText={(text) => formatCPF(text, setCPF)}
                keyboardType="numeric"
            />

            <View style={styles.viewPassword}>
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
                <TouchableOpacity onPress={() => redirectRecSenha()}>
                    <Text style={styles.recSenha}>Recuperar senha</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.blueDark,
        fontSize: 20,
        fontWeight: 700
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
    viewPassword: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    inputPasswordView: {
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 7,
        padding: 14,
        marginBottom: 15,
        width: '100%'
    },
    recSenha: {
        color: colors.black,
        opacity: 0.5
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
    }
});

export default FormLogin;