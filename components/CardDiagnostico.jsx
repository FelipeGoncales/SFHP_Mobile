import React, {useContext, useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";

// Componente que recebe uma consulta e um diagnóstico como propriedades
function CardDiagnostico({ consulta, diagnostico }) {
    return (
        // Container externo muda dependendo do diagnóstico estar liberado ou não
        <View style={consulta.situacao_vetor < 5 ? styles.containerPaiNotFound : styles.containerPai}>
            {
                // Se a situação da consulta for menor que 5, significa que o diagnóstico está pendente
                consulta.situacao_vetor < 5 ? (
                    // Card mostrando que o diagnóstico ainda não está disponível
                    <View style={styles.containerNotFound}>
                        <Image style={styles.image} source={require("../assets/lock.png")} />
                        <Text style={styles.title}>Diagnóstico pendente</Text>
                    </View>
                ) : (
                // Caso contrário, o diagnóstico está liberado e é exibido
                <View style={styles.card}>
                    {/* Bloco do diagnóstico */}
                    <View style={styles.container}>
                        <Text style={styles.topic}>Diagnóstico</Text>
                        {/* Só exibe o texto se existir para evitar erro */}
                        <Text>{diagnostico.diagnostico ? diagnostico.diagnostico : null}</Text>
                    </View>

                    {/* Bloco da receita */}
                    <View style={styles.container}>
                        <Text style={styles.topic}>Receita</Text>
                        {/* Só exibe o texto se existir para evitar erro */}
                        <Text>{diagnostico.receita ? diagnostico.receita : null}</Text>
                    </View>

                    {/* Exibição do médico que receitou */}
                    <View style={styles.medicoView}>
                        <Text style={styles.receitadoPor}>Receitado por</Text>

                        <View style={styles.containerMedico}>
                            <Image
                                source={require("../assets/icone-user-simples.png")}
                                style={styles.UserIcon}
                            />

                            {/* Exibe apenas o primeiro nome do médico usando split */}
                            <Text style={styles.doutor}>DR. {consulta.medico ? consulta.medico.split(' ')[0] : null}</Text>
                        </View>
                    </View>
                </View>
                )
            }

        </View>
    )
}

export default CardDiagnostico;

const styles = StyleSheet.create({
    containerPaiNotFound: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 25,
        height: 250,
    },

    containerPai: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 25,
        height: 250,
    },

    containerNotFound: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },

    title: {
        fontSize: 17,
        color: colors.black,
    },

    topic: {
        fontSize: 16,
        fontWeight: 500,
    },

    container: {
        gap: 5,
        alignItems: "flex-start",
    },

    card: {
        gap: 20,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    UserIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    medicoView: {
        position: "absolute",
        top: 0,
        right: 0,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    receitadoPor: {
        fontSize: 14,
        fontWeight: "300",
    },

    containerMedico: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5
    },

    doutor: {
        fontWeight: "bold",
        fontSize: 16,
    }
})
