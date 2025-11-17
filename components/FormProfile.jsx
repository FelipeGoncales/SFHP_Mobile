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

    // CPF
    const [CPFfixo, setCPFfixo] = useState('');
    const [CPF, setCPF] = useState('');

    // Nome
    const [nomeFixo, setNomeFixo] = useState('');
    const [nome, setNome] = useState('');

    // Email
    const [email, setEmail] = useState('');

    // SUS
    const [sus, setSus] = useState('');

    // Telefone
    const [telefone, setTelefone] = useState('');

    // Sexo
    const [sexo, setSexo] = useState('');

    // Data nascimento
    const [dataNascimento, setDataNascimento] = useState('');

    // Obtém a função para armazenar o token (chave de acesso) em um estado global (Context) após um login bem-sucedido.
    const { token } = useContext(TokenContext);

    // useEffect para carregar dados ao abrir a página
    useEffect(() => {
        const fetchGetDataUser = async () => {
            try {
                const response = await fetch(`${UrlAPI}/cadastro`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    // Dado do usuário
                    const user = data.user;

                    // CPF
                    formatCPF(user.cpf, setCPF);
                    formatCPF(user.cpf, setCPFfixo);

                    // Email
                    setEmail(user.email);

                    // Nome
                    setNome(user.nome);
                    setNomeFixo(formatNomeFixo(user.nome, 18));

                    // Telefone
                    formatTelefone(user.telefone, setTelefone);
                    // Data nascimento
                    setDataNascimento(
                        new Date(user.data_nascimento).toLocaleDateString("pt-BR")
                    );
                    // SUS
                    setSus(user.coren_crm_sus)
                    // Sexo
                    setSexo(user.sexo)
                } else {
                    Alert.alert(data.error);
                }

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                Alert.alert("Erro ao carregar dados.");
            }
        };

        fetchGetDataUser();
    }, [token]);

    // Envio do formulário
    async function onHandleSubmit() {
        // Formata a data de nascimento
        const lista = dataNascimento.split('/')
        const dataFormatada = lista.reverse().join('-');

        // Requisição PUT para edição do cadastro
        const response = await fetch(`${UrlAPI}/cadastro`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
                cpfAntigo: getNumber(CPFfixo),
                cpfNovo: getNumber(CPF),
                nome: nome,
                telefone: getNumber(telefone),
                sexo: sexo,
                nascimento: dataFormatada,
                coren_crm_sus: getNumber(sus)
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Dado do usuário
            Alert.alert(data.success);

            // Altera os novos valores de CPF e nome
            formatCPF(CPF, setCPFfixo);
            // Salva o nome novo
            setNomeFixo(formatNomeFixo(nome, 18));
        } else {
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
        margin: 25,
        boxSizing: "border-box",
        borderRadius: 15,
        alignItems: "center",
        paddingVertical: 30,
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