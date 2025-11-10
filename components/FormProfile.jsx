import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity} from "react-native";
import colors from "../design/colors";
import Colors from "../design/colors";
import { Picker } from "@react-native-picker/picker";

function FormProfile() {
    return (
        <View style={styles.containerForm}>
            <View style={styles.header}>
                <Image style={styles.imgUser} source={require("../assets/icone-usuario.png")} />

                <View>
                    <Text style={styles.titleNome}>Nome do paciente</Text>
                    <Text style={styles.textCPF}>123.456.789-10</Text>
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.viewForm}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}
                               placeholder={"Nome do paciente"}
                    />
                </View>

                <View style={styles.viewForm}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput style={styles.input}
                               placeholder={"emailpaciente@email.com"}
                    />
                </View>

                <View style={styles.viewForm}>
                    <Text style={styles.label}>CPF</Text>
                    <TextInput style={styles.input}
                               placeholder={"123.456.789-10"}
                    />
                </View>

                <View style={styles.viewForm}>
                    <Text style={styles.label}>Número do SUS</Text>
                    <TextInput style={styles.input}
                               placeholder={"7040 2032 0235 1267"}
                    />
                </View>

                <View style={styles.viewForm}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input}
                               placeholder={"(18) 99999-9999"}
                    />
                </View>

                <View style={styles.viewForm}>
                    <Text style={styles.label}>Sexo</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                        >
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Feminino" value="feminino" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.viewForm}>
                    <Text style={styles.label}>Data de nascimento</Text>
                    <TextInput style={styles.input}
                               placeholder={"01/01/1999"}
                    />
                </View>

            </View>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Salvar alterações</Text>
            </TouchableOpacity>

        </View>
    )
}

export default FormProfile;

const styles = StyleSheet.create({
    containerForm: {
        backgroundColor: Colors.white,
        margin: 25,
        boxSizing: "border-box",
        height: 800,
        borderRadius: 15,
        alignItems: "center",

    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        gap: 10
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 7,
        padding: 14,
        fontWeight: "bold",
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