import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";
import colors from "../design/colors";
import Colors from "../design/colors";
import { Picker } from "@react-native-picker/picker";
import {useContext, useEffect, useState} from "react";
import { TokenContext } from "../context/tokenContext";
import UrlAPI from "../config/urlAPI";
import { formatCPF, formatTelefone, formatDataNascimento, formatSUS } from "../utils/masks.js";
import { getNumber, formatNomeFixo } from "../utils/utils.js";

function FormProfile() {

    // Guarda o CPF original.
    const [CPFfixo, setCPFfixo] = useState('');
    // Guarda o CPF editável.
    const [CPF, setCPF] = useState('');

    // Guarda a versão original do nome.
    const [nomeFixo, setNomeFixo] = useState('');
    // Guarda o nome editável.
    const [nome, setNome] = useState('');

    // Armazena o email.
    const [email, setEmail] = useState('');

    // Armazena o número do SUS.
    const [sus, setSus] = useState('');

    // Armazena o telefone.
    const [telefone, setTelefone] = useState('');

    // Armazena o sexo.
    const [sexo, setSexo] = useState('');

    // Armazena a data de nascimento.,
    const [dataNascimento, setDataNascimento] = useState('');

    // Pega o token armazenado de forma global (Context API).
    const { token } = useContext(TokenContext);

    // 'useEffect' para carregar dados ao abrir a página.
    useEffect(() => {
        
        // Função assíncrona que busca os dados do usuário na API.
        const fetchGetDataUser = async () => {
            try {
                const response = await fetch(`${UrlAPI}/cadastro`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                
                // Converte resposta para JSON.
                const data = await response.json();

                if (response.ok) {
                    // Dados retornados da API.
                    const user = data.user;

                    // Formata e atualiza o CPF.
                    formatCPF(user.cpf, setCPF);
                    formatCPF(user.cpf, setCPFfixo);

                    // Atualiza o email.
                    setEmail(user.email);

                    // Atualiza o nome.
                    setNome(user.nome);
                    // Formata o nome, exibindo cortado (com limite).
                    setNomeFixo(formatNomeFixo(user.nome, 18));

                    // Formata e atualiza o telefone.
                    formatTelefone(user.telefone, setTelefone);
                    
                    // Converte para formato brasileiro e atualiza a data.
                    setDataNascimento(
                        new Date(user.data_nascimento).toLocaleDateString("pt-BR")
                    );
                    
                    // Atualiza o número do SUS.
                    setSus(user.coren_crm_sus)
                    
                    // Atualiza o sexo.
                    setSexo(user.sexo)
                    
                } else {
                    // Exibe erro vindo da API.
                    Alert.alert(data.error);
                }

            } catch (error) {
                // Caso ocorra erro de conexão ou servidor.
                console.error("Erro ao buscar dados:", error);
                Alert.alert("Erro ao carregar dados.");
            }
        };

        // A função de busca é chamada quando o usuário abre a página em que está o FormProfile.
        fetchGetDataUser();

    // Executa sempre que o token mudar (após login).
    }, [token]);

    // Envio do formulário.
    async function onHandleSubmit() {
        // Formata a data de nascimento.
        const lista = dataNascimento.split('/')
        const dataFormatada = lista.reverse().join('-');

        // Envia dados atualizados para a API.
        const response = await fetch(`${UrlAPI}/cadastro`, {
            method: "PUT", // Método de edição.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // Transforma o objeto em texto.
            body: JSON.stringify({
                email: email,
                cpfAntigo: getNumber(CPFfixo), // Remove máscaras.
                cpfNovo: getNumber(CPF), // Remove máscaras.
                nome: nome,
                telefone: getNumber(telefone), // Remove máscaras.
                sexo: sexo,
                nascimento: dataFormatada,
                coren_crm_sus: getNumber(sus) // Remove máscaras.
            })
        });
        
        // Converte resposta da API.
        const data = await response.json();

        // Caso a edição tenha sido bem-sucedida.
        if (response.ok) {
            // Exibe mensagem de sucesso.
            Alert.alert(data.success);

            // Atualiza os novos valores de CPF e nome.
            formatCPF(CPF, setCPFfixo);
            setNomeFixo(formatNomeFixo(nome, 18));
            
        } else {
            // Exibe mensagem de erro
            Alert.alert(data.error);
        }
    }

    return (
        <ScrollView>

            <View style={styles.containerForm}>
                <View style={styles.header}>
                    <Image style={styles.imgUser} source={require("../assets/icone-usuario.png")} />

                    <View>
                        <Text style={styles.titleNome}>{nomeFixo}</Text>
                        <Text style={styles.textCPF}>{CPFfixo}</Text>
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.viewForm}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput style={styles.input}
                                   value={nome}
                                   onChangeText={setNome}
                        />
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput style={styles.input}
                                   value={email}
                                   onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.label}>CPF</Text>
                        <TextInput style={styles.input}
                                   value={CPF}
                                   onChangeText={(text) => formatCPF(text, setCPF)}
                        />
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.label}>Número do SUS</Text>
                        <TextInput style={styles.input}
                                   value={sus}
                                   placeholder={"Número do SUS"}
                                   onChangeText={(text) => formatSUS(text, setSus)}
                        />
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.label}>Telefone</Text>
                        <TextInput style={styles.input}
                                   value={telefone}
                                   onChangeText={(text) => formatTelefone(text, setTelefone)}
                        />
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.label}>Sexo</Text>
                        <View style={styles.pickerContainer}>
                                { sexo === 1 ? (
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={sexo}
                                        onValueChange={(value) => setSexo(value)}
                                    >
                                        <Picker.Item label="Masculino" value="1" />
                                        <Picker.Item label="Feminino" value="2" />
                                    </Picker>
                                ) : (

                                    <Picker
                                        style={styles.picker}
                                        selectedValue={sexo}
                                        onValueChange={(value) => setSexo(value)}
                                    >
                                        <Picker.Item label="Feminino" value="2" />
                                        <Picker.Item label="Masculino" value="1" />
                                    </Picker>
                                )}
                        </View>
                    </View>

                    <View style={styles.viewForm}>
                        <Text style={styles.label}>Data de nascimento</Text>
                        <TextInput style={styles.input}
                                   value={dataNascimento}
                                   onChangeText={(text) => formatDataNascimento(text, setDataNascimento)}
                        />
                    </View>

                </View>

                <TouchableOpacity style={styles.btn} onPress={onHandleSubmit}>
                    <Text style={styles.btnText}>Salvar alterações</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default FormProfile;

const styles = StyleSheet.create({
    containerForm: {
        backgroundColor: Colors.white,
        width: '90%',
        alignSelf: 'center',
        boxSizing: "border-box",
        borderRadius: 15,
        alignItems: "center",
        paddingVertical: 30,
        marginBottom: 25
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15
    },
    imgUser: {
        width: 60,
        height: 60,
    },
    titleNome: {
        fontSize: 19,
        fontWeight: "bold",
    },
    textCPF: {
        fontSize: 16,
        fontWeight: "400"
    },
    viewForm: {
        gap: 5,
    },
    form:{
        width: "85%",
        gap: 15
    },
    label: {
      fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 7,
        padding: 14,
    },
    btn: {
        backgroundColor: colors.blueDark,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        width: '85%',
        marginTop: 20
    },
    btnText: {
        color: colors.white,
        fontWeight: "700",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        overflow: "hidden",
    },
    picker: {
        height: 50,
        color: "#000",
    },
})
