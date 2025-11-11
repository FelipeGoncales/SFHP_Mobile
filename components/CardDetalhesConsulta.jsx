import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../design/colors";

export default function CardDetalhesConsulta() {
    return (
        <View style={styles.containerPai}>
            {/* Título e status */}
            <View style={styles.containerTitle}>
                <View>
                    <Text style={styles.title}>Aguardando Triagem</Text>
                    <Text style={styles.date}>15/09/2025</Text>
                </View>
                <Text style={styles.description}>Espera da triagem</Text>
            </View>

            {/* Linha vertical de progresso */}
            <View style={styles.timeline}>
                <View style={[styles.circle, styles.circleActive]} />

                <View style={[styles.line, styles.lineActive]} />

                <View style={styles.circle} />

                <View style={styles.line} />

                <View style={styles.circle} />

                <View style={styles.line} />

                <View style={styles.circle} />
            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Tempo até a próxima etapa</Text>
                    <View style={styles.footerContent}>
                        <Image
                            source={require("../assets/clock-timer.png")}
                            style={styles.footerIcon}
                        />
                        <Text style={styles.footerValue}>00:18:32</Text>
                    </View>
                </View>

                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Posição na fila</Text>
                    <View style={styles.footerContent}>
                        <Text style={styles.footerValue}>7°</Text>
                        <Image
                            source={require("../assets/icone-user-simples.png")}
                            style={styles.footerIcon}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPai: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 16,
    },



    containerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    date: {
        fontSize: 13,
        color: colors.grayDark,
    },
    description: {
        backgroundColor: colors.yellow_fundo,
        color: colors.yellowProtocol,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        fontSize: 12,
    },

    timeline: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
    },
    step: {
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 8,
        backgroundColor: colors.gray200,
        marginRight: 10,
    },
    circleActive: {
        backgroundColor: colors.blueBase,
    },
    line: {
        width: 5,
        height: 40,
        backgroundColor: colors.gray200,
        marginLeft: 6.5,
    },
    lineActive: {
        backgroundColor: colors.blueBase,
    },
    stepText: {
        fontSize: 16,
        color: colors.black,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    footerItem: {
        alignItems: "center",
        gap: 5,
    },
    footerLabel: {
        color: colors.blueDark,
        fontSize: 13,
        fontWeight: "bold",
    },
    footerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    footerValue: {
        fontSize: 21,
        fontWeight: "bold",
        color: colors.black,
    },
    footerIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        tintColor: colors.black,
    },
});
