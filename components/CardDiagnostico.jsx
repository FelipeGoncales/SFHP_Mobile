import React, {useContext, useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";

// Exibe um layout estático (com dados fictícios), utilizado apenas para desenvolvimento visual e testes de design.
function CardDiagnostico({ consulta, diagnostico }) {
    return (
        <View style={consulta.situacao_vetor < 5 ? styles.containerPaiNotFound : styles.containerPai}>
            {
                consulta.situacao_vetor < 5 ? (
                    <View style={styles.containerNotFound}>
                        <Image style={styles.image} source={require("../assets/lock.png")} />
                        <Text style={styles.title}>Diagnóstico pendente</Text>
                    </View>
                ) : (
                <View style={styles.card}>
                    <View style={styles.container}>
                        <Text style={styles.topic}>Diagnóstico</Text>
                        <Text>{diagnostico.diagnostico ? diagnostico.diagnostico : null}</Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.topic}>Receita</Text>
                        <Text>{diagnostico.receita ? diagnostico.receita : null}</Text>
                    </View>

                    <View style={styles.medicoView}>
                        <Text style={styles.receitadoPor}>Receitado por</Text>

                        <View style={styles.containerMedico}>
                            <Image
                                source={require("../assets/icone-user-simples.png")}
                                style={styles.UserIcon}
                            />

                            {/* Pega apenas o primeiro nome do médico */}
                            <Text style={styles.doutor}>DR. {consulta.medico ? consulta.medico.split(' ')[0] : null}</Text>
                        </View>
                    </View>
                </View>
                )
            }

        </View>
    )
}

// Exporta o componente para ser reutilizado em outras telas, permitindo futura integração com dados reais vindos da API.
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
