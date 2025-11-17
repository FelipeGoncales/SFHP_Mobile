import { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TokenContext } from '../context/tokenContext';
import urlAPI from '../config/urlAPI';
import { useNavigation } from '@react-navigation/native';
import colors from "../design/colors";
import FormProfile from "../components/FormProfile";

function ProfileScreen() {

    const navigation = useNavigation();

    function redirectHome() {
        return navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.btnGoBack} onPress={redirectHome}>
                <View style={styles.header}>
                        <Image source={require('../assets/seta-esquerda.png')} style={styles.imgSetaEsquerda}></Image>

                    <Text style={styles.title}>Dados do paciente</Text>
                </View>
            </TouchableOpacity>

            <FormProfile />

        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray200,
        height: '100%',
        paddingTop: 45,
        gap: 12
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        color: colors.blueDark,
        fontWeight: 'bold',
    },
    imgSetaEsquerda: {
        width: 28,
        height: 28,
        resizeMode: 'contain'
    },
    btnGoBack: {
        paddingRight: 10,
        paddingVertical: 10
    }
})