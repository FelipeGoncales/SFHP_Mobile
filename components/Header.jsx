import { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";

// Componente funcional Header que recebe duas props:
// - setShowModal (função para alterar o estado do modal);
// - showModal (booleano que indica se o modal está aberto ou não).
function Header({setShowModal, showModal}) {
    return (
        <View style={styles.containerPai}>
            <View style={styles.containerFilho}>
                <Image source={require('../assets/logo.png')} style={styles.img}></Image>
                <Text style={styles.title}>SFHP</Text>
            </View>

            <View style={styles.containerFilho}>
                <TouchableOpacity>
                    <Image source={require('../assets/icone-sininho.png')} style={styles.img}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                    <Image source={require('../assets/icone-barra-lateral.png')} style={styles.img}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Exporta o componente para ser usado em outras partes do aplicativo.
export default Header;

const styles = StyleSheet.create({
    containerPai: {
        width: '100%',
        padding: 15,
        paddingTop: 40,
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
        width: 35,
        height: 35,
        resizeMode: "contain",
    },
    title: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 800
    }
})