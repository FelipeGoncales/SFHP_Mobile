import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import colors from "../design/colors";

export default function Card_ConsultaAtual() {
    return (
        <View style={styles.containerPai}>

            {/* Cabeçalho */}
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Aguardando Triagem</Text>
                <Text style={styles.description}>Espera da triagem</Text>
            </View>

            {/* Data */}
            <View style={styles.containerDate}>
                <Image
                    source={require("../assets/icone-calendario.png")}
                    style={styles.imgCalendario}
                />
                <Text style={styles.date}>Aproximadamente 15min</Text>
            </View>

            {/* Barra de progressoo */}
            <View style={styles.progressoContainer}>
                <View style={styles.circuloActive} />
                <View style={styles.linhaActive} />
                <View style={styles.circulo} />
                <View style={styles.linha} />
                <View style={styles.circulo} />
                <View style={styles.linha} />
                <View style={styles.circulo} />
            </View>

            {/* Botão */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ver mais detalhes</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    containerPai: {
        height: 230,
        padding: 20,
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 15,
        gap: 10,
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        backgroundColor: colors.yellow_fundo,
        paddingHorizontal: 13,
        paddingVertical: 5,
        borderRadius: 30,
        color: colors.yellowProtocol,
    },
    imgCalendario: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    date: {
        fontSize: 15,
        color: colors.grayDark,
        fontWeight: 'bold',
    },

    // ===== Linha de progresso =====
    progressoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 28,
        marginTop: 4,
    },
    circulo: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: colors.gray200,
    },
    circuloActive: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: colors.blueBase,
    },
    linha: {
        flex: 1,
        height: 5,
        backgroundColor: colors.gray200,
        marginHorizontal: 4,
        borderRadius: 3,
    },
    linhaActive: {
        flex: 1,
        height: 5,
        marginHorizontal: 4,
        borderRadius: 3,
        backgroundColor: colors.blueBase,
    },

    button: {
        backgroundColor: colors.blueDark,
        borderRadius: 10,
        paddingVertical: 11,
        alignItems: "center",
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 15,
    },
});
