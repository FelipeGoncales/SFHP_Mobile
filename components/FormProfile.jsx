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
import Colors from "../design/colors";

function FormProfile() {
    return (
        <View style={styles.containerForm}>
            <View style={styles.header}>
                <Image style={styles.imgUser} source={require("../assets/icone-usuario.png")} />

                <View style={styles.viewTitle}>
                    <Text style={styles.titleNome}>Nome do paciente</Text>
                    <Text style={styles.textCPF}>123.456.789-10</Text>
                </View>
            </View>

            <View style={styles.form}>
                <View style={styles.viewName}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}
                               placeholder={"Nome do paciente"}
                    />
                </View>

            </View>

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
        padding: 30,
        gap: 10
    },
    imgUser: {
        width: 60,
        height: 60,
    },
    viewTitle: {

    },
    titleNome: {
        fontSize: 19,
        fontWeight: "bold",
    },
    textCPF: {
        fontSize: 16,
        fontWeight: "400"
    },

})