import { useContext, useState } from "react";
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";
import { useNavigation } from "@react-navigation/native";
import { TokenContext } from "../context/tokenContext";
import { formatCPF } from "../utils/masks";

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
                body: JSON.stringify({ cpf: CPF, senha: password }),
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
        } catch {
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
                <Text style={styles.recSenha}>Recuperar senha</Text>
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