import React, {useState, useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { IdConsultaContext } from "../context/IdConsultaContext";
import colors from "../design/colors";
import {useNavigation} from "@react-navigation/native";

export default function CardConsultaAtual({ consulta }) {
    // Variável useState da data
    const [date, setDate] = useState(new Date());

    // Use navigation
    const navigation = useNavigation();

    // Obtém o setIdConsulta do context
    const { setIdConsulta } = useContext(IdConsultaContext);

    // Atualiza o valor da data
    useEffect(() => {
        setDate(new Date(consulta.data_entrada));
    }, [consulta]);

    // Função para redirecionar a página de ver mais detalhes
    function showMoreDetails(idConsulta) {
        // Salva o id da consulta
        setIdConsulta(idConsulta);
        // Redireciona para a tela de detalhes da consulta
        return navigation.navigate('DetalhesConsulta');
    }

    return (
        <View style={styles.containerPai}>

            {/* Cabeçalho */}
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{consulta.situacao}</Text>
                <Text style={styles.description}>Em andamento</Text>
            </View>

            {/* Data */}
            <View style={styles.containerDate}>
                <Image
                    source={require("../assets/icone-calendario.png")}
                    style={styles.imgCalendario}
                />
                <Text style={styles.date}>{date.toLocaleDateString()}</Text>
            </View>

            {/* Barra de progressoo */}

            {
                consulta.situacao_vetor === 1 ? (
                    <View style={styles.progressoContainer}>
                        <View style={styles.circuloActive} />
                        <View style={styles.linhaActive} />
                        <View style={styles.circulo} />
                        <View style={styles.linha} />
                        <View style={styles.circulo} />
                        <View style={styles.linha} />
                        <View style={styles.circulo} />
                    </View>
                ) : consulta.situacao_vetor === 2 ? (
                    <View style={styles.progressoContainer}>
                        <View style={styles.circuloActive} />
                        <View style={styles.linhaActive} />
                        <View style={styles.circuloActive} />
                        <View style={styles.linha} />
                        <View style={styles.circulo} />
                        <View style={styles.linha} />
                        <View style={styles.circulo} />
                    </View>
                ) : consulta.situacao_vetor === 3 ? (
                    <View style={styles.progressoContainer}>
                        <View style={styles.circuloActive} />
                        <View style={styles.linhaActive} />
                        <View style={styles.circuloActive} />
                        <View style={styles.linhaActive} />
                        <View style={styles.circulo} />
                        <View style={styles.linha} />
                        <View style={styles.circulo} />
                    </View>
                ) : (
                    <View style={styles.progressoContainer}>
                        <View style={styles.circuloActive} />
                        <View style={styles.linhaActive} />
                        <View style={styles.circuloActive} />
                        <View style={styles.linhaActive} />
                        <View style={styles.circuloActive} />
                        <View style={styles.linha} />
                        <View style={styles.circulo} />
                    </View>
                )
            }

            {/* Botão */}
            <TouchableOpacity style={styles.button} onPress={() => showMoreDetails(consulta.id_consulta)}>
                <Text style={styles.buttonText}>Ver mais detalhes</Text>
                <Image source={require('../assets/seta-direita-branca.png')} style={styles.imgSeta}></Image>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    containerPai: {
        height: 210,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 5,
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
        fontSize: 12,
        backgroundColor: colors.yellow_fundo,
        paddingHorizontal: 13,
        paddingVertical: 5,
        borderRadius: 30,
        color: colors.yellowProtocol,
    },
    imgCalendario: {
        width: 25,
        height: 25,
        resizeMode: "contain",
    },
    date: {
        fontSize: 15,
        color: colors.grayDark,
        fontWeight: 'bold',
    },
    imgSeta: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    progressoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15,
        marginTop: 4,
    },
    circulo: {
        width: 18,
        height: 18,
        borderRadius: 11,
        backgroundColor: colors.gray200,
    },
    circuloActive: {
        width: 18,
        height: 18,
        borderRadius: 11,
        backgroundColor: colors.blueBase,
    },
    linha: {
        flex: 1,
        height: 7,
        backgroundColor: colors.gray200,
        marginHorizontal: 4,
        borderRadius: 3,
    },
    linhaActive: {
        flex: 1,
        height: 7,
        marginHorizontal: 4,
        borderRadius: 3,
        backgroundColor: colors.blueBase,
    },

    button: {
        backgroundColor: colors.blueDark,
        borderRadius: 10,
        paddingVertical: 11,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 15,
    },
});
