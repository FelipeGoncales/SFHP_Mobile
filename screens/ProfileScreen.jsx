import { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TokenContext } from '../context/tokenContext';
import urlAPI from '../config/urlAPI';
import { useNavigation } from '@react-navigation/native';
import colors from "../design/colors";
import FormProfile from "../components/FormProfile";

function ProfileScreen() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../assets/seta-esquerda.png')} style={styles.imgSetaEsquerda}></Image>
                <Text style={styles.title}>Dados do paciente</Text>
            </View>

            <FormProfile />

        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 30,
        gap: 5
    },
    title: {
        fontSize: 22,
        color: colors.blueDark,
        fontWeight: 'bold',
    },
    imgSetaEsquerda: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    }
})