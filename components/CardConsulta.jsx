import { useContext, useState } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";

function CardConsulta() {
    return (
        <View style={styles.containerPai}>

            <View style={styles.containerTitle}>
                <Text style={styles.title}>Alta Recebida</Text>
                <Text style={styles.description}>Concluído</Text>
            </View>

            <View style={styles.containerDate}>
                <Image source={require('../assets/icone-calendario.png')} style={styles.imgCalendario}></Image>
                <Text style={styles.date}>11/09/2025</Text>
            </View>

            <View style={styles.containerMoreDetails}>
                <Text style={styles.diagnostic}>Diagnóstico: Virose</Text>

                <TouchableOpacity style={styles.btnMoreDetails}>
                    <Text style={styles.textMoreDetails}>Ver mais detalhes</Text>
                    <Image source={require('../assets/seta-direita.png')} style={styles.imgSeta}></Image>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default CardConsulta;

const styles = StyleSheet.create({
    containerPai: {
        height: 200,
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
        fontSize: 16,
        backgroundColor: colors.greenLight,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 50,
        color: colors.greenDark,
    },
    imgCalendario: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    date: {
        fontSize: 17,
        color: colors.grayDark,
        fontWeight: 'bold',
    },
    containerMoreDetails: {
        gap: 10,
    },
    diagnostic: {
        fontSize: 17,
    },
    btnMoreDetails: {
        width: "100%",
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderColor: colors.blueDark,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
        gap: 5,
    },
    textMoreDetails: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.blueDark,
    },
    imgSeta: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    }
})