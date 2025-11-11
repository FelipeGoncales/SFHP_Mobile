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

            <View style={styles.header}>
                <TouchableOpacity style={styles.btnGoBack} onPress={redirectHome}>
                    <Image source={require('../assets/seta-esquerda.png')} style={styles.imgSetaEsquerda}></Image>
                </TouchableOpacity>

                <Text style={styles.title}>Dados do paciente</Text>
            </View>

            <FormProfile />

        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray200,
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 30,
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