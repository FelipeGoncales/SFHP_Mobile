import { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";

function Header() {
    return (
        <View style={styles.containerPai}>
            <View style={styles.containerFilho}>
                <Image source={require('../assets/logo.png')} style={styles.img}></Image>
                <Text style={styles.title}>SFHP</Text>
            </View>

            <View style={styles.containerFilho}>
                <Image source={require('../assets/icone-sininho.png')} style={styles.img}></Image>
                <Image source={require('../assets/icone-barra-lateral.png')} style={styles.img}></Image>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.blueDark,
    },
    containerFilho: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    title: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 800
    }
})