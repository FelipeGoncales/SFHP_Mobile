import React, {useContext, useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../design/colors";
import {IdConsultaContext} from "../context/IdConsultaContext";

// Componente que exibe detalhes de uma consulta
export default function CardDetalhesConsulta({ consulta }) {

    const minutos = consulta.tempo_espera;

    // Espera em horas
    let espera_horas = Math.floor(minutos / 60);

    if (String(espera_horas).length < 2) {
        espera_horas = `0${espera_horas}`
    }

    // Espera em minutos
    let espera_minutos = minutos % 60;

    if (String(espera_minutos).length < 2) {
        espera_minutos = `0${espera_minutos}`
    }

    // Tempo formatado
    const tempo_espera = `${espera_horas}h ${espera_minutos}min`;

    return (
        <View style={styles.containerPai}>
            {/* Cabeçalho com título da situação e data */}
            <View style={styles.containerTitle}>
                {/* Bloco esquerdo: situação e data */}
                <View style={styles.leftBlock}>
                    {/* Exibe o texto da situação da consulta */}
                    <Text style={styles.title}>{consulta.situacao}</Text>
                    {/* Converte a data de entrada da consulta para formato brasileiro */}
                    <Text style={styles.date}>{new Date(consulta.data_entrada).toLocaleDateString("pt-BR")}</Text>
                </View>

                {/* Bloco direito: exibe o status como tag */}
                {/* Se situacao_vetor === 5 → concluída, senão → em andamento */}
                <Text style={consulta.situacao_vetor === 5 ? styles.descriptionConcluded : styles.description}>{ consulta.situacao_vetor === 5 ? "Concluída" : "Em andamento" }</Text>
            </View>

            {/* Timeline com as etapas da consulta */}
            <View style={styles.timeline}>
                {/* Etapa 1: Recepção */}
                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaRight}>Recepção</Text>
                    {/* Círculo fica ativo se situacao_vetor >= 1 */}
                    <View style={[styles.circle, consulta.situacao_vetor >= 1 ? styles.circleActive : null]} />
                </View>

                {/* Linha entre as etapas */}
                <View style={[styles.line, consulta.situacao_vetor >= 1 ? styles.circleActive : null]} />

                {/* Etapa 2: Triagem */}
                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaLeft}>Triagem</Text>
                    {/* Círculo fica ativo se situacao_vetor >= 2 */}
                    <View style={[styles.circle, consulta.situacao_vetor >= 2 ? styles.circleActive : null]} />
                </View>
                
                {/* Linha entre as etapas */}
                <View style={[styles.line, consulta.situacao_vetor >= 3 ? styles.circleActive : null]} />

                {/* Etapa 3: Consulta */}
                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaRight}>Consulta</Text>
                    {/* Círculo fica ativo se situacao_vetor >= 4 */}
                    <View style={[styles.circle, consulta.situacao_vetor >= 4 ? styles.circleActive : null]} />
                </View>

                {/* Linha entre as etapas */}
                <View style={[styles.line, consulta.situacao_vetor >= 5 ? styles.circleActive : null]} />
                
                {/* Etapa 4: Alta */}
                <View style={styles.containerCircle}>
                    <Text style={styles.textEtapaLeft}>Alta</Text>
                    {/* Círculo fica ativo se situacao_vetor >= 5 */}
                    <View style={[styles.circle, consulta.situacao_vetor >= 5 ? styles.circleActive : null]} />
                </View>
            </View>

            {/* Rodapé com informações adicionais */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Text style={styles.footerLabel}>{consulta.situacao_vetor == 5 ? "Tempo total de atendimento" : "Tempo estimado até a próxima etapa"}</Text>
                    <View style={styles.footerContent}>
                        <Image
                            source={require("../assets/clock-timer.png")}
                            style={styles.ClockIcon}
                        />
                        {/* Valor estático apenas para exemplo visual */}
                        <Text style={styles.footerValue}>{tempo_espera}</Text>
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
        justifyContent: "center",
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
        textAlign: "center",
    },
    footerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    footerValue: {
        fontSize: 21,
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
