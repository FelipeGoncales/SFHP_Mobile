import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../design/colors";
import CardDetalhesConsulta from "../components/CardDetalhesConsulta";
import CardDiagnostico from "../components/CardDiagnostico";

function DetalhesConsultaScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Botão de voltar */}
            <TouchableOpacity style={styles.Return} onPress={navigation.goBack}>
                <Image
                    source={require("../assets/seta-esquerda.png")}
                    style={styles.ReturnIcon}
                />
                <Text style={styles.ReturnText}>Detalhes da Consulta</Text>
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.containerCards}>
                    {/* Card principal */}
                    <CardDetalhesConsulta />

                    <CardDiagnostico />
                </View>
            </ScrollView>
        </View>
    );
}

export default DetalhesConsultaScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 54,
        gap: 20,
        height: "100%",
    },
    containerCards: {
        gap: 15,
        paddingBottom: 25,
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
