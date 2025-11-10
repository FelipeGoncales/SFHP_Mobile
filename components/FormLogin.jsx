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

// Import das imagens fixas.
import eye from '../assets/eye.png';
import eyeSlash from '../assets/eye-slash.png';

function FormLogin() {

    // Cria uma variável de estado para armazenar o valor digitado no campo de texto e uma função (set) para atualizá-la.
    const [CPF, setCPF] = useState("");
    const [password, setPassword] = useState("");

    // Variável para controlar se o campo de senha deve ser exibido como texto normal (true) ou oculto com pontos (false).
    const [showPassword, setShowPassword] = useState(false);

    // Fornece a função navigation para mudar de tela no aplicativo.
    const navigation = useNavigation();

    // Obtém a função para armazenar o token (chave de acesso) em um estado global (Context) após um login bem-sucedido.
    const { setToken } = useContext(TokenContext);

    // Obtém a função para armazenar o e-mail do paciente.
    const { setEmailRecSenha } = useContext(EmailRecSenhaContext);

    // Obtém a função para armazenar o CPF do paciente.
    const { setCpfPaciente } = useContext(CpfPacienteContext);

    // Função para alterar a visibilidade da senha.
    function onShowPassword() {
        setShowPassword(!showPassword);
    }

    // Função, com operações assíncronas (que levam tempo), para envio do formulário.
    async function handleSubmit() {

        // Lida com erros que podem ocorrer durante a execução do código.
        try {
            // Inicia a requisição de rede (fetch) de forma assíncrona (await).
            // ${urlAPI}/login: Endereço para a rota de login no servidor.
            const response = await fetch(`${urlAPI}/login`, {
                method: "POST",
                // Informa ao servidor que o corpo da requisição está sendo enviado no formato JSON.
                headers: { "Content-Type": "application/json" },
                // Transforma o objeto JavaScript com o CPF e a senha em uma string JSON, que é o formato exigido pela API.
                // getNumber(CPF): Remove pontos e traços do CPF antes de enviá-lo.
                body: JSON.stringify({ cpf: getNumber(CPF), senha: password }),
            });

            // Obtém a resposta da requisição e a transforma em um objeto JavaScript (JSON).
            // 'await': Conversão é assíncrona.
            const data = await response.json();

            // Se a requisição for bem-sucedida.
            if (response.ok) {
                // Armazena o token de autenticação (recebido da API) no estado global (Context API).
                setToken(data.token);
                // Redireciona o paciente para a tela principal do aplicativo.
                navigation.navigate("Home");
            } else {
                // Exibe um alerta com a mensagem de erro retornada pela API.
                Alert.alert(data.error);
            }
            
        } catch (err) { // Tratamento de Erro Inesperado
            // Imprime o erro no console
            console.log(err)
            // Exibe um alerta genérico para o paciente informando a falha de conexão.
            Alert.alert("Erro", "Não foi possível conectar ao servidor");
        }

    }

    // Função assíncrona para redirecionar para a página de recuperar senha.
    async function redirectRecSenha() {
        // Retorna caso o paciente não tenha informado o CPF.
        if (!CPF) {
            return Alert.alert('Informe o CPF!');
        }

        // Tenta executar a requisição à API.
        try {
            // Gera o código de verificação.
            const response = await fetch(`${urlAPI}/gerar_codigo?cpf=${getNumber(CPF)}`, {
                method: "POST",
            });

            // Aguarda a resposta do servidor e a converte em um objeto JavaScript.
            const data = await response.json();

            // Verifica se a resposta foi bem-sucedida.
            if (response.ok) {
                // Salva o endereço de e-mail (retornado pela API).
                setEmailRecSenha(data.email);

                // Salva o CPF.
                setCpfPaciente(getNumber(CPF));

                // Leva o paciente para a próxima tela.
                navigation.navigate("RecSenha");
            } else {
                // Exibe um alerta com a mensagem de erro fornecida pelo servidor.
                Alert.alert(data.error);
            }
        } catch (err) { // Tratamento de Erro Inesperado
            // Exibe um alerta genérico para o paciente informando a falha de conexão.
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