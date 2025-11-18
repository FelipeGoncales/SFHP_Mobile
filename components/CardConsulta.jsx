import { useEffect, useState, useContext } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import { IdConsultaContext } from "../context/IdConsultaContext";
import colors from "../design/colors";
import {useNavigation} from "@react-navigation/native";

function CardConsulta({ consulta }) {
    // Guarda a data da consulta.
    const [date, setDate] = useState(new Date());

    // Hook para navegação entre telas.
    const navigation = useNavigation();

    // Obtém o ID da consulta no contexto global.
    const { setIdConsulta } = useContext(IdConsultaContext);

    // Atualiza a data sempre que a consulta recebida mudar.
    useEffect(() => {
        setDate(new Date(consulta.data_entrada));
    }, [consulta]);

    // Função chamada quando usuário clica no botão 'ver detalhes'.
    function showMoreDetails(idConsulta) {
        // Armazena o ID da consulta.
        setIdConsulta(idConsulta);
        // Redireciona para a página de detalhes.
        return navigation.navigate('DetalhesConsulta');
    }

    return (
        <View style={styles.containerPai}>

            <View style={styles.containerTitle}>
                <Text style={styles.title}>Alta recebida</Text>
                <Text style={styles.description}>Concluída</Text>
            </View>

            <View style={styles.containerDate}>
                <Image source={require('../assets/icone-calendario.png')} style={styles.imgCalendario}></Image>
                <Text style={styles.date}>{date.toLocaleDateString("pt-BR")}</Text>
            </View>

            <View style={styles.containerMoreDetails}>
                <Text style={styles.diagnostic}>Diagnóstico: {consulta.diagnostico}</Text>

                <TouchableOpacity style={styles.btnMoreDetails} onPress={() => showMoreDetails(consulta.id_consulta)}>
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
        fontSize: 14,
        backgroundColor: colors.greenLight,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 50,
        color: colors.greenDark,
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
    containerMoreDetails: {
        gap: 10,
    },
    diagnostic: {
        fontSize: 17,
    },
    btnMoreDetails: {
        width: "100%",
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderColor: colors.blueDark,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 10,
    },
    textMoreDetails: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.blueDark,
    },
    imgSeta: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    }
})
