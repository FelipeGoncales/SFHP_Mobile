import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import colors from "../design/colors";
import {useContext} from "react";
import {TokenContext} from "../context/tokenContext";

function ModalBarraLateral({ setShowModal }) {

    // Use navigation
    const navigation = useNavigation();

    // Obtém o token do context
    const { token, setToken } = useContext(TokenContext);

    // Redireciona para perfil
    function redirectPerfil() {
        // Esconde o modal
        setShowModal(false);

        // Redireciona para a página do perfil
        return navigation.navigate('Profile');
    }

    // Logout
    function logout() {
        // Limpa o token
        setToken('');

        // Exibe mensagem de sucesso
        Alert.alert('Você saiu da sua conta com sucesso!');

        // Esconde o modal
        setShowModal(false);

        // Redireciona para login
        return navigation.navigate('Login');
    }

    return (
        <View style={styles.modalBarraLateral}>
            <TouchableOpacity style={styles.btnBarraLateral} onPress={redirectPerfil}>
                <Image source={require('../assets/icone-user-simples.png')}  style={styles.img}></Image>
                <Text style={styles.textBtn}>Minha conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnBarraLateral} onPress={logout}>
                <Image source={require('../assets/icone-sair.png')} style={styles.img}></Image>
                <Text style={styles.textBtnSair}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalBarraLateral;

const styles = StyleSheet.create({
    modalBarraLateral: {
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: "center",
        padding: 10,
        paddingBottom: 20,
        elevation: 40,
        paddingHorizontal: 15,
        position: 'absolute',
        top: 70,
        right: 40,
        zIndex: 999
    },
    textBtn: {
        padding: 10,
        color: colors.black,
        fontSize: 18,
        fontWeight: "500",
    },
    textBtnSair: {
        color: colors.redBase,
        fontSize: 18,
        fontWeight: "500",
    },
    btnBarraLateral: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5
    },
    img: {
        width: 25,
        height: 25,
    }
})
