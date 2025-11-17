import React, { useContext, useState } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";

function CardDiagnostico() {
    return (
        <View style={styles.containerPai}>

            {/*<View style={styles.containerNotFound}>*/}
            {/*    <Image style={styles.image} source={require("../assets/lock.png")} />*/}
            {/*    <Text style={styles.title}>Diagnóstico pendente</Text>*/}
            {/*</View>*/}

            <View style={styles.card}>
                <View style={styles.container}>
                    <Text style={styles.topic}>Diagnóstico</Text>
                    <Text>Virose</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.topic}>Receita</Text>
                    <Text>Hidratação</Text>
                </View>

                <View style={styles.medicoView}>
                    <Text style={styles.receitadoPor}>Receitado por</Text>

                    <Text style={styles.containerMedico}>
                        <Image
                            source={require("../assets/icone-user-simples.png")}
                            style={styles.UserIcon}
                        />
                        <Text style={styles.doutor}>Dr. Thomás</Text>
                    </Text>
                </View>
            </View>

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
        width: 30,
        height: 30,
        resizeMode: "contain",
        tintColor: colors.black,
    },

    medicoView: {
        position: "absolute",
        top: 0,
        right: 0
    },

    receitadoPor: {
        fontSize: 14,
        fontWeight: "300",
    },

    containerMedico: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 14
    },

    doutor: {
        fontWeight: "bold",
        fontSize: 16,
    }
})