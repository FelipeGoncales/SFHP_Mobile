import { useContext, useState } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import urlAPI from "../config/urlAPI";
import colors from "../design/colors";
import Header from "../components/Header";
import CardConsulta from "../components/CardConsulta";

function DetalhesConsultaScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View>

                <TouchableOpacity style={styles.voltar} onPress={navigation.goBack}>
                    <Text>Voltar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default DetalhesConsultaScreen;

const styles = StyleSheet.create({
    voltar: {
        paddingTop: 40,
    }
})