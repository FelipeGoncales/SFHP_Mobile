import React, {useContext, useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../design/colors";
import {IdConsultaContext} from "../context/IdConsultaContext";

// Exibe um layout estático (com dados fictícios), utilizado apenas para desenvolvimento visual e testes de design.
// Exporta o componente para ser reutilizado em outras telas, permitindo futura integração com dados reais vindos da API.
export default function CardDetalhesConsulta({ consulta }) {

    return (
        <View style={styles.containerPai}>
            {/* Título e status lado a lado */}
            <View style={styles.containerTitle}>
                {/* bloco esquerdo: título + data */}
                <View style={styles.leftBlock}>
                    <Text style={styles.title}>{consulta.situacao}</Text>
                    <Text style={styles.date}>{new Date(consulta.data_entrada).toLocaleDateString("pt-BR")}</Text>
                </View>

                {/* bloco direito: tag de status */}
                <Text style={consulta.situacao_vetor === 5 ? styles.descriptionConcluded : styles.description}>{ consulta.situacao_vetor === 5 ? "Concluída" : "Em andamento" }</Text>
            </View>

            {/* Timeline */}
            <View style={styles.timeline}>
                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaRight}>Recepção</Text>
                    <View style={[styles.circle, consulta.situacao_vetor >= 1 ? styles.circleActive : null]} />
                </View>

                <View style={[styles.line, consulta.situacao_vetor >= 1 ? styles.circleActive : null]} />

                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaLeft}>Triagem</Text>
                    <View style={[styles.circle, consulta.situacao_vetor >= 2 ? styles.circleActive : null]} />
                </View>

                <View style={[styles.line, consulta.situacao_vetor >= 3 ? styles.circleActive : null]} />

                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaRight}>Consulta</Text>
                    <View style={[styles.circle, consulta.situacao_vetor >= 4 ? styles.circleActive : null]} />
                </View>

                <View style={[styles.line, consulta.situacao_vetor >= 5 ? styles.circleActive : null]} />

                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaLeft}>Alta</Text>
                    <View style={[styles.circle, consulta.situacao_vetor >= 5 ? styles.circleActive : null]} />
                </View>
            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>Tempo até a próxima etapa</Text>
                    <View style={styles.footerContent}>
                        <Image
                            source={require("../assets/clock-timer.png")}
                            style={styles.ClockIcon}
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
                            style={styles.UserIcon}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPai: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 25,
    },

    containerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 25,
    },

    leftBlock: {
        flexDirection: "column",
        alignItems: "flex-start",
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
    },

    date: {
        fontSize: 16,
        color: colors.grayDark,
        marginTop: 4,
        fontWeight: "bold",
    },

    description: {
        backgroundColor: colors.yellow_fundo,
        color: colors.yellowProtocol,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 25,
        fontSize: 14,
    },

    descriptionConcluded: {
        backgroundColor: colors.greenLight,
        color: colors.greenDark,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 25,
        fontSize: 14,
    },

    timeline: {
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        marginVertical: 20,
    },
    circle: {
        width: 21,
        height: 21,
        borderRadius: 11,
        backgroundColor: colors.gray200,
    },
    circleActive: {
        backgroundColor: colors.blueBase,
    },
    line: {
        width: 7,
        height: 60,
        backgroundColor: colors.gray200,
    },
    lineActive: {
        backgroundColor: colors.blueBase,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 25,
    },
    footerItem: {
        alignItems: "center",
        gap: 8,
    },
    footerLabel: {
        color: colors.blueDark,
        fontSize: 16,
        fontWeight: "bold",
    },
    footerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    footerValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.black,
    },
    UserIcon: {
        width: 35,
        height: 35,
        resizeMode: "contain",
        tintColor: colors.black,
    },
    ClockIcon: {
        width: 23,
        height: 23,
        resizeMode: "contain",
        tintColor: colors.black,
    },

    containerCircle: {
        position: "relative",
    },

    textEtapaRight: {
        position: "absolute",
        left: 40,
        fontSize: 16,
        fontWeight: "medium",
    },

    textEtapaLeft: {
        position: "absolute",
        right: 40,
        fontSize: 16,
        fontWeight: "medium",
    }
});
