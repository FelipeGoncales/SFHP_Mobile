import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../design/colors";
import CardDetalhesConsulta from "../components/CardDetalhesConsulta";
import CardDiagnostico from "../components/CardDiagnostico";

function DetalhesConsultaScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Botão de voltar */}
                <TouchableOpacity style={styles.Return} onPress={navigation.goBack}>
                    <Image
                        source={require("../assets/seta-esquerda.png")}
                        style={styles.ReturnIcon}
                    />
                    <Text style={styles.ReturnText}>Detalhes da Consulta</Text>
                </TouchableOpacity>

                {/* Card principal */}
                <CardDetalhesConsulta />

                <CardDiagnostico />
            </View>
        </ScrollView>
    );
}

export default DetalhesConsultaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        paddingBottom: 70,
        gap: 20,
    },

    Return: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
    },

    ReturnIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        tintColor: colors.blueDark,
    },

    ReturnText: {
        fontSize: 22,
        color: colors.blueDark,
        fontWeight: "bold",
    },
});
