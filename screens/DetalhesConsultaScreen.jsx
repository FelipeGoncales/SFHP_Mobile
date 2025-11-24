import React, {useContext, useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Dimensions,
    ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../design/colors";
import CardDetalhesConsulta from "../components/CardDetalhesConsulta";
import CardDiagnostico from "../components/CardDiagnostico";
import { IdConsultaContext } from "../context/IdConsultaContext";
import {TokenContext} from "../context/tokenContext";
import urlAPI from "../config/urlAPI";
import {CpfPacienteContext} from "../context/CpfPacienteContext";

function DetalhesConsultaScreen() {
    const navigation = useNavigation();

    // Obtém o idConsulta
    const { idConsulta } = useContext(IdConsultaContext);
    // Obtém o token do context
    const { token } = useContext(TokenContext);

    // Refreshing
    const [refreshing, setRefreshing] = useState(false);

    // variável useState de consulta
    const [consulta, setConsulta] = useState({});

    // variável useState de diagnostico
    const [diagnostico, setDiagnostico] = useState({});

    // Fetch consultas
    async function fetchConsulta() {
        // Redireciona para home
        if (!token) return navigation.navigate('Home');

        const response = await fetch(`${urlAPI}/get_consultas?p=True`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })

        // Obtém o json
        const data = await response.json();

        // Obtém a lista de consultas
        const consultas = data.consultas;

        // Filtra a consulta
        const consultaFiltro = consultas.find(consulta => consulta.id_consulta === parseInt(idConsulta));

        // Atualiza a variável useState
        setConsulta(consultaFiltro);
    }

    // Requisição diagnóstico
    async function fetchDiagnostico () {
        // Redireciona para home
        if (!token) return navigation.navigate('Home');

        const response = await fetch(`${urlAPI}/diagnostico?id_consulta=${idConsulta}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            method: "GET",
        })

        // Obtém o json
        const data = await response.json();

        if (data.diagnostico) {
            // Salva os dados de diagnóstico
            setDiagnostico(data.diagnostico);
        }
    }

    // Faz a requisição para obter os dados
    useEffect(() => {
        fetchConsulta();
        fetchDiagnostico();
    }, [idConsulta]);

    // Função de recarregamento assíncrona
    async function onRefresh() {
        await fetchConsulta();
        await fetchDiagnostico();
    }

    return (
        <View style={styles.container}>

            <> </>

            <TouchableOpacity style={styles.Return} onPress={navigation.goBack}>
                <Image
                    source={require("../assets/seta-esquerda.png")}
                    style={styles.ReturnIcon}
                />
                <Text style={styles.ReturnText}>Detalhes da Consulta</Text>
            </TouchableOpacity>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.containerCards}>

                    <> </>

                    <CardDetalhesConsulta consulta={consulta} />

                    <CardDiagnostico diagnostico={diagnostico} consulta={consulta} />
                </View>
            </ScrollView>
        </View>
    );
}

export default DetalhesConsultaScreen;

// Width e height da tela
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: 54,
        gap: 20,
        height: "100%",
    },
    containerCards: {
        gap: 15,
        paddingBottom: 25,
    },
    Return: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
    },

    ReturnIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        tintColor: colors.blueDark,
    },

    ReturnText: {
        fontSize: 22,
        color: colors.blueDark,
        fontWeight: "bold",
    },

    loadingScreen: {
        position: "absolute",
        height: height,
        width: width,
        top: 0,
        left: 0,
        zIndex: 9999999,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    }
});
